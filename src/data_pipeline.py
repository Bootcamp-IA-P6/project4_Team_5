"""
src/data_pipeline.py
====================
Waste Classifier ML — Bootcamp 2026

ORDEN CORRECTO DEL PIPELINE (lección aprendida):
    1. Cargar imagen → [0, 255] float32
    2. Augmentation  → [0, 255]  (RandomBrightness opera en este rango)
    3. Normalizar    → [-1, 1]   (EfficientNetB0 espera este rango)
    4. Batch + prefetch
"""

import json
from pathlib import Path
import numpy as np
import tensorflow as tf

# ── Constantes ────────────────────────────────────────────────
CLASSES = [
    'vidrio', 'plastico', 'metal', 'papel',
    'organico', 'carton', 'no_reciclable'
]
CLASS_TO_IDX = {cls: idx for idx, cls in enumerate(CLASSES)}
IDX_TO_CLASS = {idx: cls for cls, idx in CLASS_TO_IDX.items()}
IMG_SIZE     = (224, 224)
SEED         = 42

# ── Config augmentation por clase ────────────────────────────
# rotation: fracción de 360° (10° = 0.028, 20° = 0.056, etc.)
# Todos los valores operan en rango [0, 255]
AUG_CONFIG = {
    'vidrio'       : {'rotation': 0.028, 'flip': True, 'zoom': 0.05,
                      'brightness': 0.20, 'contrast': 0.20},
    'plastico'     : {'rotation': 0.042, 'flip': True, 'zoom': 0.10,
                      'brightness': 0.20, 'contrast': 0.20},
    'metal'        : {'rotation': 0.056, 'flip': True, 'zoom': 0.10,
                      'brightness': 0.20, 'contrast': 0.20},
    'papel'        : {'rotation': 0.056, 'flip': True, 'zoom': 0.10,
                      'brightness': 0.20, 'contrast': 0.20},
    'organico'     : {'rotation': 0.083, 'flip': True, 'zoom': 0.15,
                      'brightness': 0.25, 'contrast': 0.25},
    'carton'       : {'rotation': 0.083, 'flip': True, 'zoom': 0.15,
                      'brightness': 0.25, 'contrast': 0.25},
    'no_reciclable': {'rotation': 0.125, 'flip': True, 'zoom': 0.20,
                      'brightness': 0.30, 'contrast': 0.30},
}


def preprocess_image(image_path, label=None):
    """
    Carga imagen → float32 en rango [0, 255].
    NO normaliza — el augmentation debe operar en [0, 255].
    normalize_image() se encarga del paso final.
    """
    raw   = tf.io.read_file(image_path)
    image = tf.image.decode_jpeg(raw, channels=3)
    image = tf.image.resize(image, IMG_SIZE, method='bilinear')
    image = tf.cast(image, tf.float32)
    # Rango resultante: [0, 255]

    if label is not None:
        return image, label
    return image


def normalize_image(image, label=None):
    """
    Normaliza [0, 255] → [-1, 1].
    Equivalente a efficientnet.preprocess_input.
    Se aplica siempre DESPUÉS del augmentation.
    """
    image = (image / 127.5) - 1.0

    if label is not None:
        return image, label
    return image


def build_augmentation_layer(cls_name):
    """
    Capa de augmentation para una clase específica.
    Opera en rango [0, 255].
    """
    cfg    = AUG_CONFIG.get(cls_name, AUG_CONFIG['metal'])
    layers = []

    if cfg['flip']:
        layers.append(tf.keras.layers.RandomFlip('horizontal', seed=SEED))

    layers.append(tf.keras.layers.RandomRotation(
        factor=cfg['rotation'], fill_mode='reflect', seed=SEED))

    layers.append(tf.keras.layers.RandomZoom(
        height_factor=(-cfg['zoom'], cfg['zoom']),
        width_factor=(-cfg['zoom'], cfg['zoom']),
        fill_mode='reflect', seed=SEED))

    layers.append(tf.keras.layers.RandomBrightness(
        factor=cfg['brightness'], seed=SEED))

    layers.append(tf.keras.layers.RandomContrast(
        factor=cfg['contrast'], seed=SEED))

    return tf.keras.Sequential(layers, name=f'aug_{cls_name}')


def build_global_augmentation_layer():
    """
    Capa de augmentation moderada para todo el dataset.
    Opera en rango [0, 255].
    """
    return tf.keras.Sequential([
        tf.keras.layers.RandomFlip('horizontal', seed=SEED),
        tf.keras.layers.RandomRotation(0.056, fill_mode='reflect', seed=SEED),
        tf.keras.layers.RandomZoom((-0.10, 0.10), fill_mode='reflect', seed=SEED),
        tf.keras.layers.RandomBrightness(0.20, seed=SEED),
        tf.keras.layers.RandomContrast(0.20, seed=SEED),
    ], name='global_augmentation')


