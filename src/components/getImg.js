import few_clouds from "./../images/few_clouds.jpg";
import broken_clouds from "./../images/broken_clouds.jpg";
import clear_sky from "./../images/clear_sky.jpg";
import mist from "./../images/mist.jpg";
import rain from "./../images/rain.jpg";
import scattered_clouds from "./../images/scattered_clouds.jpeg";
import shower_rain from "./../images/shower_rain.jpg";
import snow from "./../images/snow.jpg";
import thunderstorm from "./../images/thunderstorm.jpg";

export default function getImg(description){
    switch (description) {
        case "clear sky":
            return clear_sky
        case "few clouds":
            return few_clouds
        case "scattered clouds":
            return scattered_clouds
        case "broken clouds":
            return broken_clouds
        case "shower rain":
            return shower_rain
        case "rain":
            return rain
        case "thunderstorm":
            return thunderstorm
        case "snow":
            return snow
        case "mist":
            return mist
        default:
            return mist;
    }
}