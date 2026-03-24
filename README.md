# ♻️ Proyecto/Reciclaje

El Futuro de la Gestión de Residuos: Automatización e Inteligencia

    Nuestra iniciativa nace de una necesidad crítica: transformar el reciclaje de una tarea rudimentaria en un proceso de alta precisión tecnológica. No buscamos simplemente innovar por tendencia; nuestro objetivo es redefinir la eficiencia operativa. Al integrar Inteligencia Artificial en la clasificación de residuos, eliminamos los cuellos de botella del procesamiento manual, ahorrando cientos de horas de trabajo y reduciendo drásticamente el margen de error humano.

🤖 La Sinergia entre Humano y Máquina
El corazón de este proyecto es un sistema robótico avanzado diseñado para trabajar en colaboración con el talento humano. No pretendemos reemplazar al operador, sino potenciar sus capacidades:

Supervisión Inteligente: El operario actúa como el cerebro estratégico, configurando el sistema y gestionando excepciones en tiempo real.

Optimización de Recursos: Gracias a nuestros modelos de Visión Artificial, el robot ejecuta la clasificación con una velocidad y exactitud sobrehumanas, permitiendo que la gestión sea ágil y dinámica.

Sostenibilidad Real: El enfoque principal es el aprovechamiento total. Cada material detectado —ya sea plástico, metal o vidrio— es procesado bajo una lógica de optimización que garantiza que nada que tenga valor termine en el vertedero.

🎯 Nuestra Visión: Eficiencia sin Desperdicio
Creemos que la tecnología debe estar al servicio de la ecología. Al automatizar el proceso, no solo estamos creando una herramienta más rápida; estamos construyendo un ecosistema donde la gestión de residuos es inteligente, escalable y, sobre todo, rentable. Estamos convirtiendo la basura en recursos y el tiempo perdido en productividad pura.

**Tecnologias usadas para este tipo de Inteligencia Artificial**

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)


```
proyecto_Reciclaje/
├── .venv/                      # Entorno de desarrollo para las dependencias de las librerias
├── app/                        # Frontend de la aplicación
│   ├── main.py                 # Punto de entrada (Streamlit)
├── config/                     # Configuraciones generales
│   ├── settings.py             # Rutas, credenciales de DB y parámetros base
│   └── hyperparams.yaml        # Configuración de Optuna/GridSearch
├── data/                       # Gestión de datos
│   ├── raw/                    # Datasets originales (Nivel Esencial)
│   ├── processed/              # Datos limpios tras el pipeline
│   ├── database/               # Scripts SQL o NoSQL (Nivel Avanzado)
│   └── feedback/               # Logs de predicciones para reentrenamiento
├── deployments/                # Infraestructura
│   ├── Dockerfile              # Dockerización (Nivel Avanzado)
│   ├── docker-compose.yml      # Orquestación de App + DB
│   └── requirements.txt        # Dependencias del proyecto
├── models/                     # Almacén de modelos entrenados
│   ├── current_best.pkl        # El modelo en producción
│   └── versions/               # Historial de modelos (A/B Testing)
├── notebooks/                  # Experimentación
│   └── 01_eda_multiclase.ipynb # Tu EDA completo
├── src/                        # Código fuente modular (Backend)
│   ├── __init__.py
│   ├── data_pipeline.py        # Ingesta y limpieza automática
│   ├── feature_engineering.py  # Transformaciones de variables
│   ├── models_architecture/    # Definición de Ensembles y CNNs
│   │   ├── ensembles.py        # XGBoost, LightGBM
│   │   └── neural_nets.py      # Arquitecturas PyTorch/TensorFlow
│   ├── training.py             # Scripts de entrenamiento y Optuna
│   ├── evaluation.py           # Cálculo de métricas (F1, Matriz Confusión)
│   └── monitoring.py           # Detección de Data Drift (Nivel Experto)
├── tests/                      # Pruebas Unitarias (Nivel Avanzado)
│   ├── test_data.py            # Integridad de datos
│   └── test_model.py           # Validar métricas mínimas
├── .env                        # Variables de entorno (Secretos)
├── .gitignore                  # Evitar subir datos pesados o secretos
└── README.md                   # Documentación técnica

```

**Pasos para clonar este repositorio y ejecutar la app en tu local:**
- Git clone 
- 1. Instalación de uv (si aún no lo tienes)
Antes que nada, asegúrate de tener uv instalado en tu sistema operativo. Abre tu terminal y ejecuta:

**macOS/Linux:** curl -LsSf https://astral.sh/uv/install.sh | sh

**Windows (PowerShell):** powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

2. Crear un entorno virtual con uv
   - uv venv

3. Sincronizar dependencias
Si tienes un archivo pyproject.toml o requirements.txt, usa uv para instalar todo instantáneamente:

**Bash**
- uv pip install -r requirements.txt
**O si usas el nuevo flujo de uv:**
- uv sync

4. Asegúrate de tener instalada la extensión oficial de Python (Microsoft) en VS Code. Aunque uv gestiona los paquetes, VS Code necesita esta extensión para conectar el entorno virtual con el editor de código.

**💡 Tip Pro para Streamlit y uv**
Si vas a correr tu app de residuos, en lugar de activar el entorno manualmente, puedes ejecutarla directamente con:

**Bash**
uv run streamlit run app/main.py
Esto garantiza que se use el entorno correcto sin necesidad de hacer source .venv/bin/activate.