import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        ar: {
            translation: {
                "Search":"بحث",
                "Current Location": "الموقع الحالي",
                "Clear sky": "سماء صافية",
                "Few clouds": "قليل من السحب",
                "Scattered clouds": "سحب متفرقة",
                "Broken clouds": "سحب متفاوتة",
                "Shower rain": "أمطار متفرقة",
                "Rain": "مطر",
                "Thunderstorm": "عاصفة رعدية",
                "Snow": "ثلج",
                "Mist": "ضباب",
                "Clouds": "سحب",
                "Clear": "صافي",
                "Weather Details": "تفاصيل الطقس",
                "Cloudy": "غائم",
                "Humidity": "الرطوبة",
                "Wind": "الرياح",
                "Pressure": "الضغط الجوي",
            },
        },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
