import { atom, useSetRecoilState } from "recoil";

export const receiveData = atom({
    key: 'receiveData',
    default: '',
});

// 사용자 토큰 정의
export const userToken = atom({
    key: 'res.headers.get("authorization")',
    default: localStorage.getItem('token')
});

export const useUpdateRd = () => {
    const setReceiveData = useSetRecoilState(receiveData);
    
    const updateRd = (newData) => {
        setReceiveData(newData);
    }

    return updateRd;
}