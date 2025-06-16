import {useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import * as EgovNet from 'context/egovFetch';

const GeonUserRegist = () => {
    // react-hook-form 설정
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
        setError,
        clearErrors
    } = useForm({
        mode: 'all', // blur + change + submit 모든 시점에서 validation
        defaultValues: {
            userId: '',
            userPw: '',
            userNm: '',
            userPwConfirm: '',
            authorCd: '',
            telNo: '',
            addr: ''
        }
    });

    const [authOption , setAuthOptions] = useState([]);
    // 중복체크 관련 상태는 그대로 유지
    const [idChecked, setIdChecked] = useState(false);
    const [idAvailable, setIdAvailable] = useState(false);

    // 패스워드 watch (패스워드 확인용)
    const watchPassword = watch("userPw");

    const checkIdDuplicate = () => {
        const userId = getValues('userId');

        if (!userId || userId.trim() === '') {
            alert('아이디를 입력해주세요.');
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userId: getValues('userId')})
        }

        const apiUrl = "/api/checkDuplicate"; // 실제 API URL로 변경

        EgovNet.requestFetch(apiUrl,
            requestOptions,
            function (resp) {
                setIdChecked(true);
                setIdAvailable(resp.data.idAvailable);

                if (resp.data.idAvailable) {
                    alert("사용 가능한 아이디입니다.");
                    clearErrors("userId"); // 중복체크 성공시 에러 제거
                } else {
                    alert("이미 사용중인 아이디입니다.");
                    setError("userId", {
                        type: "manual",
                        message: "사용할 수 없는 아이디입니다."
                    });
                }
            },
            function (error) {
                console.log(`중복체크 오류 발생 : ${error}`)
                setIdChecked(false);
                setIdAvailable(false);
                alert("중복체크 중 오류가 발생하였습니다. 다시 시도해주세요.");
            });
    }

    // 폼 제출 핸들러
    const onSubmit = (data) => {
        // 중복체크 검증
        if (!idChecked) {
            alert('ID 중복체크를 해주세요.');
            return;
        }

        if (!idAvailable) {
            alert('사용할 수 없는 ID입니다.');
            return;
        }

        // userPwConfirm 제거 후 서버 전송
        const submitData = { ...data };
        delete submitData.userPwConfirm;

        console.log('등록 데이터:', submitData);
        // 실제 등록 API 호출
        // registerUser(submitData);
    };

    // userId 변경 시 중복체크 상태 초기화
    const handleUserIdChange = () => {
        setIdChecked(false);
        setIdAvailable(false);
        clearErrors("userId");
    };

    const fetchAuthOptions = () => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        }

        const apiUrl = "";

        EgovNet.requestFetch(apiUrl,
            requestOptions,
            function(resp) {
                    setAuthOptions(resp.data.authList)
            },
            function(error) {
                    console.error("권한 조회 오류");

            }
        )
    }

    useEffect(() => {
        fetchAuthOptions();
    }, []);

    return (
        <>
            <div className={"content p020"}>
                <h2 className="tit underline">사용자 등록</h2>
                <h3 className="tit mt10">사용자 등록</h3>
                <p className="clr-red tx-right mb10">* 필수입력</p>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    <input
                                        type="text"
                                        placeholder="아이디(6~12자 이내, 영문, 숫자 사용가능)"
                                        {...register("userId", {
                                            required: "아이디를 입력해주세요",
                                            minLength: {
                                                value: 6,
                                                message: "아이디는 6자 이상이어야 합니다"
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: "아이디는 12자 이하여야 합니다"
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]+$/,
                                                message: "영문, 숫자만 사용 가능합니다"
                                            },
                                            onChange: handleUserIdChange
                                        })}
                                        style={{
                                            border: errors.userId ? '2px solid #ff4444' : ''
                                        }}
                                        aria-label="아이디(6~12자 이내, 영문, 숫자 사용가능)"
                                    />
                                    <button
                                        type="button"
                                        className="btn black_btn ml4"
                                        onClick={checkIdDuplicate}
                                    >
                                        중복체크
                                    </button>
                                    {errors.userId && (
                                        <div style={{color: '#ff4444', fontSize: '12px', marginTop: '4px'}}>
                                            {errors.userId.message}
                                        </div>
                                    )}
                                    {idChecked && (
                                        <div style={{
                                            color: idAvailable ? '#22c55e' : '#ff4444',
                                            fontSize: '12px',
                                            marginTop: '4px'
                                        }}>
                                            {idAvailable ? '✓ 사용 가능한 ID입니다.' : '✗ 사용할 수 없는 ID입니다.'}
                                        </div>
                                    )}
                                </td>
                                <th>이름<span className="clr-red"> *</span></th>
                                <td>
                                    <input
                                        type="text"
                                        {...register("userNm", {
                                            required: "이름을 입력해주세요",
                                            validate: value => value.trim() !== '' || "이름을 입력해주세요"
                                        })}
                                        style={{
                                            border: errors.userNm ? '2px solid #ff4444' : ''
                                        }}
                                    />
                                    {errors.userNm && (
                                        <div style={{color: '#ff4444', fontSize: '12px', marginTop: '4px'}}>
                                            {errors.userNm.message}
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>패스워드<span className="clr-red"> *</span></th>
                                <td>
                                    <input
                                        type="password"
                                        className="wp100"
                                        {...register("userPw", {
                                            required: "비밀번호를 입력해주세요",
                                            minLength: {
                                                value: 8,
                                                message: "비밀번호는 8자 이상이어야 합니다"
                                            }
                                        })}
                                        style={{
                                            border: errors.userPw ? '2px solid #ff4444' : ''
                                        }}
                                    />
                                    {errors.userPw && (
                                        <div style={{color: '#ff4444', fontSize: '12px', marginTop: '4px'}}>
                                            {errors.userPw.message}
                                        </div>
                                    )}
                                </td>
                                <th>패스워드 확인<span className="clr-red"> *</span></th>
                                <td>
                                    <input
                                        type="password"
                                        className="wp100"
                                        {...register("userPwConfirm", {
                                            required: "비밀번호 확인을 입력해주세요",
                                            validate: value =>
                                                value === watchPassword || "비밀번호가 일치하지 않습니다"
                                        })}
                                        style={{
                                            border: errors.userPwConfirm ? '2px solid #ff4444' : ''
                                        }}
                                    />
                                    {errors.userPwConfirm && (
                                        <div style={{color: '#ff4444', fontSize: '12px', marginTop: '4px'}}>
                                            {errors.userPwConfirm.message}
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>권한<span className="clr-red"> *</span></th>
                                <td>
                                    <label htmlFor="author_cd"></label>
                                    <select
                                        {...register("authorCd", {
                                            required: "권한을 선택해주세요"
                                        })}
                                        id="author_cd"
                                        style={{
                                            border: errors.authorCd ? '2px solid #ff4444' : ''
                                        }}
                                    >
                                        <option value="">선택하세요</option>
                                        {authOption.map(option => (
                                            <option key={option.code} value={option.code}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.authorCd && (
                                        <div style={{color: '#ff4444', fontSize: '12px', marginTop: '4px'}}>
                                            {errors.authorCd.message}
                                        </div>
                                    )}
                                </td>
                                <th>전화번호</th>
                                <td className="">
                                    <label htmlFor="user_telno" className="hidden"></label>
                                    <input
                                        type="text"
                                        id="user_telno"
                                        {...register("telNo", {
                                            pattern: {
                                                value: /^[0-9-]+$/,
                                                message: "올바른 전화번호 형식이 아닙니다"
                                            }
                                        })}
                                        maxLength="13"
                                        style={{
                                            border: errors.telNo ? '2px solid #ff4444' : ''
                                        }}
                                    />
                                    {errors.telNo && (
                                        <div style={{color: '#ff4444', fontSize: '12px', marginTop: '4px'}}>
                                            {errors.telNo.message}
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td colSpan="3" className="">
                                    <label htmlFor="user_addr" className="hidden"></label>
                                    <input
                                        type="text"
                                        id="user_addr"
                                        {...register("addr")}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_wrap tx-right mt10">
                        <button type="submit" className="btn black_btn">저장</button>
                        <button type="button" className="btn black_btn ml4">취소</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default GeonUserRegist;