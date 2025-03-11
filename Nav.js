import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userToken } from './atom';
import logo from '../src/assets/images/logo_white.png';

const Nav = ({ openLoginModal }) => {
    // 로그인 확인
    const Islogin = useRecoilValue(userToken);
    const setLoginToken = useSetRecoilState(userToken);
    const token = useRecoilValue(userToken);
    const navigate = useNavigate();

    const linkClass = 'p-4 mr-4 font-bold hover:bg-[#1454FB]';

    // 로그아웃시 토큰 삭제 및 홈 화면 이동
    const handleLogout = () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (confirmLogout) {
            localStorage.removeItem('token');
            setLoginToken(null);
            navigate("/");
        }
    };

    // 영수증 조회시 로그인 확인 및 페이지 이동
    const handleCheck = async () => {
        if (!token) {
            alert('로그인 후 사용가능 합니다');
            navigate("/");
            return;
        }
        else{
            navigate("/Check");
        }
    }

    return (
        <main className='z-20 w-full flex justify-center absolute top-0 text-white bg-gray-950/50'>
            <nav className='w-2/3 m-auto flex justify-between'>
                <Link to="/"><img src={logo} className='py-2 object-contain' /></Link>
                <div className='flex justify-end items-center'>
                    <Link to="/Reco" className={linkClass}>영수증 인식</Link>
                    <button type='button' className={linkClass} onClick={handleCheck}>
                        영수증 조회
                    </button>
                    {Islogin ? (
                        <button type='button' className='p-4 mr-4 font-bold hover:bg-[#1454FB]' onClick={handleLogout}>
                            로그아웃
                        </button>
                    ) : (
                        <button type='button' className='p-4 mr-4 font-bold hover:bg-[#1454FB]' onClick={openLoginModal}>
                            로그인
                        </button>
                    )}
                </div>
            </nav>
        </main>
    );
}

export default Nav;
