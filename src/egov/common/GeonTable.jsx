import EgovPaging from "./EgovPaging";
import React from "react";


const GeonTable = ({option, rowClick ,handelPageChange}) => {

    const {header , data, dataSize, paginationInfo} = option;

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
                            {
                                header.map((item,index) => (
                                  <th key={index}>
                                      {item.title}
                                  </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.length > 0 ?
                            (
                                data.map((item,rowIndex) => (
                                    <tr key = {rowIndex}
                                    onClick={() => rowClick(item)}
                                    >
                                        {
                                            header.map((columns,index) => (
                                                <td key={index} className="tx-center">
                                                    {item[columns.key]}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            ):
                            (
                                <tr>
                                   <td colSpan={header.length}>데이터가 없습니다.</td>
                                </tr>
                            )

                    }
                    </tbody>
                </table>
            </div>
            <EgovPaging
                pagination={paginationInfo}
                moveToPage={(pageNum) => handelPageChange(pageNum)}
            />
        </>
    )
}

export default GeonTable;