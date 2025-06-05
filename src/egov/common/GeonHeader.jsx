import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from "../login/GeonLoginContext";

// import * as EgovNet from 'context/egovFetch';

import URL from 'context/url';
// import CODE from 'context/code';

function GeonHeader() {
   // const history = useHistory();
    const {logout,user,isAuthenticated} = useAuth();
    return (
        // <!-- header -->
        <div className="header">
            {/*<div className="inner">*/}
                <h1 className="logo">
                    <Link to={URL.MAIN}><img src="/assets/images/logo/logo_inje1_icontext_horizontal.svg" alt="인제군 BIS 기초 자료 관리 시스템"/></Link>
                    <span className="tit">인제언제 BIS 기초 자료 관리 시스템(BIS)</span>
                </h1>
                <div className="btn_wrap">

                </div>
            <div className="info_box">
                <div className="user_display">
                    <span>{user.name}</span>
                    <span> 님</span>
                </div>
                {isAuthenticated && (
                    <span className="time">남은시간: <span id="leftTimeInfo">00:00</span></span>)
                }
                <button className="btn" id="extend" onClick={() => logout()}>시간연장</button>
                <button className="btn" id="logout" onClick={() => logout()}>로그아웃</button>
            </div>
            {/*<div className="gnb">
                </div>
                 <!-- PC web에서 보여지는 영역 -->
                <div className="user_info">
                     로그아웃 : 로그인 정보 있을때
                    {loginUser?.id &&
                        <>
                            <span className="person">{loginUser?.name} </span> 님이, 관리자로 로그인하셨습니다.
                            <button onClick={logOutHandler} className="btn">로그아웃</button>
                            <br/>남은시간: <span id="leftTimeInfo">00:00</span>
                            <button id="clickInfo" className="btn" href="javascript:void()" style="cursor:pointer"onClick="reFreshTime()">시간연장</button>
                            <button className="btn" style="cursor:pointer" id="logout">로그아웃</button>
                        </>
                    }
                     로그인 : 로그인 정보 없을 때
                    {!loginUser?.id &&
                        <button onClick={logInHandler} className="btn login">로그인</button>
                    }
                </div>*/
            }
                {/* <!--// PC web에서 보여지는 영역 --> */}
            {/*</div>*/}
        </div>

    );
}

export default GeonHeader;
