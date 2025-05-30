import React, {useState, useEffect,useRef} from "react";
import {useNavigate, useSearchParams}  from "react-router-dom";
import OperationSearch from "../search/OperationSearch";
import GeonTable from "../common/GeonTable";
import {DotLoader} from "../common/loading/DotLoader";
import {useMap} from "../common/map/VWorldContext";
import * as EgovNet from 'context/egovFetch';
import CODE from "../../context/code";


const mockData =[
    {admin:"아산시",routeId:"1",routeName:"1"},
    {admin:"아산시",routeId:"2",routeName:"2"},
    {admin:"아산시",routeId:"3",routeName:"3"},
    {admin:"아산시",routeId:"4",routeName:"4"},
    {admin:"아산시",routeId:"5",routeName:"5"},
    {admin:"아산시",routeId:"6",routeName:"6"},
    {admin:"아산시",routeId:"7",routeName:"7"},
    {admin:"아산시",routeId:"8",routeName:"8"},
    {admin:"아산시",routeId:"9",routeName:"9"},
    {admin:"아산시",routeId:"10",routeName:"10"}
]

const GeonOperationStatus2 = () => {
    const navigate = useNavigate();
    const [data,setData] = useState([])
    const [currentPage , setCurrentPage] = useState(1);
    const [searchParam , setSearchParam] = useSearchParams();
    const [loading , setLoading] = useState(false);
    const recordCountPerPage = 5;
    const pageSize = 5;
    const {resetMap} = useMap();
    const searchRef = useRef();

    const paginationInfo = {
        currentPageNo: currentPage,
        pageSize: pageSize,
        // totalRecordCount: data.length,
        totalRecordCount: 10, //임시
        recordCountPerPage: recordCountPerPage
    };

    const handelPageChange = (page =1) => {
        const values = searchRef.current?.getValues();
        handleSearch(values,page);
    }

    const handleSearch = (param, pageNum = 1) => {
        setLoading(true);

        try{
            // param이  null 또는 undefinded 일때 ?? 뒤에 값을 불러옴
            const searchValues = param ?? searchRef.current.getValues();

            // 검색조건 값을 URL에 지정하기 위한 작업
            const newParam = new URLSearchParams();
            Object.entries({...searchValues,page:pageNum}).forEach(([key,value]) => {
                newParam.set(key,value.toString())
            })
            // 페이지 숫자 지정
            setCurrentPage(pageNum);

            //현재 URL 쿼리 저장
            setSearchParam(newParam);
            // 임시.. 페이지네이션...
            const paginatedData = mockData.slice(
                (pageNum - 1) * recordCountPerPage,
                pageNum * recordCountPerPage
            );

            /*const requestOptions = {
                method:"POST",
                header : {'Content-type' : 'application/json'},
                body : JSON.stringify(searchValues)
            }

            EgovNet.requestFetch('/api/...',
                requestOptions,
                function(resp) {
                    if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                        setData(resp.result.data);
                        setLoading(false)
                    }
                }
            );*/



            // 데이터 불러오기... (임시..)
            setTimeout(() => {
                setData(paginatedData);
                setLoading(false);
            },300)

        }catch (error) {
            console.log(error)
            setLoading(false);
        }

    }

    const handleRowClick = (item) => {
        const {adminId, routeId , routeName} = item;
        const coords = [127.002592,36.789855];

        navigate(`/operation/status/${routeId}?lon=${coords[0]}&lat=${coords[1]}`);
        // 맵 이동 ?
        // 맵이 활성화 되었는가?
        /*if(mapReady){
            // 기존 마커 제거
            clearMarkers();
            // 임시
            // 마커 추가
            addMarker(coords,{
                properties: {routeId,type:`bus-route`}
            })
            //이동
            moveToLocation(coords,15)
        }*/
    }

    useEffect(() => {
        const page = parseInt(searchParam.get('page') || 1);
        const adminId = searchParam.get('adminId') || "";
        const searchType = searchParam.get('searchType') || "ALL";
        const searchText = searchParam.get('textSearch') || "";

        const params = {
            adminId : adminId,
            searchType : searchType,
            searchText : searchText,
            page : page,
        }
        searchRef.current.setValues(params)
        handleSearch(params,page);
        resetMap();
    }, []);

    const options = {
        header : [
            {title:"관할관청",key:"admin"},
            {title:"노선ID",key:"routeId"},
            {title:"노선명",key:"routeName"}
        ],
        data : data,
        dataSize : 10,
        paginationInfo : paginationInfo
    }

    return (
        <div className="panel">
            {loading && <DotLoader />}
            <h2 className="tit">운행현황 조회</h2>
            <OperationSearch onSearch={handleSearch} ref={searchRef}/>
            <GeonTable option={options} rowClick={handleRowClick} handelPageChange={handelPageChange}/>
        </div>
    )

}

export default GeonOperationStatus2;