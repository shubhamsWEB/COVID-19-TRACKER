import axios from "axios";

export default axios.create({
    baseURL: "http://newsapi.org/v2/top-headlines?q=coronavirus&pageSize=10&country=in&from=2020-03-01&apiKey=672b96d8b6e44e59ae93861b66abb9fa"
});