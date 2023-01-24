import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

export function NewsFeedComponent() {
    const [dataRes, setDataResp] = useState([]);
    const [page, setPage] = useState(1);
    const [pageUrl, setPageUrl] = useState(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`);
    //var pageUrl = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`
    //const [dataFetched, FetchmoreData] = useState(false);
    function getData() {
        
        var baseUrl = "https://localhost:44376/WeatherForecast/GetApiResponse?url="
       
        
        const res = axios.get(`${baseUrl}${pageUrl}`)
            .then((items) => {
                
                var AcData = JSON.parse(items.data);
                if (AcData.nodes.length > 0) {
                    setDataResp([...dataRes,...AcData.nodes]);
                    
                    setPage(page + 1);
                    if (pageUrl.includes("englishapi."))
                        setPageUrl(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`);
                    else
                        setPageUrl(`http://www.pinkvilla.com/photo-gallery-feed-page/page/${page}`);
                }
                else {
                    setPage(1);
                    //This link is not working giving 404
                    setPageUrl(`http://www.pinkvilla.com/photo-gallery-feed-page/page/1`);
                }
            });
       

    }


    useEffect(() => getData());
    //FetchmoreData(true)
    console.log(dataRes);
    //setPage(page + 1);
    //if (dataRes != undefined && dataRes.length != 0) {
    // return <h1>{dataRes.data.map((user) => ({ user?.title }))}</h1>
    return (<InfiniteScroll
        dataLength={dataRes.length} //This is important field to render the next data
        next={() => {
            getData();
        }}
        //hasMore={true}
        //loader={<h4>Loading...</h4>}
        endMessage={
            <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
            </p>
        }
        // below props only if you need pull down functionality
       
    > 

        <table>
            {dataRes.map(home =>(
                  <tr><td><img src={home.node.field_photo_image_section} width="200px" height="150px"/></td>
                 <td> <h1>{home.node.title}</h1> </td></tr>
            ))}
                
            
        </table>
            
       
    </InfiniteScroll>)
 
}
           
        
        