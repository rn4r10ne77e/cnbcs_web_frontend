import {useRef, useState, useEffect, forwardRef, useImperativeHandle} from "react";
import * as EgovNet from 'context/egovFetch';
import CODE from "../../context/code";


const DynamicSearch = forwardRef(({searchFields, onSearch},ref) => {
    const inputRefs = useRef({});
    const [selectData, setSelectData] = useState([]); // 옵션 값

    useImperativeHandle(ref, () => {
    });


    useEffect(() => {
        searchFields.forEach(field => {
            if(field.type === 'select' && field.apiUrl) {
                EgovNet.requestFetch(
                     field.apiUrl,
                    {method:"GET",header:{'Content-type': 'application/json'}},
                    function (resp){
                        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                            setSelectData(resp.result.data); // 수정 필요
                        }
                    }
                )
            }
        });

    }, []);

    return (
        <>
            <div className="wp100">
                <div className="filter_wrap p020">
                    <div className="filter">
                        <div className="input_wrap three line_01">
                            {searchFields.map((field)=>(

                                <div className="ml20 input_grop" key={field.key}>
                                    <label htmlFor={field.key}>{field.label}</label>
                                    {field.type === 'select ' ? (
                                        <select
                                            ref={el => inputRefs.current[field.key] = el}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="">전체</option>
                                            {(selectData[field.key] || field.options || []).map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ): (
                                        <input
                                            type="text"
                                            ref={el => inputRefs.current[field.key] = el}
                                            placeholder={field.placeholder}
                                            className="w-full p-2 border rounded"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="btn_wrap">
                        <button onClick={onSearch} type="button" title="검색하기" className="btn btn_search xi-search" id="btnSearch">검색
                        </button>
                        <button type="button" title="검색조건초기화" className="btn btn_refresh xi-refresh ml10"
                                id="btnClear">초기화
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

})

export default DynamicSearch;