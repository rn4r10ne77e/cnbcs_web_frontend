import React, {useState, useEffect} from "react";
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
    {admin:"아산시",routeId:"10",routeName:"10"},
    {admin:"아산시",routeId:"11",routeName:"11"},
    {admin:"아산시",routeId:"12",routeName:"12"},
    {admin:"아산시",routeId:"13",routeName:"13"},
    {admin:"아산시",routeId:"14",routeName:"14"},
    {admin:"아산시",routeId:"15",routeName:"15"},
    {admin:"아산시",routeId:"16",routeName:"16"},
    {admin:"아산시",routeId:"17",routeName:"17"},
    {admin:"아산시",routeId:"18",routeName:"18"},
    {admin:"아산시",routeId:"19",routeName:"19"},
    {admin:"아산시",routeId:"20",routeName:"20"},
]

const GeonOperationStatus = () => {

    const [data,setDate] = useState(item);
    const [currentPage , setCurrentPage] = useState(1);
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
    const handleSearch = () => {
        const adminId = document.getElementById("searchAdminId").value;
        const searchType = document.getElementById("searchType").value;
        const searchText = document.getElementById("textSearch").value;
        console.log("검색 실행: " , {adminId,searchType,searchText});

        const apiUrl = "/api/test";

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
    }

    // 초기화 이벤트 핸들러
    const handleClear = () => {
        // 검색 조건 초기화
        document.getElementById("searchAdminId").value = "";
        document.getElementById("searchType").value = "ALL";
        document.getElementById("textSearch").value = "";

        console.log("검색 조건 초기화");
    };

    const handleRowClick = (item) => {

    }
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
                       {paginatedData.map((item) => (
                           <tr key={item.routeId}>
                               <td className="tx-center">{item.admin}</td>
                               <td className="tx-center">{item.routeId}</td>
                               <td className="tx-center">{item.routeName}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
          <EgovPaging
              pagination={paginationInfo}
              moveToPage={(pageNum) => setCurrentPage(pageNum)}
          />
      </div>  
    );
}

export default GeonOperationStatus;