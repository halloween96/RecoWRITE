import React from 'react'
// 로딩 애니메이션
import Spinner from './assets/images/loading3.gif'

export default function Loading() {

    return (
        <main className='fixed top-0 bg-white w-screen h-screen flex flex-col justify-center items-center'>
            <img src={Spinner} />
            <h1 className='mt-10 font-semibold text-3xl'>인식중 입니다.</h1>
            <h2 className='mt-3 font-semibold text-2xl'>잠시만 기다려 주세요.</h2>
            <h2 className='mt-3 font-semibold text-sm'>영수증별 인식률 차이가 있습니다.</h2>
        </main>
    )
}
