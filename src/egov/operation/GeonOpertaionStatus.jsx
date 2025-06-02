import React, {useState, useEffect,useRef} from "react";
import {useNavigate, useSearchParams}  from "react-router-dom";
import OperationSearch from "../search/OperationSearch";
import GeonTable from "../common/GeonTable";
import {DotLoader} from "../common/loading/DotLoader";
import {useMap} from "../common/map/VWorldContext";
import * as EgovNet from 'context/egovFetch';
import CODE from "../../context/code";


const mockData =[
    {admin:"아산시",routeId:"295000101",routeName:"1"},
    {admin:"아산시",routeId:"295000100",routeName:"2"},
    {admin:"아산시",routeId:"295000099",routeName:"3"},
    {admin:"아산시",routeId:"295000098",routeName:"4"},
    {admin:"아산시",routeId:"295000097",routeName:"5"},
    {admin:"아산시",routeId:"295000096",routeName:"6"},
    {admin:"아산시",routeId:"295000095",routeName:"7"},
    {admin:"아산시",routeId:"295000093",routeName:"8"},
    {admin:"아산시",routeId:"295000091",routeName:"9"},
    {admin:"아산시",routeId:"295000092",routeName:"10"}
]

const GeonOperationStatus2 = () => {
    const navigate = useNavigate();
    const [selectedItems , setSelectedItems]  = useState([]); // 체크박스 데이터
    const [data,setData] = useState([]) // 데이터
    const [currentPage , setCurrentPage] = useState(1); // 페이지네이션 currentPage
    const [searchParam , setSearchParam] = useSearchParams(); // URL 쿼리파라미터
    const [loading , setLoading] = useState(false); // 로딩 페이지
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

    const handlePageChange = (page =1) => {
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
        ], // 헤더 설정
        data : data, // 표출할 데이터
        dataSize : data.length, // 데이터 사이즈
        paginationInfo : paginationInfo, // 페이지네이션 정보
/*        enableCheckbox : false , // 체크박스 지정
        selectedItems : selectedItems, // 체크박스 배열*/
        primaryKey : 'routeId' // 고유키 지정
    }
    const handlers = {
        onRowClick: handleRowClick,
        onPageChange: handlePageChange,
        /*onSelectAll: handleSelectAll,
        onSelectItem: handleSelectItem,*/
    };

    return (
        <div className="panel">
            {loading && <DotLoader />}
            <h2 className="tit">운행현황 조회</h2>
            <OperationSearch onSearch={handleSearch} ref={searchRef}/>
            <GeonTable option={options} handle={handlers}/>
        </div>
    )

}

export default GeonOperationStatus2;