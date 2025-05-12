import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import URL from 'context/url';
import CODE from 'context/code';

//COMMON
import EgovFooter from 'egov/common/EgovFooter';
//import EgovInfoPopup from 'egov/common/EgovInfoPopup';
//import EgovError from 'egov/common/EgovError';

import EgovMain from 'egov/main/EgovMain';
//import EgovLogin from 'egov/login/EgovLogin';

import './js/ui';

import './css/base.css';
import './css/layout.css';
import './css/component.css';
import './css/page.css';
import './css/response.css';
import VWorldMap from "./egov/common/map/VWorldMap";
import GeonHeader from "./egov/common/GeonHeader";
import GeonMain from "./egov/main/GeonMain";
import GeonOperationStatus from "./egov/operation/GeonOperationStatus";
import GeonOperationDetail from "./egov/operation/GeonOperationDetail";
import { MapProvider } from './egov/common/map/VWorldContext';


function App() {
  const [loginVO, setLoginVO] = useState({});
  return (
      <div className="wrap">
        <GeonHeader loginUser={loginVO} onChangeLogin={(user) => setLoginVO(user)} />

        <MapProvider>
            <VWorldMap>
              <Routes>
                {/* 메인 경로 설정 - GeonMain과 하위 라우트들 */}
                <Route path="/" element={<GeonMain />}>
                  {/* GeonMain 내부에 표시될 중첩 라우트들 */}
                  <Route path={URL.OPERATION_STATUS} element={<GeonOperationStatus />} />
                  <Route path={`${URL.OPERATION_STATUS}/:id`} element={<GeonOperationDetail />} />
                </Route>
              </Routes>
            </VWorldMap>
        </MapProvider>
        <EgovFooter />
      </div>
  );
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.REACT_APP_EGOV_CONTEXT_URL", process.env.REACT_APP_EGOV_CONTEXT_URL);

export default App;
