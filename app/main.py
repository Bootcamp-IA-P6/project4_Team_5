import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
from tensorflow.keras.applications.mobilenet import preprocess_input

# 1. Configuración de la página
st.set_page_config(page_title="Eco-Clasificador", page_icon="♻️")
st.title("♻️ Eco-Clasificador de Residuos")

# 2. Cargar el modelo con caché
@st.cache_resource
def load_my_model():
    # Asegúrate de que esta ruta sea correcta en tu carpeta
    return tf.keras.models.load_model('models/versions/mi_modelo_mobilenet.keras')

model = load_my_model()

# Etiquetas originales
class_names = [
    'battery', 'biological', 'brown-glass', 'cardboard', 
    'green-glass', 'metal', 'paper', 'plastic', 'trash', 'white-glass'
]

# 3. Interfaz de subida
uploaded_file = st.file_uploader("Sube una foto del residuo", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Procesamiento de imagen
    image = Image.open(uploaded_file).convert("RGB") # Forzamos RGB para evitar error de canales
    st.image(image, caption='Imagen a clasificar', use_container_width=True)
    
    # 4. Preprocesamiento exacto para MobileNet
    img_resizing = image.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img_resizing)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    # 5. Predicción Inteligente
    with st.spinner('Analizando...'):
        predictions = model.predict(img_array)
        
        # Verificamos si los valores ya son probabilidades (0-1) o logits (números grandes)
        if np.max(predictions) > 1.0 or np.min(predictions) < 0.0:
            score = tf.nn.softmax(predictions[0]).numpy()
        else:
            score = predictions[0]

        label_id = np.argmax(score)
        label_name = class_names[label_id]
        confidence = score[label_id] * 100

    # 6. Resultados con Lógica de Seguridad
    st.divider()
    
    # Umbral recomendado: 70% (ajustable)
    UMBRAL_SEGURIDAD = 70.0 

    if confidence < UMBRAL_SEGURIDAD:
        st.warning(f"🤔 **No estoy totalmente seguro.**")
        st.write(f"Parece **{label_name}**, pero la confianza es baja ({confidence:.2f}%).")
        st.info("Sugerencia: Intenta tomar la foto con más luz o sobre un fondo liso.")
    else:
        st.success(f"✅ Identificado como: **{label_name.upper()}**")
        st.metric(label="Confianza", value=f"{confidence:.2f}%")

    # Opcional: Mostrar barra de probabilidades para ver qué más "sospecha" la IA
    with st.expander("Ver detalles técnicos"):
        st.bar_chart(dict(zip(class_names, score)))
        
load_my_model()