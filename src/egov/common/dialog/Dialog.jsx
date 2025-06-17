import { useState, useEffect, useCallback, useRef } from 'react';
import { DialogContainer, DialogHeader, DialogTitle, CloseButton, DialogContent, DialogFooter, FooterButton, ResizeHandle,} from './Dialog.styles';

// Dialog 컴포넌트
const Dialog = ({
                    isOpen,     // 다이얼로그 창 여부
                    onClose,    // 닫기 버튼 누를 때 실행할 함수
                    title,      // 제목
                    children,   // 다이얼로그 안에 표시될 내용
                    initialPosition = { x: 100, y: 100 },   // 기본 위치
                    initialSize = { width: 500, height: 400 } // 기본 크기
                }) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);

    // 드래그, 리사이징 시 리랜더링 방지를 위해 useRef로 상태값 관리
    // 드래그 여부
    const isDraggingRef = useRef(false);
    // 드래그 시작 위치 저장
    const dragStartRef = useRef({ x: 0, y: 0 });
    // 리사이징 여부
    const isResizingRef = useRef(false);
    // 리사이징 시작 위치와 원래 크기 저장
    const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

    /**
     * 드래그 중이면 -> Position 업데이트
     * 리사이즈 중이면 -> size 업데이트
     *  Math.max는 최소 크기를 보장
     */
    const handleMouseMove = useCallback((e) => {
        if (isDraggingRef.current) {
            setPosition({
                x: e.clientX - dragStartRef.current.x,
                y: e.clientY - dragStartRef.current.y
            });
        }

        if (isResizingRef.current) {
            // 너무 작아지지 않게 최소 너비 300px , 최소 높이 200px 제한
            const newWidth = Math.max(300, resizeStartRef.current.width + (e.clientX - resizeStartRef.current.x));
            const newHeight = Math.max(200, resizeStartRef.current.height + (e.clientY - resizeStartRef.current.y));
            setSize({
                width: newWidth,
                height: newHeight
            });
        }
    }, []);

    /**
     * 마우스를 놓으면 드래그/ 리사이즈 상태 종료
     */
    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
        isResizingRef.current = false;
    }, []);

    /**
     *  마우스를 누른 위치(e.clientX) 와 현재 창의 위치(position.x) 차이를 저장
     */
    const handleMouseDown = useCallback((e) => {
        isDraggingRef.current = true;
        dragStartRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    }, [position.x, position.y]);

    /**
     * 마우스 누른 지점과, 현재 크기를 저장
     * 마우스를 움직이며 (현재 - 시작위치) 만큼 크기를 키운다.
     */
    const handleResizeMouseDown = useCallback((e) => {
        e.stopPropagation();
        isResizingRef.current = true;
        resizeStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height
        };
    }, [size.width, size.height]);

    // 이벤트 리스너는 한 번만 등록
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        // 언마운트 시 이벤트 제거
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);
    if (!isOpen) return null;

    return (
        <DialogContainer
            x={position.x}
            y={position.y}
            width={size.width}
            height={size.height}
        >
            <DialogHeader onMouseDown={handleMouseDown}>
                <DialogTitle>{title}</DialogTitle>
                {/*<CloseButton onClick={onClose}>×</CloseButton>*/}
            </DialogHeader>

            <DialogContent>
                {children}
            </DialogContent>
            <DialogFooter>
                <FooterButton onClick={onClose}>닫기</FooterButton>
            </DialogFooter>
            <ResizeHandle onMouseDown={handleResizeMouseDown} />
        </DialogContainer>
    );
};

export default Dialog;