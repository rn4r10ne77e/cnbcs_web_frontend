import {useEffect, useRef, useState} from 'react'
import {useSearchParams} from "react-router-dom";

// 테스트용
const item = [
    {
        no:"아산시",
        userId:"sys_admin",
        auth:"운영자",
        telNo:"041-111-1111",
        registTs : "2025-05-26"
    }
]

const GeonUserList = () => {
    const [data , setDate] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [searchParams , setSearchParams] = useSearchParams();
    const recordCountPerPage = 5;
    const pageSize = 5;
    const searchRef = useRef();

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

    return (
            <>
                <div className="content p020">
                    <h2 className="tit">사용자 관리</h2>
                    <div className="wp100">
                        {/*<div className="filter_wrap p020">
                            <div className="filter">
                                <div className="input_wrap three line_01">
                                    <div className="ml20 input_group">
                                        <label htmlFor="USER_ID">사용자 ID</label>
                                        <input type="text" title="ID" id="USER_ID" name="USER_ID"/>
                                    </div>
                                    <div className="ml20 input_group">
                                        <label htmlFor="USER_NM">사용자 명</label>
                                        <input type="text" title="이름" id="USER_NM" name="USER_NM"/>
                                    </div>
                                    <div className="ml20 input_group">
                                        <label htmlFor="AUTHOR_CD">권한</label>
                                        <select name="AUTHOR_CD" id="AUTHOR_CD" name="AUTHOR_CD">
                                            <option value="">권한 전체</option>
                                            <option value="ROLE001">운영자</option>
                                            <option value="ROLE000">시스템 관리자</option>
                                            <option value="ROLE002">도청</option>
                                            <option value="ROLE004">일반</option>
                                            <option value="ROLE003">시군</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="btn_wrap">
                                <button type="button" title="검색하기" className="btn btn_search xi-search"
                                        id="btnSearch">검색
                                </button>
                                <button type="button" title="검색조건초기화" className="btn btn_refresh xi-refresh ml10"
                                        id="btnClear">초기화
                                </button>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </>
    )
}

export default GeonUserList;