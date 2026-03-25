// ========== CATEGORY DATA (all languages) ==========
const categoryData = {
  en: {
    cardboard: {
      icon: "box", color: "#3B82F6", bin: "Blue",
      images: "1,755", f1: "0.95",
      why: "Recycling one ton of cardboard saves 9 cubic meters of landfill space and 17 trees. Cardboard is one of the easiest materials to recycle, requiring 75% less energy than making new cardboard from raw pulp.",
      fact: "Cardboard can be recycled 5 to 7 times before fibers become too short. Over 80% of products sold in the US are packaged in cardboard, generating more than 400 billion square feet of cardboard every year.",
      examples: "Shipping boxes, cereal boxes, egg cartons, toilet paper rolls, shoe boxes, pizza boxes (if clean), packaging tubes.",
      mistakes: "Waxed cardboard (juice cartons) goes in a different bin. Greasy pizza boxes should go in organic waste. Do not include cardboard with heavy tape or staples still attached."
    },
    glass: {
      icon: "wine-bottle", color: "#22C55E", bin: "Green",
      images: "2,500", f1: "0.95",
      why: "Glass is 100% recyclable and can be recycled endlessly without loss of quality. Recycling glass reduces CO2 emissions by 50% compared to manufacturing new glass. Every ton recycled saves 1.2 tons of raw materials.",
      fact: "A glass bottle takes over 1 million years to decompose in a landfill. However, a recycled bottle can go from the recycling bin to a store shelf as a new bottle in just 30 days.",
      examples: "Beverage bottles, food jars, wine bottles, sauce containers, cosmetic glass containers.",
      mistakes: "Window glass, mirrors, and ceramics have different melting points and contaminate the batch. Light bulbs contain metals and should go to special collection. Pyrex and heat-resistant glass cannot be recycled with regular glass."
    },
    metal: {
      icon: "industry", color: "#EAB308", bin: "Yellow",
      images: "1,969", f1: "0.90",
      why: "Recycling aluminum saves 95% of the energy needed to make new aluminum from raw ore. Steel recycling saves 60% of energy. Metals can be recycled indefinitely without losing their properties.",
      fact: "An aluminum can returns to the shelf as a new can in as little as 60 days. The average aluminum can contains 73% recycled content. Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
      examples: "Aluminum cans, tin cans, food containers, aluminum foil (clean), bottle caps, metal lids, aerosol cans (empty).",
      mistakes: "Paint cans with residue need special disposal. Batteries contain hazardous metals and require specific recycling. Pots and pans are too thick for standard recycling and should go to scrap metal."
    },
    organic: {
      icon: "leaf", color: "#92400E", bin: "Brown",
      images: "1,832", f1: "0.97",
      why: "Organic waste in landfills produces methane, a greenhouse gas 25 times more potent than CO2. Composting turns waste into nutrient-rich soil that reduces the need for chemical fertilizers by up to 50%.",
      fact: "Around 40% of all food produced globally is wasted. If food waste were a country, it would be the third largest emitter of greenhouse gases after China and the US.",
      examples: "Fruit peels, vegetable scraps, coffee grounds, tea bags, eggshells, garden trimmings, leaves, grass clippings, small branches.",
      mistakes: "Meat and dairy can attract pests in home composting (but are fine for industrial composting). Cooked food with oils should be avoided. Biodegradable plastic bags may not decompose in all composting facilities."
    },
    paper: {
      icon: "newspaper", color: "#3B82F6", bin: "Blue",
      images: "2,144", f1: "0.96",
      why: "Recycling paper saves 70% of the energy needed to produce new paper. Each ton of recycled paper saves 17 trees, 26,000 liters of water, and 2.5 cubic meters of landfill space.",
      fact: "Paper accounts for 26% of total waste in landfills. The average office worker uses about 10,000 sheets of paper per year. Paper can be recycled 5 to 7 times before fibers become too short.",
      examples: "Newspapers, magazines, office paper, envelopes, notebooks, printing paper, wrapping paper (non-metallic), paper bags.",
      mistakes: "Tissues and paper towels are contaminated and belong in organic waste. Wax-coated paper cannot be recycled. Shredded paper is often too small to process. Receipts (thermal paper) contain BPA and should not be recycled."
    },
    plastic: {
      icon: "bottle-water", color: "#F59E0B", bin: "Yellow",
      images: "2,268", f1: "0.90",
      why: "Only 9% of all plastic ever produced has been recycled. Recycling plastic uses 88% less energy than producing it from raw materials. Keeping plastic out of oceans prevents harm to over 800 marine species.",
      fact: "A plastic bottle takes 450 years to decompose. We produce approximately 380 million tons of plastic yearly, roughly equivalent to the weight of the entire human population. By 2050, there could be more plastic than fish in the ocean.",
      examples: "PET bottles (water, soda), HDPE containers (shampoo, detergent), plastic food trays, yogurt cups, plastic bags (some regions).",
      mistakes: "Black plastic is often undetectable by sorting machines. Plastic toys have mixed materials. Food-contaminated plastic must be rinsed first. Styrofoam (polystyrene) is rarely recycled in standard bins."
    },
    trash: {
      icon: "trash-can", color: "#6B7280", bin: "Gray",
      images: "1,329", f1: "0.88",
      why: "Proper sorting ensures recyclable materials do not end up in landfills. The average person generates about 0.74 kg of waste per day. Reducing general waste is the best way to lower environmental impact.",
      fact: "An average landfill is active for about 30-50 years. After closing, it requires monitoring for another 30 years. Modern landfills use liners and gas collection, but older ones can leak toxins into groundwater.",
      examples: "Broken ceramics, worn-out shoes, used diapers, cigarette butts, chewing gum, broken household items, dust and sweepings.",
      mistakes: "Many items in the trash bin could actually be recycled. Check if your item fits another category first. Electronics, batteries, and hazardous chemicals require special disposal, not the general trash bin."
    }
  },
  es: {
    cardboard: {
      icon: "box", color: "#3B82F6", bin: "Azul",
      images: "1,755", f1: "0.95",
      why: "Reciclar una tonelada de carton ahorra 9 metros cubicos de espacio en vertedero y 17 arboles. El carton es uno de los materiales mas faciles de reciclar, requiriendo un 75% menos de energia que fabricarlo nuevo.",
      fact: "El carton puede reciclarse de 5 a 7 veces antes de que las fibras sean demasiado cortas. Mas del 80% de los productos se envasan en carton, generando mas de 37 mil millones de metros cuadrados al anho.",
      examples: "Cajas de envio, cajas de cereales, hueveras, rollos de papel higienico, cajas de zapatos, cajas de pizza (si estan limpias), tubos de embalaje.",
      mistakes: "El carton encerado (tetrabrik) va en otro contenedor. Las cajas de pizza con grasa van al organico. No incluir carton con mucha cinta adhesiva o grapas."
    },
    glass: {
      icon: "wine-bottle", color: "#22C55E", bin: "Verde",
      images: "2,500", f1: "0.95",
      why: "El vidrio es 100% reciclable y puede reciclarse infinitamente sin perder calidad. Reciclar vidrio reduce las emisiones de CO2 un 50% comparado con fabricar vidrio nuevo. Cada tonelada reciclada ahorra 1,2 toneladas de materias primas.",
      fact: "Una botella de vidrio tarda mas de 1 millon de anhos en descomponerse en un vertedero. Sin embargo, una botella reciclada puede volver a ser una botella nueva en la estanteria en solo 30 dias.",
      examples: "Botellas de bebidas, tarros de comida, botellas de vino, envases de salsa, envases de cosmeticos de vidrio.",
      mistakes: "El vidrio de ventanas, espejos y ceramica tiene diferentes puntos de fusion y contamina el lote. Las bombillas contienen metales y van a punto limpio. El pyrex no se recicla con vidrio normal."
    },
    metal: {
      icon: "industry", color: "#EAB308", bin: "Amarillo",
      images: "1,969", f1: "0.90",
      why: "Reciclar aluminio ahorra el 95% de la energia necesaria para fabricar aluminio nuevo. El reciclaje de acero ahorra un 60%. Los metales pueden reciclarse indefinidamente sin perder propiedades.",
      fact: "Una lata de aluminio puede volver a ser una lata nueva en solo 60 dias. La lata promedio contiene un 73% de contenido reciclado. Reciclar una lata ahorra energia suficiente para alimentar un televisor durante 3 horas.",
      examples: "Latas de aluminio, latas de conserva, envases de comida, papel de aluminio (limpio), tapones, tapas metalicas, aerosoles (vacios).",
      mistakes: "Los botes de pintura con residuos necesitan eliminacion especial. Las pilas contienen metales peligrosos y requieren reciclaje especifico. Sartenes y ollas son demasiado gruesas para el reciclaje estandar."
    },
    organic: {
      icon: "leaf", color: "#92400E", bin: "Marron",
      images: "1,832", f1: "0.97",
      why: "Los residuos organicos en vertederos producen metano, un gas de efecto invernadero 25 veces mas potente que el CO2. El compostaje convierte los residuos en tierra rica en nutrientes que reduce la necesidad de fertilizantes quimicos hasta un 50%.",
      fact: "Alrededor del 40% de toda la comida producida en el mundo se desperdicia. Si el desperdicio alimentario fuera un pais, seria el tercer mayor emisor de gases de efecto invernadero tras China y EE.UU.",
      examples: "Cascaras de fruta, restos de verdura, posos de cafe, bolsitas de te, cascaras de huevo, restos de jardin, hojas, cesped cortado, ramas pequenhas.",
      mistakes: "La carne y los lacteos pueden atraer plagas en compostaje casero (pero sirven para compostaje industrial). Evitar comida cocinada con aceites. Las bolsas biodegradables pueden no descomponerse en todas las instalaciones."
    },
    paper: {
      icon: "newspaper", color: "#3B82F6", bin: "Azul",
      images: "2,144", f1: "0.96",
      why: "Reciclar papel ahorra el 70% de la energia necesaria para producir papel nuevo. Cada tonelada de papel reciclado ahorra 17 arboles, 26.000 litros de agua y 2,5 metros cubicos de espacio en vertedero.",
      fact: "El papel representa el 26% del total de residuos en vertederos. Un oficinista promedio usa unas 10.000 hojas de papel al anho. El papel puede reciclarse de 5 a 7 veces antes de que las fibras sean demasiado cortas.",
      examples: "Periodicos, revistas, papel de oficina, sobres, cuadernos, papel de impresion, papel de regalo (no metalizado), bolsas de papel.",
      mistakes: "Los panhuelos y el papel de cocina estan contaminados y van al organico. El papel encerado no se puede reciclar. El papel triturado suele ser demasiado pequenho. Los tickets de compra (papel termico) contienen BPA y no deben reciclarse."
    },
    plastic: {
      icon: "bottle-water", color: "#F59E0B", bin: "Amarillo",
      images: "2,268", f1: "0.90",
      why: "Solo el 9% de todo el plastico producido se ha reciclado. Reciclar plastico usa un 88% menos de energia que producirlo nuevo. Mantener el plastico fuera de los oceanos protege a mas de 800 especies marinas.",
      fact: "Una botella de plastico tarda 450 anhos en descomponerse. Producimos aproximadamente 380 millones de toneladas de plastico al anho, equivalente al peso de toda la poblacion humana. Para 2050, podria haber mas plastico que peces en el oceano.",
      examples: "Botellas PET (agua, refrescos), envases HDPE (champu, detergente), bandejas de comida, vasos de yogur, bolsas de plastico (en algunas regiones).",
      mistakes: "El plastico negro suele ser indetectable por las maquinas de clasificacion. Los juguetes de plastico tienen materiales mixtos. El plastico con restos de comida debe lavarse primero. El porexpan rara vez se recicla en contenedores estandar."
    },
    trash: {
      icon: "trash-can", color: "#6B7280", bin: "Gris",
      images: "1,329", f1: "0.88",
      why: "La correcta separacion garantiza que los materiales reciclables no acaben en vertederos. Una persona genera una media de 0,74 kg de residuos al dia. Reducir la basura general es la mejor forma de disminuir el impacto ambiental.",
      fact: "Un vertedero medio esta activo entre 30 y 50 anhos. Tras cerrarse, requiere monitorizacion durante otros 30 anhos. Los vertederos modernos usan membranas y captura de gas, pero los antiguos pueden filtrar toxinas al agua subterranea.",
      examples: "Ceramica rota, zapatos desgastados, panales usados, colillas, chicles, objetos domesticos rotos, polvo y barreduras.",
      mistakes: "Muchos objetos del contenedor gris podrian reciclarse. Comprueba primero si tu residuo encaja en otra categoria. Electronica, pilas y productos quimicos peligrosos requieren eliminacion especial, no van al contenedor gris."
    }
  },
  ko: {
    cardboard: {
      icon: "box", color: "#3B82F6", bin: "파란",
      images: "1,755", f1: "0.95",
      why: "골판지 1톤을 재활용하면 매립지 공간 9입방미터와 나무 17그루를 절약합니다. 골판지는 가장 재활용하기 쉬운 소재 중 하나로, 원료 펄프로 새로 만드는 것보다 75% 적은 에너지가 필요합니다.",
      fact: "골판지는 섬유가 너무 짧아지기 전까지 5~7회 재활용할 수 있습니다. 미국에서 판매되는 제품의 80% 이상이 골판지로 포장되어 있으며, 매년 370억 평방미터 이상이 생산됩니다.",
      examples: "택배 상자, 시리얼 상자, 달걀판, 화장지 심, 신발 상자, 피자 상자(깨끗한 경우), 포장 튜브.",
      mistakes: "왁스 코팅 골판지(주스팩)는 다른 분리수거함으로. 기름진 피자 상자는 음식물 쓰레기로. 테이프나 스테이플러가 많이 붙어 있으면 제거하세요."
    },
    glass: {
      icon: "wine-bottle", color: "#22C55E", bin: "초록",
      images: "2,500", f1: "0.95",
      why: "유리는 100% 재활용 가능하며 품질 저하 없이 무한 재활용됩니다. 유리 재활용은 새 유리 제조 대비 CO2 배출량을 50% 줄입니다. 1톤 재활용 시 1.2톤의 원자재를 절약합니다.",
      fact: "유리병은 매립지에서 분해되는 데 100만 년 이상 걸립니다. 하지만 재활용된 병은 30일 만에 새 병으로 매장에 돌아올 수 있습니다.",
      examples: "음료 병, 식품 병, 와인 병, 소스 용기, 화장품 유리 용기.",
      mistakes: "창유리, 거울, 도자기는 녹는점이 달라 오염을 일으킵니다. 전구는 금속을 포함하므로 특수 수거합니다. 내열 유리(파이렉스)는 일반 유리와 함께 재활용할 수 없습니다."
    },
    metal: {
      icon: "industry", color: "#EAB308", bin: "노란",
      images: "1,969", f1: "0.90",
      why: "알루미늄 재활용은 원광석에서 새로 만드는 것보다 95%의 에너지를 절약합니다. 철강 재활용은 60%를 절약합니다. 금속은 속성 손실 없이 무한 재활용할 수 있습니다.",
      fact: "알루미늄 캔은 60일 만에 새 캔으로 매장에 돌아올 수 있습니다. 평균 알루미늄 캔은 73%의 재활용 함량을 포함합니다. 캔 1개 재활용으로 TV 3시간 시청 에너지를 절약합니다.",
      examples: "알루미늄 캔, 깡통, 식품 용기, 알루미늄 호일(깨끗한 것), 병뚜껑, 금속 뚜껑, 에어로졸 캔(빈 것).",
      mistakes: "잔여물이 있는 페인트 캔은 특수 처리가 필요합니다. 배터리는 유해 금속을 포함하므로 별도 수거합니다. 냄비와 프라이팬은 고철 수거소로 가세요."
    },
    organic: {
      icon: "leaf", color: "#92400E", bin: "갈색",
      images: "1,832", f1: "0.97",
      why: "매립지의 유기 폐기물은 CO2보다 25배 강력한 온실가스인 메탄을 생산합니다. 퇴비화는 폐기물을 영양분이 풍부한 토양으로 변환하여 화학 비료 필요성을 최대 50%까지 줄입니다.",
      fact: "전 세계적으로 생산되는 식량의 약 40%가 낭비됩니다. 음식물 쓰레기가 나라라면, 중국과 미국에 이어 세 번째로 큰 온실가스 배출국이 될 것입니다.",
      examples: "과일 껍질, 채소 찌꺼기, 커피 찌꺼기, 티백, 달걀 껍질, 정원 잔해, 낙엽, 잔디 깎은 것, 작은 나뭇가지.",
      mistakes: "육류와 유제품은 가정 퇴비에서 해충을 유인할 수 있습니다(산업용 퇴비에는 괜찮습니다). 기름진 조리 음식은 피하세요. 생분해성 비닐봉지는 모든 시설에서 분해되지 않을 수 있습니다."
    },
    paper: {
      icon: "newspaper", color: "#3B82F6", bin: "파란",
      images: "2,144", f1: "0.96",
      why: "종이 재활용은 새 종이 생산에 필요한 에너지의 70%를 절약합니다. 재활용 종이 1톤당 나무 17그루, 물 26,000리터, 매립지 공간 2.5입방미터를 절약합니다.",
      fact: "종이는 매립지 총 쓰레기의 26%를 차지합니다. 평균 사무직 직원은 연간 약 10,000장의 종이를 사용합니다. 종이는 섬유가 짧아지기 전까지 5~7회 재활용할 수 있습니다.",
      examples: "신문, 잡지, 사무용 종이, 봉투, 노트, 인쇄 용지, 포장지(비금속), 종이 가방.",
      mistakes: "휴지와 키친타월은 오염되어 있어 음식물로 분류합니다. 왁스 코팅 종이는 재활용 불가합니다. 파쇄된 종이는 너무 작아서 처리가 어렵습니다. 영수증(감열지)은 BPA를 포함하여 재활용하면 안 됩니다."
    },
    plastic: {
      icon: "bottle-water", color: "#F59E0B", bin: "노란",
      images: "2,268", f1: "0.90",
      why: "지금까지 생산된 모든 플라스틱의 9%만 재활용되었습니다. 플라스틱 재활용은 원재료 생산보다 88% 적은 에너지를 사용합니다. 바다에서 플라스틱을 치우면 800종 이상의 해양 생물을 보호할 수 있습니다.",
      fact: "플라스틱 병은 분해되는 데 450년이 걸립니다. 매년 약 3억 8천만 톤의 플라스틱을 생산하며, 이는 전 인류의 무게와 거의 같습니다. 2050년까지 바다에 물고기보다 플라스틱이 더 많을 수 있습니다.",
      examples: "PET 병(물, 탄산음료), HDPE 용기(샴푸, 세제), 플라스틱 식품 트레이, 요구르트 컵, 비닐봉지(일부 지역).",
      mistakes: "검은색 플라스틱은 분류기계가 감지하지 못하는 경우가 많습니다. 플라스틱 장난감은 혼합 재질입니다. 음식물이 묻은 플라스틱은 먼저 세척하세요. 스티로폼은 일반 분리수거함에서 거의 재활용되지 않습니다."
    },
    trash: {
      icon: "trash-can", color: "#6B7280", bin: "회색",
      images: "1,329", f1: "0.88",
      why: "올바른 분리수거는 재활용 가능한 자원이 매립지에 버려지지 않도록 합니다. 한 사람이 하루에 약 0.74kg의 쓰레기를 생산합니다. 일반 쓰레기를 줄이는 것이 환경 영향을 낮추는 가장 좋은 방법입니다.",
      fact: "평균적인 매립지는 약 30~50년 동안 사용됩니다. 폐쇄 후에도 30년간 모니터링이 필요합니다. 현대 매립지는 방수막과 가스 포집을 사용하지만, 오래된 매립지는 지하수에 독소를 유출할 수 있습니다.",
      examples: "깨진 도자기, 낡은 신발, 사용한 기저귀, 담배꽁초, 껌, 고장난 가정용품, 먼지와 쓸어 모은 것.",
      mistakes: "일반 쓰레기통의 많은 물건이 실제로 재활용될 수 있습니다. 먼저 다른 카테고리에 맞는지 확인하세요. 전자제품, 배터리, 유해 화학물질은 특수 처리가 필요합니다."
    }
  }
};

