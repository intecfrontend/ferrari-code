import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'

import DigitalDisplay from "@identitybuilding/idb-react-digital-display";
import { Button, OsnSelect } from "@identitybuilding/idb-react-ui-elements";
import Icon from "@identitybuilding/idb-react-iconlib";
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import Searchbar from "../components/Searchbar"
import '../assets/css/DetailsPage.css'

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}

const DetailsPage = (props) => {
    const translate = useSelector((state) => state.general.translate);
    const lang = useSelector((state) => state.general.lang);
    const forceUpdate = useForceUpdate();

    const [data, setData] = useState("");
    const [cmpsCollections, setCmpsCollections] = useState([]);
    const [bpIndex, setBpIndex] = useState("all");
    const [menu, setMenu] = useState(false);

    const [menuItems, setMenuItems] = useState([]);
    const [sortParams, setSortParams] = useState(translate('recent_date'));


    useEffect(() => {
        let query = " "
        let option = {
            from: 0,
            size: 30,
            query: {
                query_string: {
                    query: query,
                    fields: [
                        'slug',
                        'name_nl',
                        'name_fr',
                        'name_de',
                        'name_en',
                        'alt_name_nl',
                        'alt_name_fr',

                    ],
                    tie_breaker: 0.3,
                },
            },
        };
        axios.get(`https://search-osn-management-hkfarflgp5aj2vbhfzvmyycuuy.eu-central-1.es.amazonaws.com/_search?q=search_id:${props.match.params.id}`,
            {
                auth: {
                    username: `${process.env.REACT_APP_ESUSERNAME}`,
                    password: `${process.env.REACT_APP_ESPSW}`,
                },
                params: {
                    source_content_type: "application/json",
                    source: JSON.stringify(option),
                },
            }).then((res) => {
                let data = res.data.hits.hits[0]._source
                data.establishment_name = res[`name_${lang}`] || res.name_nl || res.name_fr || res.name_de || res.name_en
                // data.municipality = res.address[`municipality_${lang}`] || res.address.municipality_nl || res.address.municipality_fr || res.address.municipality_de || res.address.municipality_en
                // data.municipality = data.municipality.replace('(Ville)', '').replace('(Stad)', '')
                data.search_id = res.search_id
                let copy_cmps = []
                let menu = []
                data.cmp_collectionlinks.map((collection) => {
                    menu.push(collection[`name_${lang}`] || collection.name_nl || collection.name_fr || collection.name_de || collection.name_en)
                    collection.cmps.map((cmp) => {
                        if (cmp.cmp_type === "MAGAZINE") { copy_cmps.push(cmp) }

                    })
                })
                let sorted_cmps = copy_cmps.sort(function (a, b) {
                    let afrom = a.valid_start.split('-')
                    let bfrom = b.valid_start.split('-')
                    let adate = new Date(afrom[2], Number(afrom[1] - 1), afrom[0])
                    let bdate = new Date(bfrom[2], Number(bfrom[1] - 1), bfrom[0])
                    // sort on recent date
                    if (adate > bdate) { return -1 }
                    if (adate < bdate) { return 1 }


                });
                setMenuItems(menu)
                setCmpsCollections(sorted_cmps)
                setData(data)
            })
    }, [])




    const changeSort = (e) => {
        setSortParams(e.name)
        let sorted_cmps = []
        let copy_cmps = cmpsCollections

        sorted_cmps = copy_cmps.sort(function (a, b) {
            let afrom = a.valid_start.split('-')
            let bfrom = b.valid_start.split('-')
            let adate = new Date(afrom[2], Number(afrom[1] - 1), afrom[0])
            let bdate = new Date(bfrom[2], Number(bfrom[1] - 1), bfrom[0])
            // // sort on recent date
            // if (adate > bdate) { return -1 }
            // if (adate < bdate) { return 1 }
            if (e.name === translate("recent_date")) {
                if (adate > bdate) { return -1 }
                if (adate < bdate) { return 1 }
            }
            if (e.name === translate("oldest_date")) {
                if (adate > bdate) { return 1 }
                if (adate < bdate) { return -1 }
            }
            if (e.name === translate("a-z")) {
                if ((a.name_nl > b.name_nl) || (a.name_fr > b.name_fr) || (a.name_de > b.name_de) || (a.name_en > b.name_en)) { return 1 }
                if ((a.name_nl < b.name_nl) || (a.name_fr < b.name_fr) || (a.name_de < b.name_de) || (a.name_en < b.name_en)) { return -1 }
            }

            // sort unalphabetical
            if (e.name === translate("z-a")) {
                if ((a.name_nl > b.name_nl) || (a.name_fr > b.name_fr) || (a.name_de > b.name_de) || (a.name_en > b.name_en)) { return -1 }
                if ((a.name_nl < b.name_nl) || (a.name_fr < b.name_fr) || (a.name_de < b.name_de) || (a.name_en < b.name_en)) { return 1 }
            }

        });

        setCmpsCollections(sorted_cmps)
        forceUpdate();
    }

    const changeCollection = (index) => {
        let sorted_cmps = []
        let copy_cmps = []
        if (index === 'all') {
            data.cmp_collectionlinks.map((collection) => {
                collection.cmps.map((cmp) => {
                    if (cmp.cmp_type === "MAGAZINE") { copy_cmps.push(cmp) }

                })
            })
            sorted_cmps = copy_cmps.sort(function (a, b) {
                let afrom = a.valid_start.split('-')
                let bfrom = b.valid_start.split('-')
                let adate = new Date(afrom[2], Number(afrom[1] - 1), afrom[0])
                let bdate = new Date(bfrom[2], Number(bfrom[1] - 1), bfrom[0])
                // sort on recent date
                if (adate > bdate) { return -1 }
                if (adate < bdate) { return 1 }


            });

        }
        else {

            data.cmp_collectionlinks[index].cmps.map((cmp) => {
                if (cmp.cmp_type === "MAGAZINE") { copy_cmps.push(cmp) }
            })

            // sort
            sorted_cmps = copy_cmps.sort(function (a, b) {
                let afrom = a.valid_start.split('-')
                let bfrom = b.valid_start.split('-')
                let adate = new Date(afrom[2], Number(afrom[1] - 1), afrom[0])
                let bdate = new Date(bfrom[2], Number(bfrom[1] - 1), bfrom[0])
                // sort on recent date
                if (adate > bdate) { return -1 }
                if (adate < bdate) { return 1 }


            });
        }
        setCmpsCollections(sorted_cmps)
        setBpIndex(index)

    }

    return (
        data &&
        <div id="detailPage">
            <Navigation {...props} type={data.is_city ? 'city' : 'municipality'} />
            <div id="detailContent" className={`${cmpsCollections.length > 0 ? '' : 'empty'}`}>
                <Icon onClick={() => setMenu(true)} className="hamburgerIcon" name="MenuFill" />
                <div className={`detailSidebar ${menu ? 'active' : ''}`}>
                    <Icon onClick={() => setMenu(false)} className="closeIcon" name="Close" />
                    <div className="logo">
                        {data.logo ?
                            <img src={data.logo[`png_${lang}`] || data.logo.png_nl || data.logo.png_fr || data.logo.png_de || data.logo.png_en} alt="logo gemeente" />
                            :
                            <img src="" alt="logo gemeente" />
                        }
                    </div>
                    <div className="info">
                        {data.is_city ?
                            <h3>{translate('city')} {data[`name_${lang}`] || data.name_nl || data.name_fr || data.name_de || data.name_en}</h3>
                            :
                            <h3>{translate('municipality')} {data[`name_${lang}`] || data.name_nl || data.name_fr || data.name_de || data.name_en}</h3>
                        }
                        {/* <Button
                            borderColor='cn'
                            text={translate('follow')}
                            txtColor='cn'
                            type='sub'
                            size='S'
                        /> */}
                    </div>
                    <ul>
                        <li className="active">
                            <a onClick={() => changeCollection('all')} className={`${bpIndex === 'all' ? 'active' : ''}`}>{translate('info_and_magazines')}</a>
                            <div className="linkChildren">
                                {menuItems.length > 1 &&
                                    menuItems.map((item, index) => (
                                        <span className={`${bpIndex === index ? 'active' : ''}`} key={index} onClick={() => changeCollection(index)}>{item}</span>

                                    ))
                                }
                            </div>
                        </li>
                        <li>
                            <a className="osn" target="_blank" href={`https://${data.slug}.${lang === 'nl' ? '100procentlokaal' : '100pourcentlocale'}.be/business/${data.search_id}/${data.establishment_name}/contact`}>{translate('business_page')}</a>
                        </li>
                    </ul>
                    <div className="buttonText">
                        <span><Icon name="Info" /> {translate('search_for_all_enterprises')} {data.municipality}</span>
                        <Button
                            borderColor='cn'
                            text={`${translate('go_to')} ${data.municipality} 100% ${lang === 'nl' ? 'lokaal' : 'locale'}`}
                            txtColor='cn'
                            type='sub'
                            size='S'
                            url={`https://${data.pkancode}.${lang === 'nl' ? '100procentlokaal' : '100pourcentlocale'}.be`}
                        />
                    </div>
                </div>
                <div className="detailsMain">
                    {cmpsCollections.length > 0 ?
                        <React.Fragment>
                            {bpIndex !== "all" ? <h2>{menuItems[bpIndex]}</h2> : <h2></h2>}
                            <div className="MagazineHeader">
                                <span className="magazineButton">Publicaties</span>
                                <OsnSelect
                                    className="lang-select"
                                    onChange={(e) => changeSort(e)}
                                    active={sortParams}
                                    options={[
                                        { id: 0, name: translate('recent_date') },
                                        { id: 1, name: translate('oldest_date') },
                                        { id: 2, name: translate('a-z') },
                                        { id: 3, name: translate('z-a') }
                                    ]}
                                />
                            </div>

                            <div className="cmp_collection_wrapper">
                                {cmpsCollections.map((cmp, index) => (
                                    <div key={index} className="cmp_wrapper_cn">
                                        <a className="myWrapper cn" target="_blank" href={cmp[`cat_network_url_${lang}`] || cmp.cat_network_url_nl || cmp.cat_network_url_fr || cmp.cat_network_url_de || cmp.cat_network_url_en}>
                                            <div className="dd magazine">
                                                <img src={cmp[`thumbnail_${lang}`] || cmp.thumbnail_nl || cmp.thumbnail_fr || cmp.thumbnail_de || cmp.thumbnail_en} />
                                                <h4>{cmp[`name_${lang}`] || cmp.name_nl || cmp.name_fr || cmp.name_de || cmp.name_en}</h4>
                                                <div className="ddOverlay"></div>
                                            </div>
                                            <h5>
                                                {cmp.valid_start}
                                                <span>
                                                    <Icon name="Magazines" />
                                                </span>
                                                {cmp.valid_end}
                                            </h5>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </React.Fragment>
                        :
                        <div className={`noCmps ${data.is_city ? 'city' : ''}`}>
                            {data.is_city ?
                                <h3>{translate('this_city_is_not_sharing_its_books_here_yet')}</h3>
                                :
                                <h3>{translate('this_municipality_is_not_sharing_its_books_here_yet')}</h3>
                            }
                            <figure>
                                <img src={require('../assets/imgs/Plenny_wenen.png')} alt="Plenny being sad" />
                            </figure>
                        </div>
                    }
                </div>
            </div>
            <Footer {...props} />
        </div>
    )
}

export default DetailsPage