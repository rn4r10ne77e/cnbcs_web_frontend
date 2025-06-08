import React, {useState, useEffect} from "react";
import {useNavigate, useSearchParams,useParams} from "react-router-dom";
import {useMap} from "../common/map/VWorldContext";
import styled from 'styled-components';
// import {fromLonLat} from "ol/proj";

const Panel = styled.div`
    background: #f8f8f8;
    border-right: 1px solid #aaa;
    position: absolute;
    left: 180px;
    top: 0;
    width: 400px;
    height: calc(100vh - 60px);
`;

const Title = styled.h2`
    height: 38px;
    line-height: 38px;
    font-size: 18px;
    background: #fff;
    color: #111;
    font-family: 'Noto Sans KR-M';
    padding-left: 10px;
`;

const ResultWrap = styled.div`
    padding: 0 10px;
`;

const Top = styled.div`
    position: relative;
    margin: 14px 0 12px;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    height: 30px;
    padding: 5px 10px;
    border: 1px solid #aaa;
    border-radius: 3px;
    line-height: 1em;
    background-color: #fff;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;

const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-left: 1px solid #aaa;
    border-top: 1px solid #aaa;
`;

const Th = styled.th`
    background-color: #ddd;
    font-family: 'Noto Sans KR-M';
    border-right: 1px solid #aaa;
    border-bottom: 2px solid #6eb92b;
    position: sticky;
    top: 0;
`;

const Td = styled.td`
    border-right: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    line-height: 1.2;
    padding: 5px;
`;


const GeonOperationDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
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
        console.log(`lon:${lon}____ lan:${lan}______id:${id}`)
        // 마커 초기화
        clearMarkers();
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
        // return () => {}
    },[mapReady]);

    return (
      <Panel>
          <Title>운행현황 상세</Title>
          <ResultWrap>
              <Top>
                  {/*<span>검색결과<em className="num" id="totalCnt">{data.length}</em>건</span>*/}
                  <div></div>
                  <button type="button" title="뒤로가기" className="btn btn_refresh xi-refresh" id="btnBack" onClick={handleGoBack}>뒤로가기</button>
              </Top>
              <Table>
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
              </Table>
          </ResultWrap>
      </Panel>
    );
}

export default GeonOperationDetail;