function getCategoryData(category) {
  const lang = document.documentElement.getAttribute('data-lang') || 'en';
  return categoryData[lang]?.[category] || categoryData.en[category];
}

// ========== ABOUT CARD TOGGLE ==========
function toggleAboutCard(card) {
  card.classList.toggle("open");
}

// ========== TAB SWITCHING ==========
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
  document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add("active");
  document.getElementById(tabId).classList.add("active");

  if (tabId === "metrics") renderLearningCurves();
}

// ========== MODAL ==========
function openModal(category) {
  const d = getCategoryData(category);
  const modal = document.getElementById("categoryModal");
  const header = document.getElementById("modalHeader");

  header.style.background = d.color;
  document.getElementById("modalIcon").className = `fa-solid fa-${d.icon}`;
  document.getElementById("modalTitle").textContent = category;
  document.getElementById("modalImages").textContent = d.images;
  document.getElementById("modalF1").textContent = d.f1;
  document.getElementById("modalBin").textContent = d.bin;
  document.getElementById("modalWhy").textContent = d.why;
  document.getElementById("modalFact").textContent = d.fact;
  document.getElementById("modalExamples").textContent = d.examples;
  document.getElementById("modalMistakes").textContent = d.mistakes;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(event, force) {
  if (force || event.target.classList.contains("modal-overlay")) {
    document.getElementById("categoryModal").classList.remove("open");
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal({target: {classList: {contains: () => false}}}, true);
});

// ========== SUB-TAB SWITCHING ==========
function switchSubTab(tabId) {
  document.querySelectorAll(".sub-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".sub-tab-content").forEach(c => c.classList.remove("active"));
  document.querySelector(`.sub-tab[data-subtab="${tabId}"]`).classList.add("active");
  document.getElementById(`subtab-${tabId}`).classList.add("active");

  // Stop camera when switching away
  if (tabId !== "camera") stopCamera();

  // Reset result
  const result = document.getElementById("result");
  if (result) result.style.display = "none";
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "none";
}

// ========== CAMERA ==========
let cameraStream = null;

function startCamera() {
  const video = document.getElementById("cameraFeed");
  const startBtn = document.getElementById("startCameraBtn");
  const captureBtn = document.getElementById("captureBtn");
  const stopBtn = document.getElementById("stopCameraBtn");

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } }
  })
  .then(stream => {
    cameraStream = stream;
    video.srcObject = stream;
    video.classList.add("active");
    startBtn.style.display = "none";
    captureBtn.style.display = "inline-flex";
    stopBtn.style.display = "inline-flex";
  })
  .catch(err => {
    alert("Could not access camera: " + err.message);
  });
}

