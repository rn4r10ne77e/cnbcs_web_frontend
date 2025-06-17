import {useState} from "react";
import Dialog from "./Dialog";
import DialogTable from "./DialogTable";

const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({});

    const openDialog = (dialogConfig) => {
        setConfig(dialogConfig);
        setIsOpen(true);

        if (dialogConfig.onOpen && typeof dialogConfig.onOpen === 'function') {
            dialogConfig.onOpen();
        }
    };

    const closeDialog = () => {
        setIsOpen(false);
        setConfig({});
    };

    // DialogComponent를 훅에서 반환
    const DialogComponent = () => (
        <Dialog
            isOpen={isOpen}
            onClose={() => {
                closeDialog(); // 1. 내부 상태 닫기
                config.onClose?.(); // 2. 사용자가 정의한 후처리 실행
            }}
            title={config.title || ""}
            initialPosition={config.position || { x: 200, y: 200 }}
            initialSize={config.size}
        >
            {/*{config.content}*/}
            <DialogTable/>
        </Dialog>
    );

    return { openDialog, closeDialog, DialogComponent };
};
export default useDialog; // 👈 이렇게 export!