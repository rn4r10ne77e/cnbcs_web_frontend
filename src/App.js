import React, { useState } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

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
import './css/style.css';
import VWorldMap from "./egov/common/map/VWorldMap";
import GeonHeader from "./egov/common/GeonHeader";
import GeonMain from "./egov/main/GeonMain";
import GeonOperationStatus from "./egov/operation/GeonOperationStatus";
import GeonOperationDetail from "./egov/operation/GeonOperationDetail";
import GeonLogin from "./egov/login/GeonLogin";
import GeonUserList from "./egov/admin/user/GeonUserList";
import { MapProvider } from './egov/common/map/VWorldContext';
import {LoginProvider,useAuth} from "./egov/login/GeonLoginContext";





  function App() {
    return (
        <LoginProvider>
            <Routes>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/*" element={<AppLayout/>} />
            </Routes>
        </LoginProvider>
    )
  }


    // 로그인만 따로
    function LoginPage() {
        const { isAuthenticated } = useAuth();
        if (isAuthenticated) return <Navigate to="/" />;
        return <GeonLogin />;
    }


    function AppLayout() {
      const { isAuthenticated, loading } = useAuth();

      if(!isAuthenticated){
          return <Navigate to="/login"/>
      }

        return (
            <div className="wrap">
                <GeonHeader />

                <MapProvider>
                    <VWorldMap>
                        <Routes>
                            <Route path="/" element={<GeonMain />}>
                                <Route path="/operation/status" element={<GeonOperationStatus />} />
                                <Route path="/operation/status/:id" element={<GeonOperationDetail />} />
                                <Route path="/admin/userList" element={<GeonUserList/>}/>
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
