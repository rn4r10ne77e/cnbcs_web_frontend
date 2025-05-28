import React, {useEffect } from 'react';
import {Outlet} from 'react-router-dom';

import GeonVerticalAccordion from "../common/GeonVerticalAccordion";


function GeonMain(props) {
    console.group("EgovMain");
    console.log("[Start] EgovMain ------------------------------");
    console.log("EgovMain [props] : ", props);


    useEffect(() => {
    }, []);

    console.log("------------------------------EgovMain [End]");
    console.groupEnd("EgovMain");
    return (
        <div className="container P_MAIN">
            <div className="c_wrap">
                <GeonVerticalAccordion />
                <div className="panel_wrap">
                    {/* 여기에 라우트가 아닌 다른 컴포넌트를 렌더링하거나 Outlet 사용 */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default GeonMain;