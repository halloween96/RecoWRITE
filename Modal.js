import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userToken } from './atom';
import RegisterModal from './RegisterModal';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useRecoilState(userToken);
    const emailRef = useRef();
    const passRef = useRef();
    const [closing, setClosing] = useState(false);
    const [modalClass, setModalClass] = useState('modal');
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    // 모달 닫기
    const closeModal = () => {
        setClosing(true);
        setModalClass('modal closing');
        setTimeout(() => {
            onClose();
            setClosing(false);
            setModalClass('modal');
        }, 1000);
    };

    // 모달 열기 애니메이션
    useEffect(() => {
        if (isOpen) {
            setModalClass('modal open');
        }
    }, [isOpen]);

    // 로그인 요청
    const onSubmithandle = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://10.125.121.183:8080/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passRef.current.value
                })
            });

            if (response.ok) {
                const accessToken = response.headers.get("Authorization");
                localStorage.setItem('token', accessToken);
                setIsLogin(accessToken);
                closeModal();
                navigate("/");
                setTimeout(() => {
                    alert("로그인 되었습니다");
                }, 600);
            } else {
                setModalClass('modal err');
                setTimeout(() => {
                    setModalClass('modal stay');
                    alert("아이디와 비밀번호 정보를 확인해 주세요");
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            alert("로그인에 실패했습니다");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={modalClass} onClick={(e) => e.stopPropagation()}>
                <div className="flex-col">
                    <div className='w-full bg-white rounded-md flex flex-col shadow-xl'>
                        <div className='flex justify-between bg-[#1454fb] py-2 text-white'>
                            <div className='px-4 text-xl font-bold'>로그인</div>
                            <button onClick={closeModal}
                                className="modal-close-btn px-4">X</button>
                        </div>
                        <div className='flex flex-col justify-start w-full text-black p-4'>
                            <label className='py-1'>아이디</label>
                            <input type="email" ref={emailRef}
                                className='p-2 outline-none border-2 border-gray-400 rounded-md bg-white'
                                placeholder="이메일을 입력해 주세요" required />
                            <label className='py-1'>비밀번호</label>
                            <input type="password" ref={passRef}
                                className='p-2 outline-none border-2 border-gray-400 rounded-md bg-white'
                                placeholder="비밀번호를 입력해 주세요" required />
                        </div>
                        <div className='p-4'>
                            <button type='button' onClick={onSubmithandle}
                                className='w-full py-2 rounded-md bg-gray-400 border-2 border-gray-400 text-white
                            hover:bg-[#1454fb] hover:border-[#1454fb]'>
                                로그인
                            </button>
                        </div>
                        <div className='flex justify-center'>
                            <div className='w-4/5 border-gray-600 border-t-2 flex justify-center'>
                                <button type='button'
                                    className='px-5 my-2 text-black border-x-2 border-gray-300'
                                    onClick={() => setShowRegisterModal(true)}>
                                    회원가입
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showRegisterModal && <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />}
        </div>
    );
};

export default Modal;
