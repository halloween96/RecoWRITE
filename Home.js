import React, { useState } from 'react'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { SectionsContainer, Section } from 'react-fullpage';
import { FaDropbox } from "react-icons/fa6";

import recognize from '../src/assets/images/recognize.jpg'
import mix from '../src/assets/images/mix.png'
import './home.css';

export default function Home() {

    const navigate = useNavigate();
    const handleReco = () => {
        navigate("/Reco")
    }

    const [hover, setHover] = useState(false);
    const handleHover = (isHovering) => {
        setHover(isHovering);
    };


    // fullpage 관리
    let options = {
        anchors: ['One', 'Two', 'Three', 'Four', 'Five'],
    }

    return (
        <SectionsContainer {...options}>
            <body className='text-white'>
                <Section>
                    <div className='bg-main bg-cover h-screen'>
                        <div className='w-2/3 h-full mx-auto'>
                            <div className='h-full flex flex-col justify-center'>
                                <div className='home1'>
                                    <h1 className='font-black text-6xl'>빠르고 정확한</h1>
                                    <h1 className='font-black text-7xl text-[#1454fb]'>RecoWRITE</h1>
                                </div>
                                <div className='my-16 home2'>
                                    <h2 className='text-2xl'>빠르고 정확환 영수증 데이터화</h2>
                                    <button className='font-semibold text-2xl flex items-center group' onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}
                                        onClick={handleReco}>
                                        <h2 className='pr-7'>
                                            RecoWRITE를 사용해보세요.
                                        </h2>
                                        <FaRegArrowAltCircleRight size="30" className={hover ? 'transition-transform transform translate-x-3' : 'transition-transform transform'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className='bg-mainReco bg-cover h-screen'>
                        <div className='w-2/3 h-full mx-auto flex justify-between'>
                            <div className='h-full flex flex-col justify-center home3'>
                                <h1 className='pb-1 text-[#1454FB] font-extrabold text-xl'>업로드</h1>
                                <h2 className='py-1 text-4xl font-bold'>수기 영수증</h2>
                                <h2 className='py-1 text-4xl font-bold'>간편하게 업로드만</h2>
                                <h2 className='py-1 text-4xl font-bold'>해주세요.</h2>
                            </div>
                            <div className='h-full w-2/3 flex flex-col justify-center home2'>
                                <div className='w-full rounded-md bg-[#F1F1F1] bg-opacity-80'>
                                    <div className='mt-10 flex flex-col w-2/3 mx-auto'>
                                        <form className='relative'>
                                            <div style={{ display: "none" }} />
                                            <div className='w-1/6 bg-[#1454FB] rounded-md py-2 border-2 border-[#1454FB] absolute top-0 right-0 text-center'>파일 첨부</div>
                                            <div className='w-full py-2 pl-2 border-2 border-[#1454FB] rounded-md shadow-md text-black'>선택된 파일이 없습니다</div>
                                        </form>
                                    </div>
                                    <div>
                                        <div className='mt-10 w-2/3 mx-auto text-black bg-white rounded-md flex flex-col justify-center items-center border-dashed border-2 border-[#1454FB] shadow-md'>
                                            <FaDropbox size="60" className='mt-10' />
                                            <h1 className='font-bold text-xl mt-5 mb-10'>파일 첨부 및 드래그 해주세요</h1>
                                        </div>
                                    </div>
                                    <div className='flex justify-center my-5'>
                                        <div className='border-2 border-[#1454FB] bg-[#1454fb] py-2 w-1/6 rounded-md text-center'
                                        >업로드</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className='bg-mainDetail bg-cover h-screen'>
                        <div className='w-2/3 h-full mx-auto flex justify-between'>
                            <div className='h-full flex flex-col justify-center'>
                                <h1 className='pb-1 text-[#1454FB] font-extrabold text-xl'>피드백</h1>
                                <h2 className='py-1 text-4xl font-bold'>인식된 텍스트를</h2>
                                <h2 className='py-1 text-4xl font-bold'>시각적으로 표시하여</h2>
                                <h2 className='py-1 text-4xl font-bold'>결과를 확인합니다.</h2>
                            </div>
                            <div className='h-full w-2/3 flex flex-col justify-center items-end'>
                                <img src={recognize} className='w-2/3' />
                            </div>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className='bg-mainPrint bg-cover h-screen'>
                        <div className='w-2/3 h-full mx-auto flex flex-col justify-center'>
                            <div className='flex flex-col justify-center'>
                                <h1 className='pb-1 text-[#1454FB] font-extrabold text-xl'>다중언어</h1>
                                <h2 className='py-1 text-4xl font-bold'>한국어와 영어를 포함한</h2>
                                <h2 className='py-1 text-4xl font-bold'>언어 텍스트를</h2>
                                <h2 className='py-1 text-4xl font-bold'>인식/추출 합니다.</h2>
                            </div>
                            <div className='mt-10 flex items-center'>
                                <img src={mix} className='w-1/3' />
                                <div className='px-10'>
                                    <FaRegArrowAltCircleRight size="60" />
                                </div>
                                <div className='w-1/2 rounded-md bg-[#F1F1F1] bg-opacity-80'>
                                    <div className='w-4/5 mx-auto my-5'>
                                        <div className='bg-[#1454fb] text-white w-full py-1 flex items-center rounded-md shadow-md justify-evenly'>
                                            업체명
                                            <div className='bg-white text-black w-2/3 text-center rounded-md'>
                                                <div className="w-full text-center rounded-md">
                                                    마시멜로(marshmallow)
                                                </div>
                                            </div>
                                        </div>
                                        <table className='w-full mt-5 bg-[#1454fb] rounded-md'>
                                            <thead className='bg-[#1454fb] text-white'>
                                                <tr>
                                                    <th scope='col' className='w-1/2 py-2 rounded-ss-md'>
                                                        물품
                                                    </th>
                                                    <th scope='col' className='py-2'>
                                                        단가
                                                    </th>
                                                    <th scope='col' className='w-1/12 py-2'>
                                                        수량
                                                    </th>
                                                    <th scope='col' className='py-2 rounded-se-md'>
                                                        가격
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='text-center bg-white text-black'>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            타임컷팅반팔T/크림/F
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            17,000
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='w-full text-center'>
                                                            3
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            51,000
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className='bg-mainCheck bg-cover h-screen'>
                        <div className='w-2/3 h-full mx-auto flex flex-col justify-center'>
                            <div className='flex flex-col items-end'>
                                <h1 className='pb-1 text-[#1454FB] font-extrabold text-xl'>분석</h1>
                                <h2 className='py-1 text-4xl font-bold'>업로드한 이미지에서</h2>
                                <h2 className='py-1 text-4xl font-bold'>텍스트를 추출하여</h2>
                                <h2 className='py-1 text-4xl font-bold'>정보를 분석합니다.</h2>
                            </div>
                            <div className='flex flex-col items-end mt-10'>
                                <div className='w-2/3 rounded-md bg-[#F1F1F1] bg-opacity-80 py-5'>
                                    <div className='w-11/12 mx-auto flex justify-between'>
                                        <div className='w-1/4 flex justify-between'>
                                            <div className='w-5/12 bg-[#1454FB] text-white text-center rounded-md py-1 border-2 border-[#1454FB]'>행 추가</div>
                                            <div className='w-5/12 bg-[#1454FB] text-white text-center rounded-md py-1 border-2 border-[#1454FB]'>행 삭제</div>
                                        </div>
                                        <div className='w-1/6 bg-[#1454FB] text-white text-center rounded-md py-1 border-2 border-[#1454FB]'>저장하기</div>
                                    </div>
                                    <div className='w-11/12 mx-auto'>
                                        <div className='flex mt-5 justify-between'>
                                            <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-md shadow-md justify-evenly'>
                                                거래일
                                                <div className='bg-white text-black w-2/3 text-center rounded-md'>
                                                    <div className="w-full text-center rounded-md">
                                                        2022-04-28
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-md shadow-md justify-evenly'>
                                                업체명
                                                <div className='bg-white text-black w-2/3 text-center rounded-md'>
                                                    <div className="w-full text-center rounded-md">
                                                        마시멜로(marshmallow)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table className='w-full mt-5 bg-[#1454fb] rounded-md'>
                                            <thead className='bg-[#1454fb] text-white'>
                                                <tr>
                                                    <th scope='col' className='w-1/2 py-2 rounded-ss-md'>
                                                        물품
                                                    </th>
                                                    <th scope='col' className='py-2'>
                                                        단가
                                                    </th>
                                                    <th scope='col' className='w-1/12 py-2'>
                                                        수량
                                                    </th>
                                                    <th scope='col' className='py-2 rounded-se-md'>
                                                        가격
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='text-center bg-white text-black'>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            타임컷팅반팔T/크림/F
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            17,000
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='w-full text-center'>
                                                            3
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            51,000
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className='text-center bg-white text-black'>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            타임컷팅반팔T/올리브/F
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            17,000
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='w-full text-center'>
                                                            3
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <div className='text-center'>
                                                            51,000
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='w-full bg-[#1454fb] text-white py-1 flex items-center rounded-b-md shadow-md justify-end'>
                                            <div className='flex w-1/4 mr-5'>
                                                <h1 className='w-1/3'>총액</h1>
                                                <div className='bg-white text-black w-full text-center rounded-md'>
                                                    <div className="rounded-md">
                                                        102,000
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                
            </body>
        </SectionsContainer>
    )
}