def build_dataset(csv_path, split, batch_size=32, augment=None):
    """
    Construye tf.data.Dataset desde un CSV de split.

    Pipeline (orden crítico):
        1. Cargar imagen    → [0, 255]
        2. Augmentation     → [0, 255]  (solo train)
        3. Batch + prefetch

    NOTA: NO se normaliza a [-1, 1] aquí.
    EfficientNetB0 en TF 2.x incluye una capa Rescaling interna
    que espera [0, 255] y normaliza a [-1, 1] por sí sola.
    Normalizar antes produce doble normalización → el modelo
    recibe valores comprimidos cerca de -1 y no aprende.

    Args:
        csv_path  : ruta al CSV ('filepath', 'label')
        split     : 'train', 'val' o 'test'
        batch_size: tamaño del lote
        augment   : 'global' | nombre de clase | None

    Returns:
        tf.data.Dataset listo para model.fit()
    """
    import pandas as pd

    df = pd.read_csv(csv_path)

    missing = {'filepath', 'label'} - set(df.columns)
    if missing:
        raise ValueError(
            f"Columnas faltantes en '{csv_path}': {missing}\n"
            f"Encontradas: {list(df.columns)}"
        )

    df['label_idx'] = df['label'].map(CLASS_TO_IDX)
    unknown = df[df['label_idx'].isna()]['label'].unique()
    if len(unknown) > 0:
        raise ValueError(f"Etiquetas no reconocidas: {unknown}")

    filepaths = df['filepath'].values.astype(str)
    labels    = df['label_idx'].values.astype(np.int32)

    print(f"[build_dataset] split='{split}' | {len(filepaths)} imágenes "
          f"| batch_size={batch_size} | augment={augment}")

    dataset = tf.data.Dataset.from_tensor_slices((filepaths, labels))

    if split == 'train':
        dataset = dataset.shuffle(
            buffer_size=len(filepaths),
            seed=SEED,
            reshuffle_each_iteration=True
        )

    # Paso 1: cargar → [0, 255]
    dataset = dataset.map(preprocess_image,
                          num_parallel_calls=tf.data.AUTOTUNE)

    # Paso 2: augmentation → [0, 255] (solo train)
    if split == 'train' and augment is not None:
        if augment == 'global':
            aug_layer = build_global_augmentation_layer()
        elif augment in AUG_CONFIG:
            aug_layer = build_augmentation_layer(augment)
        else:
            raise ValueError(
                f"augment='{augment}' no válido. "
                f"Usa 'global' o: {list(AUG_CONFIG.keys())}"
            )
        dataset = dataset.map(
            lambda img, lbl: (aug_layer(img, training=True), lbl),
            num_parallel_calls=tf.data.AUTOTUNE
        )

    # Paso 3: batch + prefetch
    # EfficientNetB0 normaliza [0,255] → [-1,1] internamente
    dataset = dataset.batch(batch_size)
    dataset = dataset.prefetch(buffer_size=tf.data.AUTOTUNE)

    return dataset

def get_class_weights(weights_path='logs/class_weights.json'):
    """
    Lee class_weights.json → {índice: peso} para model.fit().
    """
    weights_path = Path(weights_path)
    if not weights_path.exists():
        raise FileNotFoundError(
            f"No encontrado: {weights_path}\n"
            f"Ejecuta primero 01_eda_waste_classifier.ipynb"
        )

    with open(weights_path, 'r', encoding='utf-8') as f:
        by_name = json.load(f)

    by_idx = {
        CLASS_TO_IDX[cls]: float(w)
        for cls, w in by_name.items()
        if cls in CLASS_TO_IDX
    }

    print("[get_class_weights] Pesos cargados:")
    for cls, idx in CLASS_TO_IDX.items():
        print(f"  {idx} · {cls:<15} → {by_idx.get(idx, 'NO ENCONTRADO')}")

    return by_idx


if __name__ == '__main__':
    print('\n' + '=' * 50)
    print('  data_pipeline.py — verificación')
    print('=' * 50)

    dummy = tf.cast(tf.random.uniform((300, 400, 3), 0, 255), tf.uint8)
    path  = '/tmp/test_pipeline.jpg'
    tf.io.write_file(path, tf.image.encode_jpeg(dummy))

    img, _ = preprocess_image(path, label=0)
    assert 0.0 <= float(img.numpy().min()) and float(img.numpy().max()) <= 255.0
    print(f'[1] preprocess_image : [{img.numpy().min():.1f}, {img.numpy().max():.1f}]  ✅')

    aug    = build_global_augmentation_layer()
    augd   = aug(img, training=True)
    print(f'[2] augmentation     : [{augd.numpy().min():.1f}, {augd.numpy().max():.1f}]  ✅')

    norm, _ = normalize_image(augd, label=0)
    assert float(norm.numpy().min()) >= -1.1 and float(norm.numpy().max()) <= 1.1
    print(f'[3] normalize_image  : [{norm.numpy().min():.3f}, {norm.numpy().max():.3f}]  ✅')

    for cls in CLASSES:
        assert cls in AUG_CONFIG
    print(f'[4] AUG_CONFIG       : {len(AUG_CONFIG)} clases  ✅')

    print('\n✅ Todos los tests pasaron')
    print('=' * 50)
