import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';

const menuItems = [
    {
        title: "시스템정보관리",
        children: [
            { title: "사용자 관리", url: "/admin/userList" },
        ]
    },
    {
        title: "운행관리",
        children: [
            { title: "운행현황 조회", url: "/operation/status" },
            { title: "노선관리", url: "/operation/route.do" },
        ],
    },
    {
        title: "차량관리",
        children: [
            { title: "차량현황 조회", url: "/cnbus_dev/vehicle/status.do" },
            { title: "차량 등록", url: "/cnbus_dev/vehicle/register.do" },
        ],
    },
    {
        title: "설정",
        children: [
            { title: "사용자 관리", url: "/cnbus_dev/user/manage.do" },
        ],
    },
];

const GeonVerticalAccordion = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const foundIndex = menuItems.findIndex(group =>
            group.children.some(child => child.url === location.pathname)
        );
        setOpenIndex(foundIndex !== -1 ? foundIndex : null);
    }, [location.pathname]);

    const toggle = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="lnb">
            {/*<h2 className="text-xl font-bold mb-4">메뉴</h2>*/}
            <ul className="space-y-2">
                {menuItems.map((item, index) => (
                    <li key={index} className={`lnb_item`}>
                        <button
                            onClick={() => toggle(index)}
                            className={`w-full text-left flex justify-between items-center px-3 py-2 bg-white rounded hover:bg-gray-200 ${openIndex === index ? 'on' : ''}`}
                        >
                            {item.title}
                            <span>{openIndex === index ? "▾" : "▸"}</span>
                        </button>
                        {openIndex === index && (
                            <ul className="mt-1 ml-4 space-y-1 show">
                                {item.children.map((child, idx) => (
                                    <li key={idx}>
                                        <Link to={child.url}
                                              className={`block px-3 py-1 text-blue-600 hover:underline ${location.pathname === child.url ? 'on' : ''}`}>
                                            {child.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GeonVerticalAccordion;
