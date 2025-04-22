import {useState, useEffect} from "react";

// 데이터 캐시 저장소
let cachedAdmins = null;

export const useAdminList = () => {
    const [data , setData] = useState(cachedAdmins);

    useEffect(() => {
        if(cachedAdmins) return;

        fetch('api/admins')
            .then(res => res.json())
            .then(json => {
                cachedAdmins = json;
                setData(json);
            });
    }, []);
}