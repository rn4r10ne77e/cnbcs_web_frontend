import React, {useState, useEffect} from "react";
import {useNavigate, useSearchParams}  from "react-router-dom";
import OperationSearch from "../search/OperationSearch";
import EgovPaging  from "../common/EgovPaging";

const item = [
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

const test = [];

const GeonOperationStatus = () => {
    const navigate = useNavigate();

    const [data,setData] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [searchParams , setSearchParams] = useSearchParams();
    const recordCountPerPage = 5;
    const pageSize = 5;

    const paginationInfo = {
        currentPageNo: currentPage,
        pageSize: pageSize,
        totalRecordCount: data.length,
        recordCountPerPage: recordCountPerPage
    };

    const paginatedData = data.slice(
        (currentPage - 1) * recordCountPerPage,
        currentPage * recordCountPerPage
    );

    // 검색 이벤트 핸들러
    const handleSearch = (pageNum = 1) => {
        const adminId = document.getElementById("searchAdminId").value;
        const searchType = document.getElementById("searchType").value;
        const searchText = document.getElementById("textSearch").value;
        console.log("검색 실행: " , {adminId,searchType,searchText,pageNum});

        const newParams = new URLSearchParams();
        if (adminId) newParams.set('adminId', adminId);
        if (searchType) newParams.set('searchType', searchType);
        if (searchText) newParams.set('textSearch', searchText);
        newParams.set('page',pageNum.toString());

        setCurrentPage(pageNum)
        setSearchParams(newParams);

        console.log(pageNum)
        /*
        fetch(`${apiUrl}`)
            .then(res => {
                if(!res.ok) {
                   throw new Error(`호출 실패:  ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                // 데이터 처리
            })
            .catch(error => {
                console.log(`검색 중 오류 발생 : ${error} `);
            })
        */
        setData(item);
    }

    // 초기화 이벤트 핸들러
    const handleClear = () => {
        // 검색 조건 초기화
        document.getElementById("searchAdminId").value = "";
        document.getElementById("searchType").value = "ALL";
        document.getElementById("textSearch").value = "";

        console.log("검색 조건 초기화");
    };

    const handleRowClick = (routeId) => {
        navigate(`/cnbus/operation/status/${routeId}`);
    }

    const handleMovePage = (pageNum) => {
        // 페이지가 이동되면 검색을 다시..
        // setCurrentPage(pageNum);
         handleSearch(pageNum);
    }

    useEffect(() => {
        // URL에서 페이지 정보와 검색 조건 가져오기
        const page = parseInt(searchParams.get('page') || 1);
        const adminId = searchParams.get('adminId') || "";
        const searchType = searchParams.get('searchType') || "ALL";
        const searchText = searchParams.get('textSearch') || "";

        // 검색 폼 필드 설정 (URL 값으로 초기화)
        if (document.getElementById("searchAdminId"))
            document.getElementById("searchAdminId").value = adminId;
        if (document.getElementById("searchType"))
            document.getElementById("searchType").value = searchType;
        if (document.getElementById("textSearch"))
            document.getElementById("textSearch").value = searchText;

        handleSearch(page)
        return () => {
        }
    }, []);

    return (
      <div className="panel">
          <h2 className="tit">운행현황 조회</h2>
           <OperationSearch onSearch={handleSearch} onClear={handleClear}/>
           <div className="result_wrap">
               <div className="top">
                   <span>검색결과<em className="num" id="totalCnt">{data.length}</em>건</span>
               </div>
               <table className="tbl_result">
                   <caption>검색결과</caption>
                   <colgroup>
                       <col style={{width: '20%'}}/>
                       <col style={{width: '40%'}}/>
                       <col style={{width: '40%'}}/>
                   </colgroup>
                   <thead>
                    <tr>
                        <th>관할관청</th>
                        <th>노선ID</th>
                        <th>노선 명</th>
                    </tr>
                   </thead>
                   <tbody>
                   {
                       paginatedData.length > 0 ? (paginatedData.map((item) => (
                       <tr
                           key={item.routeId}
                           onClick={() => handleRowClick(item.routeId)}>
                           <td className="tx-center">{item.admin}</td>
                           <td className="tx-center">{item.routeId}</td>
                           <td className="tx-center">{item.routeName}</td>
                       </tr>
                   ))) :
                       (<tr>
                       <td colSpan="3" className="tx-center">조회된 데이터가 없습니다.</td>
                       </tr>)
                   }
                   </tbody>
               </table>
           </div>
          <EgovPaging
              pagination={paginationInfo}
              moveToPage={(pageNum) => handleMovePage(pageNum)}
          />
      </div>  
    );
}

export default GeonOperationStatus;