function stopCamera() {
  const video = document.getElementById("cameraFeed");
  const startBtn = document.getElementById("startCameraBtn");
  const captureBtn = document.getElementById("captureBtn");
  const stopBtn = document.getElementById("stopCameraBtn");

  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  if (video) {
    video.srcObject = null;
    video.classList.remove("active");
  }
  if (startBtn) startBtn.style.display = "inline-flex";
  if (captureBtn) captureBtn.style.display = "none";
  if (stopBtn) stopBtn.style.display = "none";
}

function captureFrame() {
  const video = document.getElementById("cameraFeed");
  const canvas = document.getElementById("cameraCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  // Show preview
  const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
  document.getElementById("cameraPreviewImg").src = dataUrl;
  document.getElementById("cameraPreview").style.display = "block";

  // Stop camera after capture
  stopCamera();
  document.getElementById("cameraContainer").style.display = "none";

  // Send to server
  canvas.toBlob(blob => {
    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
    classifyImage(file);
  }, "image/jpeg", 0.9);
}

function clearCapture() {
  document.getElementById("cameraPreview").style.display = "none";
  document.getElementById("cameraContainer").style.display = "block";
  document.getElementById("result").style.display = "none";
  document.getElementById("loading").style.display = "none";
}

// ========== FILE UPLOAD ==========
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const previewImg = document.getElementById("previewImg");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const clearBtn = document.getElementById("clearBtn");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) handleFile(file);
});

