import EgovPaging from "./EgovPaging";
import React from "react";

const GeonTable = ({option, handle={}}) => {

    const {header, 
        data,
        dataSize,
        paginationInfo,
        enableCheckbox = false,
        selectedItems = [],
        primaryKey} = option;
    
    const {onRowClick,
        onPageChange,
        onSelectAll,
        onSelectItem} = handle;

    // 체크박스용
    const isAllChecked = data.length > 0 && selectedItems.length === data.length;

    return (
        <>
            <div className="result_wrap">
                <div className="top">
                    <span>검색결과 <em className="num">{dataSize}</em>건</span>
                </div>

                <table className="tbl_result">
                    <caption>검색결과</caption>
                    <thead>
                    <tr>
                        {enableCheckbox && (
                            <th className="checkbox-column">
                                <input
                                    type="checkbox"
                                   checked={isAllChecked}
                                    onChange={onSelectAll || (()=>{})}
                                />
                            </th>
                        )}
                        {header.map((item, index) => (
                            <th key={index}>
                                {item.title}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.length > 0 ?
                            data.map((item, rowIndex) => {
                                const itemId = item[primaryKey];
                                const isChecked = selectedItems.includes(itemId);
                                return (
                                    <tr key={itemId} onClick={() => onRowClick(item)}>
                                        {enableCheckbox && (
                                            <td className="checkbox-column tx-center"
                                                onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => onSelectItem(itemId)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </td>
                                        )}
                                        {
                                            header.map((columns,index) => (
                                                <td key={index} className="tx-center">
                                                    {item[columns.key]}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                );
                            })
                            :
                            (
                                <tr>
                                    <td style={{textAlign:"center"}}
                                        colSpan={enableCheckbox ? header.length + 1 : header.length}>데이터가 없습니다.</td>
                                </tr>
                            )
                    }
                    </tbody>
                </table>
            </div>
            <EgovPaging
                pagination={paginationInfo}
                moveToPage={(pageNum) => onPageChange(pageNum)}
            />
        </>
    )
}

export default GeonTable;