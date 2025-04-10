import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import GeonAccordionMenu from "../common/GeonVerticalAccordion";
import GeonVerticalAccordion from "../common/GeonVerticalAccordion";

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

    const retrieveList = () => {
        console.groupCollapsed("EgovMain.retrieveList()");

        const retrieveListURL = '/cmm/main/mainPageAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                setNoticeBoard(resp.result.notiList);
                setGallaryBoard(resp.result.galList);

                let mutNotiListTag = [];
                mutNotiListTag.push(<li>검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

                // 리스트 항목 구성
                resp.result.notiList.forEach(function (item, index) {
                    if (index === 0) mutNotiListTag = []; // 목록 초기화
                    mutNotiListTag.push(
                        <li key={index}>
                            <Link
                                to={{
                                    pathname: URL.INFORM_NOTICE_DETAIL,
                                    state: {
                                        nttId: item.nttId,
                                        bbsId: item.bbsId
                                    }
                                }}
                            >
                                {item.nttSj}
                                <span>{item.frstRegisterPnttm}</span>
                            </Link>
                        </li>
                    );
                });
                setNoticeListTag(mutNotiListTag);

                let mutGallaryListTag = [];
                mutGallaryListTag.push(<li>검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

                // 리스트 항목 구성
                resp.result.galList.forEach(function (item, index) {
                    if (index === 0) mutGallaryListTag = []; // 목록 초기화
                    mutGallaryListTag.push(
                        <li key={index}>
                            <Link
                                to={{
                                    pathname: URL.INFORM_GALLERY_DETAIL,
                                    state: {
                                        nttId: item.nttId,
                                        bbsId: item.bbsId
                                    }
                                }}
                            >
                                {item.nttSj}
                                <span>{item.frstRegisterPnttm}</span>
                            </Link>
                        </li>
                    );
                });
                setGallaryListTag(mutGallaryListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovMain.retrieveList()");
    }

    useEffect(() => {
        retrieveList();
        return () => {
        }
    }, []);

    console.log("------------------------------EgovMain [End]");
    console.groupEnd("EgovMain");

    return (
        <div className="container P_MAIN">
            <div className="c_wrap">

                <GeonVerticalAccordion></GeonVerticalAccordion>



            </div>
        </div>

    );
}

export default GeonMain;