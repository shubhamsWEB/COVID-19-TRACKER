import covid19 from "../api/covid19";
import news from "../api/news";
import {STATE_WISE,DISTRICT_WISE,LIVE_NEWS} from "./types";

export const getNews = () => async dispatch => {
  const response = await news.get();

  dispatch({ type: LIVE_NEWS, payload: response.data});
};

export const getStateWise = () => async dispatch => {
  const response = await covid19.get("/data.json");

  dispatch({ type: STATE_WISE, payload: response.data });
};

export const getDistrictWise = () => async dispatch => {
  const response = await covid19.get("/state_district_wise.json");

  dispatch({ type: DISTRICT_WISE, payload: response.data });
};
