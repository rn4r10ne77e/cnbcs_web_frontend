import React, { useState, useEffect } from 'react';
import {Route,  Routes ,Outlet} from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import GeonVerticalAccordion from "../common/GeonVerticalAccordion";
import GeonOperationStatus from "../operation/GeonOperationStatus";
import GeonOperationDetail from "../operation/GeonOperationDetail";

function GeonMain(props) {
    console.group("EgovMain");
    console.log("[Start] EgovMain ------------------------------");
    console.log("EgovMain [props] : ", props);

    //const history = useHistory();
    //console.log("EgovMain [history] : ", history);

    const [noticeBoard, setNoticeBoard] = useState();
    const [gallaryBoard, setGallaryBoard] = useState();
    const [noticeListTag, setNoticeListTag] = useState();
    const [gallaryListTag, setGallaryListTag] = useState();

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
    /*return (
        <div className="container P_MAIN">
            <div className="c_wrap">

                <GeonVerticalAccordion></GeonVerticalAccordion>
                <div className="panel_wrap">
                    <Route>
                        <Routes>
                            <Route exact path={URL.OPERATION_STATUS} component={GeonOperationStatus} />
                            <Route exact path={`${URL.OPERATION_STATUS}/:id`} component={GeonOperationDetail} />
                        </Routes>
                    </Route>
                </div>
            </div>
        </div>

    );*/
}

export default GeonMain;