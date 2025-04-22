import React, { useState, useEffect } from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import GeonVerticalAccordion from "../common/GeonVerticalAccordion";
import GeonOperationStatus from "../operation/GeonOperationStatus";

function GeonMain(props) {
    console.group("EgovMain");
    console.log("[Start] EgovMain ------------------------------");
    console.log("EgovMain [props] : ", props);

    const history = useHistory();
    console.log("EgovMain [history] : ", history);

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

                <GeonVerticalAccordion></GeonVerticalAccordion>
                <div className="panel_wrap">
                    <Route>
                        <Switch>
                            <Route exact path={URL.OPERATION_STATUS} component={GeonOperationStatus} />
                        </Switch>
                    </Route>
                </div>
            </div>
        </div>

    );
}

export default GeonMain;