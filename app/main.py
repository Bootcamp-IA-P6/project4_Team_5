import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
from tensorflow.keras.applications.mobilenet import preprocess_input

# 1. Configuración de la página
st.set_page_config(page_title="Clasificador de Residuos", page_icon="♻️")
st.title("♻️ Eco-Clasificador de Residuos")
st.write("Sube una foto de un residuo para saber cómo reciclarlo.")

# 2. Cargar el modelo (usamos cache para que no se recargue en cada clic)
@st.cache_resource
def load_my_model():
    # Asegúrate de que el nombre coincida con tu archivo
    return tf.keras.models.load_model('mi_modelo_mobilenet.keras')

model = load_my_model()

# Definir las etiquetas (Deben estar en el MISMO ORDEN que en tu entrenamiento)
class_names = [
    'battery', 'biological', 'brown-glass', 'cardboard', 
    'green-glass', 'metal', 'paper', 'plastic', 'trash', 'white-glass'
]

# 3. Subida de imagen
uploaded_file = st.file_uploader("Elige una imagen...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Mostrar la imagen subida
    image = Image.open(uploaded_file)
    st.image(image, caption='Imagen subida', use_column_width=True)
    
    st.write("🔄 Clasificando...")

    # 4. Preprocesamiento (Igual al que hiciste en el test)
    img = image.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    # 5. Predicción
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0]) # Si es multiclase
    
    label_id = np.argmax(predictions)
    label_name = class_names[label_id]
    confidence = np.max(predictions) * 100 # Probabilidad si usaste Softmax

    # 6. Mostrar resultado
    st.success(f"Esto parece: **{label_name.upper()}**")
    st.info(f"Confianza: {confidence:.2f}%")