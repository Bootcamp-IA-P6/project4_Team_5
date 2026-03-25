import os
import io
import numpy as np
from flask import Flask, render_template, request, jsonify
from PIL import Image

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
import tensorflow as tf

app = Flask(__name__)

MODEL_PATH = os.path.join(
    os.path.dirname(__file__), "..", "models", "versions", "waste_classifier_final_R.keras"
)

CLASS_NAMES = ["cardboard", "glass", "metal", "organic", "paper", "plastic", "trash"]

CLASS_INFO = {
    "cardboard": {"bin": "Blue Bin", "icon": "box", "color": "#3B82F6"},
    "glass": {"bin": "Green Bin", "icon": "wine-bottle", "color": "#22C55E"},
    "metal": {"bin": "Yellow Bin", "icon": "industry", "color": "#EAB308"},
    "organic": {"bin": "Brown Bin", "icon": "leaf", "color": "#92400E"},
    "paper": {"bin": "Blue Bin", "icon": "newspaper", "color": "#3B82F6"},
    "plastic": {"bin": "Yellow Bin", "icon": "bottle-water", "color": "#F59E0B"},
    "trash": {"bin": "Gray Bin", "icon": "trash-can", "color": "#6B7280"},
}

model = None


def get_model():
    global model
    if model is None:
        model = tf.keras.models.load_model(MODEL_PATH)
    return model


@app.route("/")
def index():
    return render_template("index.html")


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

    try:
        img = Image.open(io.BytesIO(file.read())).convert("RGB")
        img = img.resize((224, 224))
        img_array = np.array(img, dtype=np.float32)
        img_array = tf.keras.applications.resnet50.preprocess_input(img_array)
        img_array = np.expand_dims(img_array, axis=0)

        m = get_model()
        predictions = m.predict(img_array, verbose=0)
        idx = int(np.argmax(predictions[0]))
        predicted_class = CLASS_NAMES[idx]
        confidence = float(np.max(predictions[0]))
        info = CLASS_INFO[predicted_class]

        all_predictions = sorted(
            [
                {"class": cls, "probability": round(float(p) * 100, 1)}
                for cls, p in zip(CLASS_NAMES, predictions[0])
            ],
            key=lambda x: x["probability"],
            reverse=True,
        )

        return jsonify(
            {
                "class": predicted_class,
                "confidence": round(confidence * 100, 1),
                "bin": info["bin"],
                "icon": info["icon"],
                "color": info["color"],
                "all_predictions": all_predictions,
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_error(e):
    return render_template("404.html", error_code=500, error_msg="Internal Server Error"), 500


if __name__ == "__main__":
    print("Loading model...")
    get_model()
    print("Model loaded. Starting OopsBin...")
    app.run(debug=True, port=5000)
