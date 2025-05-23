import {useAuth} from "./GeonLoginContext";
import {useRef} from "react";
import '../../css/common.css';
import '../../css/login.css';


function GeonLogin() {
    const {login} = useAuth();
    const idRef = useRef(null);
    const pwRef = useRef(null);

    const handleLogin = () => {
        const id = idRef.current.value;
        const password = pwRef.current.value;

        if (!id) {
            alert("아이디를 입력해주세요.");
            idRef.current.focus();
            return;
        }

        if (!password) {
            alert("비밀번호를 입력해주세요.");
            pwRef.current.focus();
            return;
        }

        // 로그인 함수 호출
        login({id, password});
    };

    return (
        <div className="wrap_login_cnbis">
            <header id="header" className="login_header">
                <h1 className="logo">
                    {/*<img src="/cnbus/app/images/logo_CNBUS.svg" alt="충청남도 노선버스 운행정보시스템"/>*/}
                    <span className="tit">인제가면 언제가나 노선버스 운행정보시스템(BIS)</span>
                </h1>
            </header>
            <div className="login_container">
                <div className="contents">
                    <div className="contents_inner">
                        <div className="top">
                            <p>로그인</p>
                        </div>
                        <div className="bottom">
                            <p className="note">인제가면 언제가나 운행정보시스템(BIS)<br/>시스템을 이용하시려면 로그인이 필요합니다.</p>
                            <div className="login_input_wrap">
                                <label htmlFor="user_id" className="hidden"></label>
                                <input type="text" className="input_id input_01" placeholder="아이디" maxLength="20"
                                       id="user_id" ref={idRef}/>
                                <label htmlFor="user_pwd" className="hidden"></label>
                                <input type="password" className="input_pw input_01" placeholder="비밀번호" maxLength="50"
                                       id="user_pwd" ref={pwRef}/>
                                <div className="login_option">
                                    <div className="chk_wrap">
                                        <label htmlFor="idSaveCheck">
                                            <input type="checkbox" name="idSaveCheck" id="idSaveCheck" />아이디저장
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn_iogin_01" id="loginBtn" onClick={handleLogin}>로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeonLogin;