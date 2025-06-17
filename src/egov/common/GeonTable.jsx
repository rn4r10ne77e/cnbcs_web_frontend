import React from "react";

const GeonTable = ({ option, handle = {} }) => {
    const { header, data, dataSize,primaryKey } = option;
    const { onRowClick } = handle;

    return (
        <div className="result_wrap">
            <div className="top">
                <span>검색결과 <em className="num">{dataSize}</em>건</span>
            </div>

            <table className="tbl_result">
                <caption>검색결과</caption>
                <thead>
                <tr>
                    {header.map((item, index) => (
                        <th key={index}>{item.title}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.length > 0 ? (
                    data.map((item, rowIndex) => (
                        <tr key={item[primaryKey]} onClick={() => onRowClick?.(item)}>
                            {header.map((columns, index) => (
                                <td key={index} className="tx-center">
                                    {item[columns.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td style={{textAlign:"center"}} colSpan={header.length}>
                            데이터가 없습니다.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default GeonTable;