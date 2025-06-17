import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import * as EgovNet from 'context/egovFetch';
import CODE from "../../context/code";
import {getValues} from "ol/obj";

const DynamicSearch = forwardRef(({searchFields, onSearch},ref) => {
    const inputRefs = useRef({});
    const [selectData, setSelectData] = useState([]); // 옵션 값

    useImperativeHandle(ref, () => ({
        getValues: () => {
            return Object.fromEntries(
                Object.entries(inputRefs.current).map(([key, el]) => [key, el?.value || ''])
            );
        },
        setValues: (values) => {
            Object.entries(values).forEach(([key, value]) => {
                const el = inputRefs.current[key];
                if (el) el.value = value;
            });
        },
        clear : () => {
            Object.entries(inputRefs.current).forEach(el => {
                if(el) el.values = "";
            })
        }
    }));


    /*useEffect(() => {
        // 임시
        searchFields.forEach(field => {
            // select 같은 공통코드 가져오기 위해 만든것...
            /!*if(field.type === 'select' && field.apiUrl) {
                EgovNet.requestFetch(
                     field.apiUrl,
                    {method:"GET",header:{'Content-type': 'application/json'}},
                    function (resp){
                        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                            setSelectData(resp.result.data); // 수정 필요
                        }
                    }
                )
            }*!/
        });

    }, []);*/

    return (
        <>
            {/*<div className="ml10 mr10">*/}
            <div className="filter_wrap p020">
                <div className="filter">
                    <div className="input_wrap three form_align01">
                        {searchFields.map((field) => (
                            /*<div key={field.key} style={{display: "flex", alignItems: "center"}}>*/
                            <div key={field.key} className="input_group">
                                <label htmlFor={field.key}>{field.label}</label>
                                {field.type === 'select' ? (
                                    <select
                                        ref={el => inputRefs.current[field.key] = el}
                                        id={field.key}
                                        className="p-2 border rounded"
                                    >
                                        <option value="">전체</option>
                                        {(selectData[field.key] || field.options || []).map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        id={field.key}
                                        ref={el => inputRefs.current[field.key] = el}
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="btn_wrap">
                    <button onClick={() => onSearch()} type="button" title="검색하기"
                            className="btn btn_search xi-search" id="btnSearch">검색
                    </button>
                    <button onClick={() => ref.current.clear()} type="button" title="검색조건초기화"
                            className="btn btn_refresh xi-refresh ml10" id="btnClear">초기화
                    </button>
                </div>
            </div>
            {/*</div>*/}
        </>
    )
})

export default DynamicSearch;
