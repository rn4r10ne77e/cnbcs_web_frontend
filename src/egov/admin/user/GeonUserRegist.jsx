import {useRef} from "react";

const GeonUserRegist = () => {
    const userIdRef = useRef();
    const userNmRef = useRef();
    const userPwRef = useRef();

    return (
        <>
            <div className={"content p020"}>
                <h2 className="tit underline">사용자 등록</h2>
                <h3 className="tit mt10">사용자 등록</h3>
                <p className="clr-red tx-right mb10">* 필수입력</p>
                <div className="tbl_wrap">
                    <table className="tbl_tdh50 tbl_input">
                        <caption>사용자 등록</caption>
                        <colgroup>
                            <col style={{width: "15%"}}/>
                            <col style={{width: "35%"}}/>
                            <col style={{width: "15%"}}/>
                            <col style={{width: "35%"}}/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>ID<span className="clr-red">*</span></th>
                            <td className="td_userid">
                                <input type="text" ref={userIdRef} placeholder="아이디(6~12자 이내, 영문, 숫자 사용가능)"
                                       aria-label="아이디(6~12자 이내, 영문, 숫자 사용가능)"/>
                                <button type="button" className="btn black_btn ml4" onClick={() => {}}>중복체크</button>
                            </td>
                            <th>이름<span className="clr-red"> *</span></th>
                            <td>
                                <input type="text" id="user_nm" ref={userNmRef} />
                            </td>
                        </tr>
                        <tr>
                            <th>패스워드<span className="clr-red"> *</span></th>
                            <td>
                                <input type="password" className="wp100" ref={userPwRef}/>
                            </td>
                            <th>패스워드 확인<span className="clr-red"> *</span></th>
                            <td>
                                <input type="password" className="wp100" />
                            </td>
                        </tr>
                        <tr>
                            <th>권한<span className="clr-red"> *</span></th>
                            <td>
                                <label htmlFor="author_cd"></label>
                                <select name="author_cd" id="author_cd"></select>
                            </td>
                            <th id="admin_nm">관할관청</th>
                            <td>
                                <label htmlFor="admin_id"></label>
                                <select name="admin_id" id="admin_id" disabled="disabled"></select>
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td className="" colSpan="3">
                                <label htmlFor="user_telno" className="hidden"></label>
                                <input type="text" id="user_telno" name="phoneNumber" maxLength="13"/>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colSpan="3" className="">
                                <label htmlFor="user_addr" className="hidden"></label>
                                <input type="text" id="user_addr"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn_wrap tx-right mt10">
                    <button type="button" className="btn black_btn">저장</button>
                    <button type="button" className="btn black_btn ml4">취소</button>
                </div>
            </div>
        </>
    )

}


export default GeonUserRegist;