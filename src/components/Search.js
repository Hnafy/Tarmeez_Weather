import { useEffect, useState } from "react";
import data from './data'
import { useTranslation } from "react-i18next";

export default function Search({getCity,getCurrentLocation}) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [lat ,setLat] = useState(null)
    const [long ,setLong] = useState(null)
    const [cities ,setCities] = useState([])
    const { t } = useTranslation();
    useEffect(()=>{
        setCities(data.map((el)=>Object.keys(el)[0]))
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((position)=>{
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
            },(error)=>{
                console.log(error.message)
            })
        }else{
            console.log("Geolocation isn't supported in this browser")
        }
    },[])
    function getLocation(){
        getCurrentLocation({latitude:lat,longitude:long})
    }
    function getSuggestions(input) {
        let arrSuggestions = cities.filter((suggestion) =>
            suggestion.toLowerCase().includes(input.toLowerCase())
        );
        if (input != "") {
            setSuggestions(arrSuggestions);
        }
    }
    function handleInputChange(str) {
        const inputValue = str.charAt(0).toUpperCase() + str.slice(1);;
        setQuery(inputValue);
        getSuggestions(inputValue);
    }
    function handleSuggestionClick(suggestion) {
        setQuery(suggestion);
        getCity(suggestion);
        setSuggestions([]);
    }
    function handleEnterKeyPress(event) {
        if (event.key === "Enter") {
            getCity(query)
        }
    }
    return (
        <>
            <div className="search">
                <div className="group">
                    <input
                        type="text"
                        placeholder={t("Search")}
                        value={query}
                        onChange={(e)=>handleInputChange(e.target.value)}
                        onKeyDown={handleEnterKeyPress}
                        required
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <i className="fa-solid fa-magnifying-glass search-icon" onClick={() => getCity(query)}/>
                </div>
                <ul className="search-result">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
                <button className="location" onClick={()=>{getLocation()}}>{t("Current Location")}</button>
            </div>
        </>
    );
}
