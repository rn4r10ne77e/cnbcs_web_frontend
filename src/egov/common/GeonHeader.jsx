import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from "../login/GeonLoginContext";
import URL from 'context/url';

const Header = styled.div`
    height: 60px;
    background: #fff;
    border-bottom: 5px solid #6eb92b;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
`;

const Logo = styled.h1`
    display: flex;
    align-items: center;

    img {
        width: 104px;
    }

    .tit {
        display: inline-block;
        text-indent: 4px;
        font-size: 22px;
        letter-spacing: -0.075em;
        line-height: 60px;
    }
`;

const InfoBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const UserDisplay = styled.div`
    display: flex;
    align-items: center;

    span:first-of-type {
        font-size: 18px;
        font-weight: bold;
    }

    span:nth-of-type(2) {
        font-size: 16px;
    }
`;

const Time = styled.span`
    color: dimgray;
    font-weight: bold;
    font-size: 16px;
    white-space: nowrap;
`;

const Button = styled.button`
    height: 30px;
    padding: 5px 10px;
    border: 1px solid #aaa;
    border-radius: 3px;
    line-height: 1em;
    background-color: #fff;
    cursor: pointer;
    
    &:hover {
        background-color: #ddd;
    }
`;

function GeonHeader() {
    const { logout, user, isAuthenticated } = useAuth();
    return (
        <Header>
            <Logo>
                <Link to={URL.MAIN}>
                    <img src="/assets/images/logo/logo_inje1_icontext_horizontal.svg" alt="인제군 BIS 기초 자료 관리 시스템" />
                </Link>
                <span className="tit">인제언제 BIS 기초 자료 관리 시스템(BIS)</span>
            </Logo>
            <InfoBox>
                <UserDisplay>
                    <span>{user.name}</span>
                    <span>&nbsp;님</span>
                </UserDisplay>
                {isAuthenticated && (
                    <Time>남은시간: <span id="leftTimeInfo">00:00:00</span></Time>
                )}
                <Button id="extend" onClick={() => logout()}>시간연장</Button>
                <Button id="logout" onClick={() => logout()}>로그아웃</Button>
            </InfoBox>
        </Header>
    );
}

export default GeonHeader;
