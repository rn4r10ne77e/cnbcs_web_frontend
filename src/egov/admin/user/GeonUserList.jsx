import {useEffect, useRef, useState} from 'react'
import {useSearchParams} from "react-router-dom";
import DynamicSearch  from "../../search/DynamicSearch";
import GeonTable from "../../common/GeonTable"

// 테스트용
const mockData = [
    {
        no:"아산시",
        userId:"sys_admin",
        auth:"운영자",
        telNo:"041-111-1111",
        registTs : "2025-05-26"
    }
]

const GeonUserList = () => {
    const [data , setData] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [searchParams , setSearchParams] = useSearchParams();
    const recordCountPerPage = 5;
    const pageSize = 5;
    const searchRef = useRef();
    const [loading , setLoading] = useState(false);

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
            {title:"관할관청",key:"admin"},
            {title:"노선ID",key:"routeId"},
            {title:"노선명",key:"routeName"}
        ],
        data : data,
        dataSize : 10,
        paginationInfo : paginationInfo
    }

    const handleSearch = (param , pageNum = 1) => {
        setLoading(true);

        try{
            //const searchValues = param ?? searchRef.current
            const newParam = new URLSearchParams();
            Object.entries({...param,page:pageNum}).forEach(([key,value]) => {
                newParam.set(key,value.toString())
            })

            setCurrentPage(pageNum);
            setSearchParams(newParam);

            // 임시 페이지 네이션...
            const paginatedData = mockData.slice(
                (pageNum - 1) * recordCountPerPage,
                pageNum * recordCountPerPage
            );

            // 데이터 불러오기... (임시..)
            setTimeout(() => {
                setData(paginatedData);
                setLoading(false);
            },300)


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

        }catch (error){
            console.error(`search error :  ${error}`)
            setLoading(false);
        }

    }

     return (
            <>
                <div className="content p020">
                    <h2 className="tit">사용자 관리</h2>
                    <DynamicSearch searchFields={menuConfigs["user"]} onSearch={handleSearch}/>
                </div>
            </>
    )
}

export default GeonUserList;