dropZone.addEventListener("click", (e) => {
  // Avoid double-trigger when clicking the label/input directly
  if (e.target === fileInput || e.target.closest(".upload-btn")) return;
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files[0]) handleFile(fileInput.files[0]);
});

clearBtn.addEventListener("click", resetUI);

function handleFile(file) {
  if (file.size > 10 * 1024 * 1024) {
    alert("File too large. Maximum size is 10MB.");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    preview.style.display = "block";
    dropZone.style.display = "none";
    result.style.display = "none";
  };
  reader.readAsDataURL(file);
  classifyImage(file);
}

async function classifyImage(file) {
  loading.style.display = "block";
  result.style.display = "none";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/predict", { method: "POST", body: formData });
    const data = await response.json();
    if (data.error) {
      alert("Error: " + data.error);
      loading.style.display = "none";
      return;
    }
    displayResult(data);
  } catch {
    alert("Failed to connect to the server. Please try again.");
  } finally {
    loading.style.display = "none";
  }
}

function displayResult(data) {
  document.getElementById("resultHeader").style.background = data.color;
  document.getElementById("resultIcon").className = `fa-solid fa-${data.icon}`;
  document.getElementById("resultClass").textContent = data.class;
  document.getElementById("resultBin").textContent = `Goes in the ${data.bin}`;
  document.getElementById("resultConfidence").textContent = `${data.confidence}%`;

  const chart = document.getElementById("predictionsChart");
  const colors = {
    cardboard: "#3B82F6", glass: "#22C55E", metal: "#EAB308",
    organic: "#92400E", paper: "#3B82F6", plastic: "#F59E0B", trash: "#6B7280"
  };

  chart.innerHTML = "";
  data.all_predictions.forEach((pred) => {
    const row = document.createElement("div");
    row.className = "pred-row";
    row.innerHTML = `
      <span class="pred-label">${pred.class}</span>
      <div class="pred-bar-bg">
        <div class="pred-bar-fill" style="width:${pred.probability}%;background:${colors[pred.class] || "#52B788"}"></div>
      </div>
      <span class="pred-value">${pred.probability}%</span>
    `;
    chart.appendChild(row);
  });

  result.style.display = "block";
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function resetUI() {
  preview.style.display = "none";
  result.style.display = "none";
  loading.style.display = "none";
  dropZone.style.display = "block";
  fileInput.value = "";
  previewImg.src = "";
}

// ========== LEARNING CURVES CHART ==========
let chartRendered = false;

function renderLearningCurves() {
  if (chartRendered) return;
  chartRendered = true;

  const ctx = document.getElementById("learningCurves");
  if (!ctx) return;

  const trainAcc = [61.5,78.1,81.4,82.6,83.5,83.4,84.6,84.9,84.8,85.9,85.8,86.0,86.4,87.0,86.3,86.5,87.0,87.2,87.4,87.3,
                    91.5,92.2,92.8,93.7,94.6,95.0,95.2,95.5,95.9];
  const valAcc =   [83.4,85.0,86.1,86.2,87.5,87.5,88.2,88.2,88.9,89.1,89.5,89.8,89.5,89.6,90.5,89.8,90.6,90.4,90.0,91.5,
                    92.0,93.0,93.7,93.8,94.2,94.1,94.2,94.2,94.3];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({length: 29}, (_, i) => i + 1),
      datasets: [
        {
          label: "Train Accuracy",
          data: trainAcc,
          borderColor: "#2D6A4F",
          backgroundColor: "rgba(45,106,79,0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 2,
          borderWidth: 2
        },
        {
          label: "Val Accuracy",
          data: valAcc,
          borderColor: "#52B788",
          backgroundColor: "rgba(82,183,136,0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 2,
          borderWidth: 2,
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        annotation: {}
      },
      scales: {
        x: { title: { display: true, text: "Epoch" } },
        y: { title: { display: true, text: "Accuracy (%)" }, min: 55, max: 100 }
      }
    },
    plugins: [{
      id: "phaseLines",
      afterDraw(chart) {
        const ctx2 = chart.ctx;
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;

        [20, 25].forEach((epoch, i) => {
          const x = xAxis.getPixelForValue(epoch - 1);
          ctx2.save();
          ctx2.beginPath();
          ctx2.setLineDash([6, 4]);
          ctx2.strokeStyle = "#B7E4C7";
          ctx2.lineWidth = 1.5;
          ctx2.moveTo(x, yAxis.top);
          ctx2.lineTo(x, yAxis.bottom);
          ctx2.stroke();
          ctx2.fillStyle = "#9CA3AF";
          ctx2.font = "11px sans-serif";
          ctx2.fillText(i === 0 ? "Phase 2" : "Phase 3", x + 4, yAxis.top + 14);
          ctx2.restore();
        });
      }
    }]
  });
}
