import {createContext, useContext, useEffect, useState} from "react";
import * as EgovNet from "../../context/egovFetch";
import CODE from "../../context/code";

const AuthContext = createContext();
export function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined){
        return new Error("에러");
    }
    return context;
}



export function LoginProvider({children}) {
    const [loginVO, setLoginVo] = useState(null);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = () => {
        const loginUrl = '/uat/uia/actionCheckAPI.do';
        const requestOptions = {
            credentials : 'include',
            method: "POST"
        }


        EgovNet.requestFetch(loginUrl, requestOptions,
            function (resp) {
                console.log("===>>> logout resp= ", resp);
                if (resp.resultCode === CODE.RCV_SUCCESS) {
                    setLoginVo( resp.user );
                    //window.alert("세션쳌!");
                }
            }
        );
    }

    const login = (loginVo) => {

        const loginUrl = '/uat/uia/actionLoginAPI.do';
        const requestOptions = {
            credentials : 'include',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginVo)
        }


        EgovNet.requestFetch(loginUrl, requestOptions,
            function (resp) {
                console.log("===>>> logout resp= ", resp);
                if (resp.resultCode === CODE.RCV_SUCCESS) {
                    setLoginVo( resp.resultVO );
                    console.log("loginVo: " + loginVO)
                }
            }
        );
    }

    const logout = () => {
        const logOutUrl = '/uat/uia/actionLogoutAPI.do';
        const requestOptions = {
            credentials : 'include',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginVO)
        }

        EgovNet.requestFetch(logOutUrl, requestOptions,
            function (resp) {
                console.log("===>>> logout resp= ", resp);
                if (resp.resultCode === CODE.RCV_SUCCESS) {
                    setLoginVo(null);
                    window.alert("로그아웃되었습니다!");
                }
            }
        );
    }
    const value = {
        user: loginVO,
        isAuthenticated: !!loginVO,
        //loading,
        login,
        logout,
        checkSession  // 수동으로 세션 체크할 때 사용
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
