import React  from "react";
//import {useAdminList} from "./useAdminList";

const adminItem = [
    { key: "", value: "관할관청 전체" },
    { key: "299", value: "태안군" },
    { key: "296", value: "청양군" },
    { key: "295", value: "서천군" },
    { key: "287", value: "보령시" },
    { key: "292", value: "금산군" },
    { key: "298", value: "예산군" },
    { key: "290", value: "논산시" },
    { key: "289", value: "서산시" },
    { key: "297", value: "홍성군" },
    { key: "294", value: "부여군" },
    { key: "286", value: "공주시" },
    { key: "301", value: "천안시" },
    { key: "288", value: "아산시" },
    { key: "291", value: "계룡시" },
    { key: "300", value: "당진시" },
    { key: "789", value: "테스트" }
];

const searchTypeItem = [
    {key:"ALL" , value:"차량전체"},
    {key:"VEH_ID" , value:"차량ID"},
    {key:"PLATE_NO" , value:"차량번호"}
]

const OperationSearch = ({onSearch, onClear}) => {

    //const adminList = useAdminList();

    return (
        <div className="input_wrap two_select">
            <div className="sctn_01">
                <div className="select_wrap">

                    <label htmlFor="searchAdminId" className="hidden"></label>
                    <select className="select_search" name="searchAdminId" id="searchAdminId">
                        {adminItem.map(item => (
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="searchType" className="hidden"></label>
                    <select className="select_search" name="searchType" id="searchType">
                        {searchTypeItem.map(item => (
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>
                <label htmlFor="textSearch" className="hidden"></label>
                <input type="text" className="input_search" placeholder="검색어를 입력하세요." id="textSearch"
                       name="textSearch"/>
            </div>
            <div className="sctn_02">
                <button type="button" title="검색조건초기화" className="btn btn_refresh xi-refresh" id="btnClear" onClick={() => onClear()}>초기화</button>
                <button type="button" title="검색하기" className="btn btn_search xi-search" id="btnSearch" onClick={() => onSearch()}>검색</button>
            </div>
        </div>
    )
}

export default OperationSearch;