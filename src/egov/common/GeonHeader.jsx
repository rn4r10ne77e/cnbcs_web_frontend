import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';

import URL from 'context/url';
import CODE from 'context/code';

function GeonHeader({ loginUser, onChangeLogin }) {
    const history = useHistory();
    const logInHandler = () => { // 로그인 정보 없을 시
        history.push(URL.LOGIN);
    }
    const logOutHandler = () => {// 로그인 정보 존재할 때
        const logOutUrl = '/uat/uia/actionLogoutAPI.do';
        const requestOptions = {
            credentials: 'include',
        }
        EgovNet.requestFetch(logOutUrl, requestOptions,
            function (resp) {
                console.log("===>>> logout resp= ", resp);
                if (resp.resultCode == CODE.RCV_SUCCESS) {
                    onChangeLogin({ loginVO: {} });
                    window.alert("로그아웃되었습니다!");
                    history.push(URL.MAIN);
                }
            }
        );
    }

    return (
        // <!-- header -->
        <div className="header">
            {/*<div className="inner">*/}
                <h1 className="logo">
                    <Link to={URL.MAIN} className="m"><img src="/assets/images/logo_CNBUS.svg"alt="인제군 BIS 기초 자료 관리 시스템"/></Link>
                    <span className="tit">인제군 BIS 기초 자료 관리 시스템</span>
                </h1>
                <div className="btn_wrap">

                </div>
            <div className="info_box">

                <span className="time">남은시간:<span id="leftTimeInfo">00:00</span></span>
                    <button id="clickInfo" className="btn">시간연장</button>
                    <button className="btn" id="logout">로그아웃</button>

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
                </div>*/}
                {/* <!--// PC web에서 보여지는 영역 --> */}
            {/*</div>*/}
        </div>
        // <!--// header -->
    );
}

export default GeonHeader;