
// 간단한 테이블 예제
import {
    TableContainer,
    StyledDialogTable,
    TableHeader,
    TableHeaderCell,
    TableBody,
    TableCell
} from './Dialog.styles';

const DialogTable = ({
                columns,
                data,
                emptyMessage = "데이터가 없습니다."
                     }) => {
    return (
        <TableContainer>
            <StyledDialogTable>
                <TableHeader>
                    <tr>
                       {/* {columns.map((col,index) => {
                            <TableHeaderCell key={index}>
                                {col.label}
                            </TableHeaderCell>
                        })}*/}
                    </tr>
                </TableHeader>
                <TableBody>
                   {/* {data.length === 0 ? (
                        <tr>
                            <TableCell colSpan={columns.length}>
                                {emptyMessage}
                            </TableCell>
                        </tr>
                    ) : (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {item[col.dataKey]}
                                    </TableCell>
                                ))}
                            </tr>
                        ))
                    )}*/}
                </TableBody>
            </StyledDialogTable>
        </TableContainer>
    );
};

export default DialogTable;