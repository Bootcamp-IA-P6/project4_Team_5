
import streamlit as st
import os
import tensorflow as tf
import numpy as np
from PIL import Image

# 1. MAPEADO DE CLASES
NOMBRES_CLASES = [
    "Battery (Batería)", "Biological (Biológico)", "Brown-glass (Vidrio café)", 
    "Cardboard (Cartón)", "Green-glass (Vidrio verde)", "Metal", 
    "Paper (Papel)", "Plastic (Plástico)", "Trash (Basura/Residuo)", "White-glass (Vidrio blanco)"
]

# Configuración de página
st.set_page_config(page_title="Eco-Clasificador AI", page_icon="♻️", layout="centered")

# --- CSS MEJORADO ---
st.markdown("""
    <style>
    /* Fondo y tipografía */
    .main { background-color: #f8f9fa; }
    
    /* Estilo para el contenedor del uploader */
    .stFileUploader {
        border: 2px dashed #00a65a;
        border-radius: 15px;
        padding: 10px;
        background-color: 30C79B;
        
    }
    .stApp {
        background-color: #0F1638; /* Un azul muy claro y profesional */
    }

    /* Botón principal estilo 'Call to Action' */
    .stButton>button {
        width: 100%;
        border-radius: 25px;
        height: 3.5em;
        background-color: #00a65a;
        color: white;
        font-weight: bold;
        border: none;
        transition: 0.3s;
        box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    }
    .stButton>button:hover {
        background-color: #008d4c;
        transform: translateY(-2px);
    }

    /* Tarjetas de resultados */
    .result-card {
        background-color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0px 4px 12px rgba(0,0,0,0.05);
        text-align: center;
    }
    </style>
    """, unsafe_allow_html=True)

# --- CABECERA ---
st.title("♻️ Robot Clasificador de Residuos")
st.markdown("Identifica materiales automáticamente usando **Visión Artificial**. Ayúdanos a reciclar mejor.")
st.divider()

# 2. Gestión de Modelos
MODEL_DIR = os.path.join("models", "versions")

if os.path.exists(MODEL_DIR):
    modelos_disponibles = [f for f in os.listdir(MODEL_DIR) if f.endswith(".keras")]
    
    if modelos_disponibles:
        # Sidebar más organizada
        st.sidebar.header("⚙️ Configuración")
        modelo_nombre = st.sidebar.selectbox("Seleccione un modelo:", modelos_disponibles)
        ruta_modelo = os.path.join(MODEL_DIR, modelo_nombre)

        @st.cache_resource
        def load_my_model(path):
            return tf.keras.models.load_model(path)

        model = load_my_model(ruta_modelo)
        st.sidebar.success(f"✅ Modelo: {modelo_nombre}")

        # --- INTERFAZ DE CARGA ---
        # Usamos columnas para que no se vea vacío
        col_upload, col_preview = st.columns([1, 1])

        with col_upload:
            st.subheader("1. Sube tu imagen")
            uploaded_file = st.file_uploader("Arrastra o selecciona una foto", type=["jpg", "png", "jpeg"])
            
            if uploaded_file:
                if st.button("🚀 CLASIFICAR RESIDUO"):
                    # El procesamiento se dispara aquí
                    pass 

        with col_preview:
            st.subheader("2. Vista previa")
            if uploaded_file:
                img = Image.open(uploaded_file)
                st.image(img, use_container_width=True)
            else:
                st.info("Sube una imagen para comenzar.")

        # --- LÓGICA DE PREDICCIÓN ---
        if uploaded_file and "🚀 CLASIFICAR RESIDUO" in st.session_state or (uploaded_file and st.button.__name__):
            # Nota: El botón de Streamlit refresca la página, esta lógica se ejecuta al presionar
            img_resized = img.resize((224, 224))
            img_array = tf.keras.preprocessing.image.img_to_array(img_resized)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = img_array / 255.0

            preds = model.predict(img_array)
            idx = np.argmax(preds)
            probabilidad = np.max(preds)
            nombre_material = NOMBRES_CLASES[idx]

            # --- RESULTADOS VISUALES ---
            st.divider()
            
            # Usamos un contenedor con estilo de tarjeta
            with st.container():
                st.markdown(f"""
                <div class="result-card">
                    <h2 style='color: #00a65a; margin-bottom: 0;'>{nombre_material}</h2>
                    <p style='color: #666;'>Material detectado con alta precisión</p>
                </div>
                """, unsafe_allow_html=True)

                # Métrica de confianza
                col_metric1, col_metric2 = st.columns(2)
                with col_metric1:
                    st.metric(label="Confianza", value=f"{probabilidad:.2%}")
                with col_metric2:
                    status = "✅ Fiable" if probabilidad > 0.65 else "⚠️ Revisar"
                    st.metric(label="Estado", value=status)

                # Gráfico de probabilidades elegante
                with st.expander("📊 Ver análisis de probabilidad detallado"):
                    chart_data = {cat: float(p) for cat, p in zip(NOMBRES_CLASES, preds[0])}
                    st.bar_chart(chart_data)

    else:
        st.error("No se encontraron archivos .keras en models/versions")
else:
    st.error("Error: No existe la carpeta de modelos.")

st.sidebar.divider()
st.sidebar.caption("Eco-App v2.0 - IA para el planeta")
