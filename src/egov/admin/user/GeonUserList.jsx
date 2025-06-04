import React, {useEffect, useRef, useState} from 'react'
import {useSearchParams} from "react-router-dom";
import DynamicSearch  from "../../search/DynamicSearch";
import GeonTable from "../../common/GeonTable"
import {DotLoader} from "../../common/loading/DotLoader";
import EgovPaging from "../../common/EgovPaging";
import * as EgovNet from 'context/egovFetch';
import CODE from "../../../context/code";

// 테스트용
const mockData = [
    {
        no:"1",
        userId:"sys_admin",
        userName : "지오앤",
        role:"운영자",
        telNo:"041-111-1111",
        registTs : "2025-05-26"
    },
    {
        no:"2",
        userId:"sys_admin2",
        userName : "홍주여객",
        role:"시군",
        telNo:"041-111-1111",
        registTs : "2025-05-03"
    }
]
const PRIMARY_KEY = 'userId';

const GeonUserList = () => {
    const [data , setData] = useState([]);
    const [selectedItems , setSelectedItems]  = useState([]); // 체크박스 데이터
    const [currentPage , setCurrentPage] = useState(1);
    const [searchParam , setSearchParams] = useSearchParams();
    const recordCountPerPage = 5;
    const pageSize = 5;
    const searchRef = useRef();
    const [loading , setLoading] = useState(false);
    // 컴포넌트 상단에 상수 정의



    const paginationInfo = {
        currentPageNo: currentPage,
        pageSize: pageSize,
        totalRecordCount: data.length,
        recordCountPerPage: recordCountPerPage
    };

    // 데이터만 로드하는 함수
    const loadDataOnly = (params, pageNum = 1) => {
        setLoading(true);
        try {
            setCurrentPage(pageNum);

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

            setTimeout(() => {
                setData(paginatedData);
                setLoading(false);
            }, 300);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // 사용자 검색
    const handleSearch = ( pageNum = 1) => {
        setLoading(true);

        try{
            // param이 falsy 값일 때 일때 오른쪽 실행
            const searchValues = searchRef.current.getValues();
            const newParam = new URLSearchParams();
            Object.entries({...searchValues,page:pageNum}).forEach(([key,value]) => {
                newParam.set(key,value.toString())
            })

            setSearchParams(newParam);

        }catch (error){
            console.error(`search error :  ${error}`)
            setLoading(false);
        }

    }


    // 상세 정보 ( item => 사용자ID )
    const handleRowClick = (item) => {
        navigator("");
    }

    // 전체 선택/해제 토글
    const handleSelectAll = () => {
        if (selectedItems.length === data.length) {
            // 이미 모두 선택된 상태라면 해제
            setSelectedItems([]);
        } else {
            // 모두 선택
            const allIds = data.map(item => item[PRIMARY_KEY]);
            setSelectedItems(allIds);
        }
    };

    // 개별 선택/해제
    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(i => i !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    // 선택삭제 함수
    const handleDelete =  () => {
        const requestOptions = {
               method:"POST",
               header : {'Content-type' : 'application/json'},
               body : JSON.stringify(selectedItems)
           }

           EgovNet.requestFetch('/api/...',
               requestOptions,
               function(resp) {
                   if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                       setData(resp.result.data);
                       setLoading(false)
                   }
               }
           );
    }
    
    // 등록버튼
    const handleInsert = () => {
        navigator("");
    }

    useEffect(() => {
        //1. searchParam의 값을 배열에서 객체로 변환
        const raw = Object.fromEntries(searchParam.entries());
        const params = {};
        //2. menuConfigs["user"]에 셋팅 해놓은 key를 토대로 다시 객체를 생성
        // ( 아예 없다면 빈 객체가 생성이 안됨)
        menuConfigs["user"].forEach(({ key, defaultValue = "" }) => {
            params[key] = raw[key] !== undefined ? raw[key] : defaultValue;
        });

        // 페이지 수는 따로 추출
        const pageNum = raw.page ? parseInt(raw.page) : 1;
        // 서치 부분에 값을 셋팅
        searchRef.current.setValues(params);
        // 마운트 시 첫 검색실행
        loadDataOnly(params,pageNum);

    }, [searchParam]);

    // key = id , label : 명칭 , type : input type , apiUrl : 서버에서 가져와야하는 api 주소
    const menuConfigs = {
        user : [
            {key :"userId",label:"사용자ID",type:"text"},
            {key:"userName", label: "사용자명",type:"text"},
            {key:"role", label:"권한",type:"select",apiUrl:'/api'}
        ]
    }

    const options = {
        header : [
            {title:"순번",key:"no"},
            {title:"사용자ID",key:"userId"},
            {title:"사용자명",key:"userName"},
            {title:"권한",key:"role"},
            {title:"전화번호",key:"telNo"},
            {title:"등록일자", key:"registTs"}
        ], // 헤더 설정
        data : data, // 표출할 데이터
        dataSize : data.length, // data.length..
        paginationInfo : paginationInfo, // 페이지네이션 정보
        enableCheckbox : true , // 체크박스 지정
        selectedItems : selectedItems, // 체크박스 배열
        primaryKey : PRIMARY_KEY // 고유키 설정
    }

    const handlers = {
        onRowClick: handleRowClick,
        onSelectAll: handleSelectAll,
        onSelectItem: handleSelectItem,
    }

     return (
         <>
             <div className="content p020">
                 {loading && <DotLoader/>}
                 <h2 className="tit">사용자 관리</h2>
                 <DynamicSearch searchFields={menuConfigs["user"]} onSearch={handleSearch} ref={searchRef}/>
                 <GeonTable option={options} handle={handlers}/>
                 <div className="result_bottom flex-sb mt20">
                     <button type="button" className="btn black_btn" onClick={() => {handleDelete()}}>선택삭제</button>
                     <button type="button" className="btn black_btn" onClick={() => {handleInsert()}}>등록</button>
                 </div>
                 <EgovPaging pagination={paginationInfo} moveToPage={(pageNum) => handleSearch(pageNum)}/>
             </div>
         </>
     )
}

export default GeonUserList;