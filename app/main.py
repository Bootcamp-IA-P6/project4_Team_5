import os
import io
import uuid

import numpy as np
from flask import Flask, render_template, request, jsonify
from PIL import Image
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
import tensorflow as tf

app = Flask(__name__)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models", "versions")

MODELS_CONFIG = {
    "resnet50": {
        "file": "waste_classifier_final_R.keras",
        "label": "ResNet50 (R)",
        "classes": ["cardboard", "glass", "metal", "organic", "paper", "plastic", "trash"],
        "preprocess": "resnet50",
    },
    "efficientnet": {
        "file": "waste_classifier_final_Jonathan.keras",
        "label": "EfficientNetB0 (Jonathan)",
        "classes": ['vidrio', 'plastico', 'metal', 'papel', 'organico', 'carton', 'no_reciclable'],
        "preprocess": "raw",
    },
    "efficientnet_raul": {
        "file": "waste_classifier_final_Raul.keras",
        "label": "EfficientNetB0 (Raul)",
        "classes": ["cardboard", "glass", "metal", "organic", "paper", "plastic", "trash"],
        "preprocess": "raw",
    },
    "mobilenet": {
        "file": "waste_classifier_final_Naiza.keras",
        "label": "MobileNetV2 (Naiza)",
        "classes": ["battery", "biological", "brown-glass", "cardboard", "green-glass",
                     "metal", "paper", "plastic", "trash", "white-glass"],
        "preprocess": "mobilenet",
        "disabled": True,
    },
}

DEFAULT_MODEL = "resnet50"

CLASS_INFO = {
    "cardboard": {"bin": "Blue Bin", "icon": "box", "color": "#3B82F6"},
    "glass": {"bin": "Green Bin", "icon": "wine-bottle", "color": "#22C55E"},
    "metal": {"bin": "Yellow Bin", "icon": "industry", "color": "#EAB308"},
    "organic": {"bin": "Brown Bin", "icon": "leaf", "color": "#92400E"},
    "paper": {"bin": "Blue Bin", "icon": "newspaper", "color": "#3B82F6"},
    "plastic": {"bin": "Yellow Bin", "icon": "bottle-water", "color": "#F59E0B"},
    "trash": {"bin": "Gray Bin", "icon": "trash-can", "color": "#6B7280"},
    "battery": {"bin": "Red Bin", "icon": "car-battery", "color": "#EF4444"},
    "biological": {"bin": "Brown Bin", "icon": "seedling", "color": "#92400E"},
    "brown-glass": {"bin": "Green Bin", "icon": "wine-bottle", "color": "#A16207"},
    "green-glass": {"bin": "Green Bin", "icon": "wine-bottle", "color": "#16A34A"},
    "white-glass": {"bin": "Green Bin", "icon": "wine-bottle", "color": "#D1D5DB"},
}

loaded_models = {}


def get_model(model_key):
    if model_key not in loaded_models:
        config = MODELS_CONFIG[model_key]
        path = os.path.join(MODELS_DIR, config["file"])
        loaded_models[model_key] = tf.keras.models.load_model(path)
    return loaded_models[model_key]


def preprocess_image(img_array, preprocess_type):
    if preprocess_type == "resnet50":
        return tf.keras.applications.resnet50.preprocess_input(img_array)
    elif preprocess_type == "mobilenet":
        return tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    else:  # raw — EfficientNet normalizes internally
        return img_array


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/models")
def list_models():
    return jsonify({
        "default": DEFAULT_MODEL,
        "models": {
            k: {"label": v["label"], "classes": v["classes"], "disabled": v.get("disabled", False)}
            for k, v in MODELS_CONFIG.items()
        },
    })


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    allowed = {"png", "jpg", "jpeg", "webp", "bmp"}
    ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if ext not in allowed:
        return jsonify({"error": f"Invalid file type: .{ext}"}), 400

    model_key = request.form.get("model", DEFAULT_MODEL)
    if model_key not in MODELS_CONFIG:
        return jsonify({"error": f"Unknown model: {model_key}"}), 400
    if MODELS_CONFIG[model_key].get("disabled"):
        return jsonify({"error": f"Model '{model_key}' is currently disabled"}), 400

    config = MODELS_CONFIG[model_key]

    try:
        raw_bytes = file.read()
        img = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
        img_resized = img.resize((224, 224))
        img_array = np.array(img_resized, dtype=np.float32)
        img_array = preprocess_image(img_array, config["preprocess"])
        img_array = np.expand_dims(img_array, axis=0)

        m = get_model(model_key)
        predictions = m.predict(img_array, verbose=0)
        idx = int(np.argmax(predictions[0]))
        predicted_class = config["classes"][idx]
        confidence = float(np.max(predictions[0]))
        info = CLASS_INFO.get(predicted_class, {"bin": "Unknown", "icon": "question", "color": "#6B7280"})

        img_id = str(uuid.uuid4())

        all_predictions = sorted(
            [
                {"class": cls, "probability": round(float(p) * 100, 1)}
                for cls, p in zip(config["classes"], predictions[0])
            ],
            key=lambda x: x["probability"],
            reverse=True,
        )

        return jsonify(
            {
                "id": img_id,
                "class": predicted_class,
                "confidence": round(confidence * 100, 1),
                "bin": info["bin"],
                "icon": info["icon"],
                "color": info["color"],
                "model": config["label"],
                "all_predictions": all_predictions,
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.get_json()
    if not data or "id" not in data or "is_correct" not in data:
        return jsonify({"error": "Missing fields"}), 400

    row = {
        "id": data["id"],
        "predicted_class": data.get("predicted_class", ""),
        "confidence": data.get("confidence", 0),
        "is_correct": data["is_correct"],
        "actual_class": data.get("actual_class") if not data["is_correct"] else data.get("predicted_class", ""),
    }

    try:
        supabase.table("feedback").insert(row).execute()
        return jsonify({"status": "saved"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/feedback/stats")
def feedback_stats():
    try:
        res = supabase.table("feedback").select("*").execute()
        rows = res.data
        total = len(rows)
        correct = sum(1 for r in rows if r["is_correct"])
        incorrect = total - correct

        by_class = {}
        for r in rows:
            cls = r["predicted_class"]
            if cls not in by_class:
                by_class[cls] = {"total": 0, "correct": 0}
            by_class[cls]["total"] += 1
            if r["is_correct"]:
                by_class[cls]["correct"] += 1

        return jsonify({
            "total": total,
            "correct": correct,
            "incorrect": incorrect,
            "accuracy": round(correct / total * 100, 1) if total > 0 else 0,
            "by_class": [
                {"class": cls, "total": v["total"], "correct": v["correct"]}
                for cls, v in by_class.items()
            ],
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_error(e):
    return render_template("404.html", error_code=500, error_msg="Internal Server Error"), 500


if __name__ == "__main__":
    print("Loading default model...")
    get_model(DEFAULT_MODEL)
    print("Model loaded. Starting OopsBin...")
    app.run(host="0.0.0.0", debug=True, port=8080)
