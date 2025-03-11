import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const RegisterModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passRef = useRef();
    const confirmRef = useRef();
    const groupRef = useRef();
    const nameRef = useRef();

    const [checkButtonClick, setCheckButtonClick] = useState(false);

    // 이메일 중복 확인
    const checkEmailDuplication = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        setCheckButtonClick(true);

        fetch('http://10.125.121.183:8080/user/duplication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => {
            if( email ===''){
                alert("이메일을 입력해 주세요")
                return;
            }
            if (response.ok) {
                alert("사용가능한 email 입니다");
            } else if (response.status === 409) {
                alert("중복된 email 입니다");
            } 
        })
        .catch(error => {
            console.error(error);
            alert("이메일 중복 확인 중 오류가 발생했습니다");
        })
        .finally(() => {
            setCheckButtonClick(false);
        });
    };

    // 회원가입
    const onSubmithandle = async (e) => {
        e.preventDefault();

        // 입력 정보 가져오기
        const userData = {
            email: emailRef.current.value,
            password: passRef.current.value,
            confirm: confirmRef.current.value,
            groups: groupRef.current.value,
            name: nameRef.current.value
        };

        if (userData.email === "" || userData.password === "" || userData.confirm === "" || userData.groups === "" || userData.name === "") {
            alert("모든 정보를 입력해주세요");
            return;
        }

        if (userData.password !== userData.confirm) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
            return;
        }

        try {
            const response = await fetch("http://10.125.121.183:8080/user/join", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                alert("회원가입을 축하드립니다");
                onClose();
                navigate("/");
            } 
        } catch (error) {
            console.error(error);
            alert("회원가입에 실패하였습니다");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className='register-modal'>
                <div onClick={(e) => e.stopPropagation()}>
                    <div className="flex-col">
                        <div className='w-full bg-white rounded-md flex flex-col shadow-xl'>
                            <div className='flex justify-between bg-[#1454fb] py-2 text-white'>
                                <div className='px-4 text-xl font-bold'>회원가입</div>
                                <button onClick={onClose}
                                    className="modal-close-btn px-4">X</button>
                            </div>
                            <form className='flex flex-col justify-start w-full text-black p-4' onSubmit={onSubmithandle}>
                                <div className='flex justify-between items-end'>
                                    <label className='py-1'>이메일</label>
                                    <button type='button' className='p-1 mb-2 rounded-md bg-gray-400 border-2 border-gray-400 text-white
                                            hover:bg-[#1454fb] hover:border-[#1454fb]'
                                            onClick={checkEmailDuplication}>
                                        중복 확인
                                    </button>
                                </div>
                                <input type="email" ref={emailRef} className='outline-none p-2 border-2 rounded-md border-slate-200'
                                       placeholder="이메일을 입력해 주세요" required />
                                <label className='py-1 text-slate-600'>비밀번호</label>
                                <input type="password" ref={passRef} className='outline-none p-2 border-2 rounded-md border-slate-200'
                                       placeholder="비밀번호를 입력해 주세요" required />
                                <label className='py-1 text-slate-600'>비밀번호 확인</label>
                                <input type="password" ref={confirmRef} className='outline-none p-2 border-2 rounded-md border-slate-200'
                                       placeholder="비밀번호를 한번 더 입력해 주세요" required />
                                <label className='py-1 text-slate-600'>회사</label>
                                <input type="text" ref={groupRef} className='outline-none p-2 border-2 rounded-md border-slate-200'
                                       placeholder="회사명을 입력해 주세요" required />
                                <label className='py-1 text-slate-600'>이름</label>
                                <input type="text" ref={nameRef} className='outline-none p-2 border-2 rounded-md border-slate-200'
                                       placeholder="이름을 입력해 주세요" required />
                                <div className='pt-4'>
                                    <button type='submit' className='w-full py-2 rounded-md bg-gray-400 border-2 border-gray-400 text-white
                                            hover:bg-[#1454fb] hover:border-[#1454fb]'>
                                        회원가입
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;