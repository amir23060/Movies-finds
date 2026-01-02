import { useNavigate } from "react-router-dom";
import { SeriesDetail } from "../../components/detail/serieDetail";
import {  Slides } from "../../components/slides/slides";

import "../layout.css"
import { getAiringTodaySeries, getOnTheAirSeries, getPopularSeries, getTopRatedSeries, getTrendingSeries } from "./api/serie-api";
import { Day_Trending } from "../../components/dayTrending/dayTrending";
import { Navbar } from "../../components/navbar/navbar";
export function Series(){
    const navigate=useNavigate()
    return(<>
    <Navbar movies={false
    }/>
    <Day_Trending api={getTrendingSeries} detailPopUp={SeriesDetail}/>

    <div className="serieSlides">
        <Slides header={"Trending Series"} api={getTrendingSeries} detailPopUp={SeriesDetail}/>
        <Slides header={"Popular Series"} api={getPopularSeries} detailPopUp={SeriesDetail} />
        <Slides header={"Top rated Series"} api={getTopRatedSeries} detailPopUp={SeriesDetail} />
        <Slides header={"Airing today"} api={getAiringTodaySeries} detailPopUp={SeriesDetail} />
        <Slides header={"On the air Series"} api={getOnTheAirSeries} detailPopUp={SeriesDetail} />
    </div>
    </>)

}
