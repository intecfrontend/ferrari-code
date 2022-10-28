import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";
import SearchLastCriteria from "../components/SearchLastCriteria";

import { useSelector } from "react-redux";
import React from "react";
import '../assets/css/Home.css'

const Main = (props) => {
  const lang = useSelector((state) => state.general.lang);

  return (
    <div id="homepage">
      <Navigation page="homepage"/>
      <div className="content">
        <div className="search_engine">
          <figure>
            <img src={require(`../assets/imgs/logos/pn/promonetwerk-h-${lang}.svg`)} alt="logo of promonetwork" />
          </figure>
          <Searchbar />
          <SearchLastCriteria />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Main