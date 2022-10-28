import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'

// import DigitalDisplay from "@identitybuilding/idb-react-digital-display";
// import { Button, OsnSelect } from "@identitybuilding/idb-react-ui-elements";
// import Icon from "@identitybuilding/idb-react-iconlib";

import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import Searchbar from "../components/Searchbar"
import '../assets/css/Resultspage.css'
import { Button } from "@identitybuilding/idb-react-ui-elements";
import Slider from "react-slick";
import Icon from "@identitybuilding/idb-react-iconlib";


const Resultspage = (props) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { lang, translate } = useSelector(state => state.general);

    const settings = {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        dots: false,
        infinite: true,
        initialSlide: 0,
        lazyload: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        speed: 500,
        variableWidth: true,
        pauseOnhover: true,
        swipe: false,
    };

    useEffect(() => {
        setLoading(false)
        let query = props.match.params.keyword ? props.match.params.keyword : " "
        let options = {
            "from": 0,
            "size": 30,
            "query": {
                "bool": {
                    "minimum_should_match": 1,
                    "should": [
                        {
                            "simple_query_string": {
                                "query": `\"${query}\"`,
                                "fields": [
                                    "cmp_collectionlinks.name_nl",
                                    "cmp_collectionlinks.name_fr",
                                    "cmp_collectionlinks.name_de",
                                    "cmp_collectionlinks.name_en"
                                ],
                                "boost": 1100
                            }
                        },
                        {
                            "simple_query_string": {
                                "query": `\"${query}\"`,
                                "fields": [
                                    "cmp_collectionlinks.cmps.name_nl",
                                    "cmp_collectionlinks.cmps.name_fr",
                                    "cmp_collectionlinks.cmps.name_de",
                                    "cmp_collectionlinks.cmps.name_en"
                                ],
                                "boost": 1100
                            }
                        },
                        {
                            "simple_query_string": {
                                "query": `\"${query}\"`,
                                "fields": [
                                    "name_nl",
                                    "name_fr",
                                    "name_de",
                                    "name_en",
                                    "from_enterprise.official_name_nl",
                                    "from_enterprise.official_name_fr",
                                    "from_enterprise.official_name_de",
                                    "from_enterprise.official_name_en",
                                    "from_enterprise.name_nl",
                                    "from_enterprise.name_fr",
                                    "from_enterprise.name_de",
                                    "from_enterprise.name_en"
                                ],
                                "boost": 90
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "name_nl": {
                                    "query": `\"${query}*\"`,
                                    "boost": 900
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "name_fr": {
                                    "query": `\"${query}*\"`,
                                    "boost": 900
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "name_de": {
                                    "query": `\"${query}*\"`,
                                    "boost": 900
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "name_en": {
                                    "query": `\"${query}*\"`,
                                    "boost": 900
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "from_enterprise.official_name_nl": {
                                    "query": `\"${query}*\"`,
                                    "boost": 75
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "from_enterprise.official_name_fr": {
                                    "query": `\"${query}*\"`,
                                    "boost": 75
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "from_enterprise.official_name_de": {
                                    "query": `\"${query}*\"`,
                                    "boost": 75
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "from_enterprise.official_name_en": {
                                    "query": `\"${query}*\"`,
                                    "boost": 75
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "from_enterprise.name_nl": {
                                    "query": `\"${query}*\"`,
                                    "boost": 75
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "from_enterprise.name_fr": {
                                    "query": `\"${query}*\"`,
                                    "boost": 75
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "from_enterprise.name_de": {
                                    "query": `\"${query}*\"`,
                                    "boost": 75
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "from_enterprise.name_en": {
                                    "query": `\"${query}*\"`,
                                    "boost": 75
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "cmp_collectionlinks.cmps.name_nl": {
                                    "query": `\"${query}*\"`,
                                    "boost": 900
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "cmp_collectionlinks.cmps.name_fr": {
                                    "query": `\"${query}*\"`,
                                    "boost": 900
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "cmp_collectionlinks.cmps.name_de": {
                                    "query": `\"${query}*\"`,
                                    "boost": 900
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "cmp_collectionlinks.cmps.name_en": {
                                    "query": `\"${query}*\"`,
                                    "boost": 900
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "cmp_collectionlinks.name_nl": {
                                    "query": `\"${query}*\"`,
                                    "boost": 1000
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "cmp_collectionlinks.name_fr": {
                                    "query": `\"${query}*\"`,
                                    "boost": 1000
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "cmp_collectionlinks.name_de": {
                                    "query": `\"${query}*\"`,
                                    "boost": 1000
                                }
                            }
                        },
                        {
                            "match_phrase_prefix": {
                                "cmp_collectionlinks.name_en": {
                                    "query": `\"${query}*\"`,
                                    "boost": 1000
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "name_nl": {
                                    "value": query,
                                    "boost": 80,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "name_fr": {
                                    "value": query,
                                    "boost": 80,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "name_de": {
                                    "value": query,
                                    "boost": 80,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "name_en": {
                                    "value": query,
                                    "boost": 80,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "from_enterprise.official_name_nl": {
                                    "value": query,
                                    "boost": 15,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "from_enterprise.official_name_fr": {
                                    "value": query,
                                    "boost": 15,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "from_enterprise.official_name_de": {
                                    "value": query,
                                    "boost": 15,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "from_enterprise.official_name_en": {
                                    "value": query,
                                    "boost": 15,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "from_enterprise.name_nl": {
                                    "value": query,
                                    "boost": 15,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "from_enterprise.name_fr": {
                                    "value": query,
                                    "boost": 15,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "from_enterprise.name_de": {
                                    "value": query,
                                    "boost": 15,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "from_enterprise.name_en": {
                                    "value": query,
                                    "boost": 15,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "cmp_collectionlinks.name_nl": {
                                    "value": query,
                                    "boost": 300,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "cmp_collectionlinks.name_fr": {
                                    "value": query,
                                    "boost": 300,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "cmp_collectionlinks.name_de": {
                                    "value": query,
                                    "boost": 300,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "cmp_collectionlinks.name_en": {
                                    "value": query,
                                    "boost": 300,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "cmp_collectionlinks.cmps.name_nl": {
                                    "value": query,
                                    "boost": 250,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "cmp_collectionlinks.cmps.name_fr": {
                                    "value": query,
                                    "boost": 250,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "cmp_collectionlinks.cmps.name_de": {
                                    "value": query,
                                    "boost": 250,
                                    "fuzziness": 1
                                }
                            }
                        },
                        {
                            "fuzzy": {
                                "cmp_collectionlinks.cmps.name_en": {
                                    "value": query,
                                    "boost": 250,
                                    "fuzziness": 1
                                }
                            }
                        }
                    ],
                    "filter": [
                        {
                            "term": {
                                "active": true
                            }
                        },
                        {
                            "exists": {
                                "field": "cmp_collectionlinks"
                            }
                        }
                    ]
                }
            }
        }

        axios.get(`https://search-osn-management-hkfarflgp5aj2vbhfzvmyycuuy.eu-central-1.es.amazonaws.com/establishments/_search`,
            {
                auth: {
                    username: `osn-admin`,
                    password: `O15s19n14!`,
                },
                params: {
                    source_content_type: "application/json",
                    source: JSON.stringify(options),
                }
            })
            .then((res) => {
                let copy = []
                res.data.hits.hits.map((item) => {

                    let newItem = {}
                    newItem.name = item._source[`name_${lang}`] || item._source.name_nl || item._source.name_fr || item._source.name_de || item._source.name_en
                    newItem.enterprise_name = item._source.from_enterprise[`official_name_${lang}`] || item._source.from_enterprise.official_name_nl || item._source.from_enterprise.official_name_fr || item._source.from_enterprise.official_name_de || item._source.from_enterprise.official_name_en
                    newItem.logos = []
                    newItem.id = item._source.search_id

                    item._source.logolinks.map((logo) => {

                        let logoItem = logo[`png_${lang}`] || logo.png_nl || logo.png_fr || logo.png_de || logo.png_en
                        newItem.logos.push(logoItem)

                    })
                    copy.push(newItem)
                })

                setData(copy);
                setLoading(true)
            })

    }, [props.match.params.keyword])


    return (
        <div id="resultspage">
            <Navigation page="resultspage" />
            <div className="content">
                <div className="top_search_bar">
                    <div className="search_wrapper">
                        <Searchbar keyword={props.match.params.keyword} />
                    </div>
                </div>
                <div className="card_environment">
                    {loading ? data.map((item, index) => (
                        <div key={index} className="card">
                            <figure>
                                {item.logos.length > 1 ?
                                    <Slider {...settings}>
                                        {item.logos.map((res, i) => (
                                            <figure key={i} >
                                                <img src={res} />
                                            </figure>
                                        ))}
                                    </Slider>
                                    :
                                    <figure>
                                        <img src={item.logos[0]} />
                                    </figure>
                                }
                            </figure>
                            <div className="card_info">
                                <div style={{ "minHeight": "43px" }}>
                                    <h2 title={item.name} >{item.name}</h2>
                                    {item.enterprise_name && item.name.toLowerCase() !== item.enterprise_name.toLowerCase() && <h3 title={item.enterprise_name} >{item.enterprise_name}</h3>}
                                </div>
                                <h5>... promo's</h5>
                                <div className="card_buttons">
                                    <Button
                                        borderColor='pn'
                                        text={`${translate('follow')}`}
                                        txtColor='pn'
                                        type='sub'
                                        size='S'
                                    />
                                    <Link to={`/business/${item.id}`}>
                                        <Button
                                            borderColor='pn'
                                            text={`${translate('discover_more')}`}
                                            txtColor='pn'
                                            type='sub'
                                            size='S'
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                :
                <Icon name="Loading" animated/>
                }
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Resultspage