import "./main.css";
import { useEffect, useState } from "react";
import "./../icons/css/all.min.css";
import Search from "./Search";
import axios from "axios";
import data from "./data";
import getImg from "./getImg";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

export default function Main() {
    // States
    const [lang, setLang] = useState("en");
    const [location, setLocation] = useState({});
    const [city, setCity] = useState("London");
    const [temp, setTemp] = useState({
        mian: "",
        description: "",
        icon: "",
        temp: "",
        humidity: "",
        speed: "",
        pressure: "",
        clouds: "",
        currCity: "",
    });
    const [name, setName] = useState(false);
    let date = moment().format("h:mm - dddd, D MMMM YY");
    const { t,i18n } = useTranslation();
    // Handles
    function getCurrentLocation(obj) {
        setLocation(obj);
        setName(true);
    }
    function getCity(city) {
        setCity(city);
        setName(false)
        data.map((el) => {
            if (el[`${city}`]) {
                setLocation(el[`${city}`]);
            }
            return el;
        });
    }
    if (lang === "en") {
        moment.locale("en");
    } else {
        moment.locale("ar");
    }
    useEffect(() => {
        let key = "47e8589bd0e8951da8010c248353ed0b";
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${
                        location.latitude ?? "51.507351"
                    }&lon=${location.longitude ?? "-0.127758"}&appid=${key}`,
                    {
                        cancelToken: source.token,
                    }
                );
                setTemp({
                    mian: response.data.weather[0].main,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                    temp: Math.round(response.data.main.temp - 272.15),
                    humidity: response.data.main.humidity,
                    speed: response.data.wind.speed,
                    pressure: response.data.main.pressure,
                    clouds: response.data.clouds.all,
                    currCity: response.data.name,
                });
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    console.log(error.message);
                }
            }
        };
        fetchData();
        // Clean up function to cancel the request
        return () => {
            source.cancel("Request canceled due to component unmounting");
        };
    }, [location]);
    return (
        <>
            <div className={lang === "en" ? "container en" : "container ar"}>
                <div
                    className="card"
                    style={{
                        backgroundImage: `url("${getImg(temp.description)}")`,
                    }}
                >
                    <div className="toggle">
                        <div
                            className={`toggle-content ${
                                lang === "ar" ? "right" : "left"
                            }`}
                        >
                            <div className="toggle-content-container">
                                <select
                                    className="lang"
                                    defaultValue="en"
                                    onChange={(e) => {
                                        setLang(e.target.value);i18n.changeLanguage(e.target.value);
                                    }}
                                >
                                    <option value="en">English</option>
                                    <option value="ar">عربي</option>
                                </select>
                                <div className="temp">
                                    <h2>{temp.temp}°</h2>
                                    <div className="city">
                                        <h3>{name ? temp.currCity : city}</h3>
                                        <p>{date}</p>
                                    </div>
                                    <div className="cloud">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                                            alt="img"
                                        />
                                        <p>{t(temp.mian)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`toggle-details ${
                                lang === "ar" ? "left" : "right"
                            }`}
                        >
                            <div className="toggle-details-container">
                                <Search
                                    getCity={getCity}
                                    getCurrentLocation={getCurrentLocation}
                                />
                                <div className="weather-details">
                                    <h2>{t("Weather Details")}</h2>
                                    <div>
                                        <p>{t("Cloudy")}</p>
                                        <i>{temp.clouds}%</i>
                                    </div>
                                    <div>
                                        <p>{t("Humidity")}</p>
                                        <i>{temp.humidity}%</i>
                                    </div>
                                    <div>
                                        <p>{t("Wind")}</p>
                                        <i>{temp.speed}km/h</i>
                                    </div>
                                    <div>
                                        <p>{t("Pressure")}</p>
                                        <i>{temp.pressure}Pa</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
