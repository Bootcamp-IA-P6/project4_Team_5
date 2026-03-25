# OopsBin

Multiclass waste classification system powered by deep learning. Upload an image or use your camera and OopsBin tells you which bin it belongs in.

7 categories | 93.3% accuracy | 4 models | 3 languages (EN / ES / KO)

---

## Models

Four models were trained and compared. **ResNet50** was selected as the default for production due to its best overall accuracy.

| Model | Backbone | Classes | Test Accuracy | Status |
|-------|----------|---------|---------------|--------|
| ResNet50 (R) | ResNet50 | 7 | 93.3% | Default |
| EfficientNetB0 Model 1 (J) | EfficientNetB0 | 7 | Available | Active |
| EfficientNetB0 Model 2 (R) | EfficientNetB0 | 7 | Available | Active |
| MobileNetV2 (N) | MobileNetV2 | 10 | Available | Disabled (different classes) |

All models can be selected from the Classify tab in the web interface.

---

## Quick Start

### Prerequisites

- Python 3.10+
- [uv](https://docs.astral.sh/uv/) (recommended) or pip
- Docker (optional)

### 1. Clone the repository

```bash
git clone https://github.com/Bootcamp-IA-P6/project4_Team_5.git
cd project4_Team_5
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### 3. Run the application

#### Option A: uv (recommended)

```bash
# Install uv (if not installed)
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

```bash
uv sync
```

```bash
# macOS / Linux
make dev

# Windows (make not available)
uv run python app/main.py
```

Open http://localhost:8080

#### Option B: pip

```bash
python -m venv venv
```

```bash
# macOS / Linux
source venv/bin/activate

# Windows CMD
venv\Scripts\activate

# Windows PowerShell
venv\Scripts\Activate.ps1
```

```bash
pip install -r requirements.txt
python app/main.py
```

Open http://localhost:8080

#### Option C: Docker

```bash
# macOS / Linux
make docker

# Windows / any OS
docker compose up --build
```

Open http://localhost:8080

### Make commands (macOS / Linux)

| Command | Description |
|---------|-------------|
| `make dev` | Run locally with uv |
| `make docker` | Build and run with Docker |
| `make docker-down` | Stop Docker containers |
| `make docker-rebuild` | Rebuild Docker from scratch |
| `make clean` | Remove all Docker images, volumes and cache |

---

## Project Structure

```
project4_Team_5/
├── app/                          # Web application
│   ├── main.py                   # Flask backend + prediction API
│   ├── templates/                # HTML pages
│   │   ├── base.html             # Base layout, theme, i18n
│   │   ├── index.html            # Main app (Home, Classify, Metrics, About, Contact)
│   │   └── 404.html              # Error page
│   └── static/
│       ├── css/style.css         # Styles (light/dark, accessibility)
│       ├── js/main.js            # Frontend logic, camera, feedback
│       ├── img/                  # Logo, mascot, characters
│       └── music/                # Background audio
│
├── models/                       # Trained models
│   └── versions/                 # ResNet50, EfficientNetB0 x2, MobileNetV2
│
├── notebooks/                    # Training & data preparation notebooks
│
├── config/                       # Configuration files
│
├── data/                         # Data management
│
├── tests/                        # Unit tests
│
├── Dockerfile                    # Container image
├── docker-compose.yml            # Container orchestration
├── Makefile                      # Dev shortcuts
├── requirements.txt              # Python dependencies (pip)
├── pyproject.toml                # Python dependencies (uv)
└── .env                          # Environment variables (not in git)
```

---

## Features

- **Image classification** via upload or drag & drop
- **Camera classification** with real-time capture
- **Multi-model selection** — choose between ResNet50, EfficientNetB0 (x2), or MobileNetV2
- **User feedback system** connected to Supabase (PostgreSQL)
- **Metrics dashboard** with confusion matrix, F1 scores, learning curves, and error analysis
- **Multilingual** support (English, Spanish, Korean)
- **Accessibility** — dark/light mode, colorblind modes, font size control, high contrast
- **Dockerized** for easy deployment
- **Custom 404** error page

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Flask, Python |
| ML | TensorFlow / Keras (ResNet50, EfficientNetB0, MobileNetV2) |
| Frontend | HTML, CSS, JavaScript |
| Database | Supabase (PostgreSQL) |
| Container | Docker |
| Training | Google Colab / Kaggle (GPU T4) |

---

## Datasets

Three public datasets from Kaggle were combined and unified:

| Dataset | Original Classes | Images |
|---------|-----------------|--------|
| Garbage Classification | 6 | 2,527 |
| Garbage Classification (12 classes) | 12 | 15,515 |
| RealWaste | 9 | 4,752 |
| **Total after unification** | **7** | **16,756** |

Final classes: **cardboard** | **glass** | **metal** | **organic** | **paper** | **plastic** | **trash**

Split: Train 11,036 (80%) | Validation 1,376 (10%) | Test 1,385 (10%)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Main application |
| GET | `/models` | List available models |
| POST | `/predict` | Classify an image (supports model selection) |
| POST | `/feedback` | Submit prediction feedback |
| GET | `/feedback/stats` | Get feedback statistics |

---

## Training Summary

The default model (ResNet50) was trained in 3 phases using transfer learning:

| Phase | Epochs | Learning Rate | What trains | Val Accuracy |
|-------|--------|---------------|-------------|-------------|
| Phase 1 — Head only | 20 | 1e-3 | Classification head (526K params) | 91.5% |
| Phase 2 — Fine-tuning | 15 | 1e-5 | Last 30 layers + head | 94.2% |
| Phase 3 — Extended | 4 (early stop) | 5e-6 | Last 30 layers + head | 94.3% |

Final results: **93.3% test accuracy** | **2.6% overfitting** (below 5% threshold)
