import React, {useState, useEffect} from "react";
import {useNavigate}  from "react-router-dom";
import OperationSearch from "../search/OperationSearch";
import EgovPaging  from "../common/EgovPaging";


const GeonOperationDetail = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
      <div className="panel">
          <h2 className="tit">운행현황 상세</h2>
           <div className="result_wrap">
               <div className="top">
                   {/*<span>검색결과<em className="num" id="totalCnt">{data.length}</em>건</span>*/}
                   <div></div>
                   <button type="button" title="검색조건초기화" className="btn btn_refresh xi-refresh" id="btnBack" onClick={handleGoBack}>뒤로가기</button>
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