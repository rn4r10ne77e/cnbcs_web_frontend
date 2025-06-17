// Dialog.styles.js
import styled from 'styled-components';
// Styled Components
export const DialogContainer = styled.div`
  position: fixed;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  overflow: hidden;
`;

export const DialogHeader = styled.div`
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  padding: 12px 16px;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

export  const DialogTitle = styled.span`
  font-weight: 600;
`;

export  const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

export const DialogContent = styled.div`
  padding: 16px;
  height: calc(100% - 52px);
  overflow: auto;
`;

export  const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: nw-resize;
  opacity: 0.5;
  background: linear-gradient(
    -45deg,
    transparent 0%,
    transparent 30%,
    #999 30%,
    #999 35%,
    transparent 35%,
    transparent 65%,
    #999 65%,
    #999 70%,
    transparent 70%
  );

  &:hover {
    opacity: 1;
  }
`;

export const DialogFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
    justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
`;

export const FooterButton = styled.button`
  padding: 10px 24px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6268; 
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

export const StyledDialogTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  font-size: 14px;
  margin: 0;
`;

export const TableHeader = styled.thead`
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  border-bottom: 2px solid #dee2e6;
`;

export const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: center;
  font-weight: 600;
  color: #495057;
  border: 1px solid #dee2e6;
  white-space: nowrap;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:first-child {
    border-left: none;
  }
  
  &:last-child {
    border-right: none;
  }
`;

export const TableBody = styled.tbody`
  tr {
    transition: background-color 0.2s ease;
    
    &:nth-child(even) {
      background-color: #f8f9fa;
    }
    
    &:hover {
      background-color: #e3f2fd;
      cursor: ${props => props.clickable ? 'pointer' : 'default'};
    }
  }
`;

export const TableCell = styled.td`
  padding: 10px 16px;
  text-align: center;
  border: 1px solid #dee2e6;
  color: #212529;
  vertical-align: middle;
  
  &.number-cell {
    color: #0066cc;
    font-weight: 500;
  }
  
  &.status-active {
    color: #28a745;
    font-weight: 500;
  }
  
  &.status-inactive {
    color: #dc3545;
    font-weight: 500;
  }
  
  &:first-child {
    border-left: none;
  }
  
  &:last-child {
    border-right: none;
  }
`;

// 상세 정보용 키-값 테이블
export const DetailTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 13px;
`;

export const DetailTableCell = styled.td`
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  
  &.label-cell {
    background-color: #f1f3f4;
    font-weight: 600;
    color: #374151;
    width: 120px;
    text-align: center;
  }
  
  &.value-cell {
    background-color: white;
    color: #212529;
    text-align: center;
  }
`;

// 테이블 섹션 타이틀
export const TableSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: linear-gradient(to right, #4CAF50, #45a049);
  color: white;
  border-radius: 4px;
  margin-top: ${props => props.first ? '0' : '24px'};
`;

// 반응형 스타일
export const ResponsiveWrapper = styled.div`
  @media (max-width: 768px) {
    ${StyledDialogTable} {
      font-size: 12px;
    }
    
    ${TableHeaderCell},
    ${TableCell} {
      padding: 8px 12px;
    }
    
    ${DetailTableCell}.label-cell {
      width: 100px;
      font-size: 12px;
    }
  }
`;