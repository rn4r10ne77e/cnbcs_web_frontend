import React, {useState, useEffect} from "react";
import {useNavigate, useSearchParams,useParams} from "react-router-dom";
import {useMap} from "../common/map/VWorldContext";
import {fromLonLat} from "ol/proj";



const GeonOperationDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [searchParams , setSearchParams] = useSearchParams();
    const {
        clearMarkers,
        moveToLocation,
        resetMap,
        addMarker,
        mapReady
    } = useMap();

    const handleGoBack = () => {
        navigate(-1);
        resetMap();
    }

    const mapSetting = () => {
        const lon = parseFloat(searchParams.get('lon'));
        const lan = parseFloat(searchParams.get('lat'));
        const coords = [lon,lan];
        console.log(
            `lon:${lon}____ lan:${lan}______id:${id}`
        )
        // 마커 초기화
        clearMarkers();
            /*
        fetch(`${apiUrl}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
            body: JSON.stringify({
                조회할 데이터...
            })
        })
            .then(res => {
                if(!res.ok){
                    throw new Error(`호출 실패 ${res.status}`)
                }
            })
            .then(data => {
                // 형상정보
                // 가져온 형상 정보.. 처리..
            })
            .catch(error => {
                console.error(`형상정보 오류 ${error}`)
            })
        */
        // 마커 추가
        addMarker(coords,{
            properties: {id,type:`bus-route`}
        })
        //이동
        moveToLocation(coords,16)
    }

    useEffect(() => {
        if (mapReady) {
            mapSetting();
        }
        return () => {
        }
    },[mapReady]);

    return (
      <div className="panel">
          <h2 className="tit">운행현황 상세</h2>
           <div className="result_wrap">
               <div className="top">
                   {/*<span>검색결과<em className="num" id="totalCnt">{data.length}</em>건</span>*/}
                   <div></div>
                   <button type="button" title="뒤로가기" className="btn btn_refresh xi-refresh" id="btnBack" onClick={handleGoBack}>뒤로가기</button>
               </div>
               <table className="tbl_result">
                   <caption>검색결과</caption>
                   <colgroup>
                   <col style={{width: '40%'}}/>
                   </colgroup>
                   <thead>
                    <tr>
                        <th>테스트 상세페이지</th>
                    </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>테스트 상세 페이지에요</td>
                       </tr>
                   </tbody>
               </table>
           </div>
      </div>  
    );
}

export default GeonOperationDetail;