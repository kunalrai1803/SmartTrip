export const CITY_IMAGES = {
  Panaji: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Panaji_City.JPG",
  Margao:
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Front_Elevation_of_Margao_Municipal_Council_%28cropped%29.jpg",
  "Vasco da Gama":
    "https://upload.wikimedia.org/wikipedia/commons/7/73/Goa-Vasco_03-2016_02_Vaddem.jpg",
  Ahmedabad:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sabarmati_riverside.jpg/3840px-Sabarmati_riverside.jpg",
  Surat: "https://upload.wikimedia.org/wikipedia/commons/4/47/Bharthana_Althan_area.jpg",
  Vadodara: "https://upload.wikimedia.org/wikipedia/commons/b/bd/LakshmiVilas_Palace.jpg",
  Bengaluru:
    "https://upload.wikimedia.org/wikipedia/commons/c/cd/View_from_Visvesvaraya_Industrial_and_Technological_Museum_%282025%29_02.jpg",
  Mysuru: "https://upload.wikimedia.org/wikipedia/commons/5/56/Mysuru_Montage.jpg",
  Mangaluru:
    "https://upload.wikimedia.org/wikipedia/commons/1/14/Growing_skylines_of_the_Mangalore_CBD_region.jpg",
  Kochi: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Kochi_Skyline.jpg",
  Thiruvananthapuram:
    "https://upload.wikimedia.org/wikipedia/commons/a/ad/Padmanabhaswamy_Temple_Thiruvananthapuram.jpg",
  Kozhikode: "https://upload.wikimedia.org/wikipedia/commons/4/45/Kozhikode_beach_kites.jpg",
  Mumbai: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Mumbai_Bandra-Worli_Sea_Link.jpg",
  Pune: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Pune_West_skyline_-_March_2017.jpg",
  Nagpur: "https://upload.wikimedia.org/wikipedia/commons/3/38/Deekshabhoomi_-_panoramio.jpg",
  Jaipur:
    "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
  Udaipur:
    "https://upload.wikimedia.org/wikipedia/commons/6/6f/Evening_view%2C_City_Palace%2C_Udaipur.jpg",
  Jodhpur: "https://upload.wikimedia.org/wikipedia/commons/9/99/Mehrangarh_Fort_sanhita.jpg",
  Chennai: "https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg",
  Madurai:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Meenakshi_Amman_West_Tower.jpg/3840px-Meenakshi_Amman_West_Tower.jpg",
  Coimbatore: "https://upload.wikimedia.org/wikipedia/commons/7/7e/CHIL_SEZ.jpg",
  Hyderabad: "https://upload.wikimedia.org/wikipedia/commons/8/88/Downtown_hyderabad_drone.png",
  Warangal: "https://upload.wikimedia.org/wikipedia/commons/6/6e/WarangalMontage.jpg",
  Nizamabad: "https://upload.wikimedia.org/wikipedia/commons/d/df/Nizamabad_Montage.jpg",
  Varanasi:
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg",
  Lucknow:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Harzratganj_Market%2C_Lucknow.jpg",
  Agra: "https://upload.wikimedia.org/wikipedia/commons/6/68/Taj_Mahal%2C_Agra%2C_India.jpg",
  Kolkata: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Kolkata_maidan.jpg",
  Darjeeling:
    "https://upload.wikimedia.org/wikipedia/commons/9/96/DarjeelingTrainFruitshop_%282%29.jpg",
  Siliguri: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Siliguri_view_3.jpg",
};

export const CITY_IMAGE_FALLBACK = "/background.jpg";

export function getCityImage(city) {
  return CITY_IMAGES[city] || CITY_IMAGE_FALLBACK;
}

