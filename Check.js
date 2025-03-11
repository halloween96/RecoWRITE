import React, { useEffect, useState } from 'react';
import { userToken } from './atom';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';
import './Paginate.css';

export default function Check() {
    // 사용자 토큰 확인
    const Islogin = useRecoilValue(userToken);

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [searchType, setSearchType] = useState('company');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    // 사용자와 일치하는 데이터 확인
    useEffect(() => {
        fetchData();
    }, [Islogin, page]);

    // 한 페이지에 10개의 데이터 표시
    useEffect(() => {
        if (data && data.content && data.content.content) {
            setFilterData(data.content.content);
            const totalCount = data.content.content.length;
            const calculatedTotalPages = Math.ceil(totalCount / 10);
            setTotalPages(calculatedTotalPages);
        }
    }, [data]);

    // 백엔드 서버에서 데이터 읽어오기
    const fetchData = async () => {
        try {
            const url = `http://10.125.121.183:8080/receipt?page=${page}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { Authorization: Islogin }
            });
            const data = await response.json();
            setData(data);
            setFilterData(data.content.content);
        } catch (error) {
            console.error(error);
        }
    };

    // 각종 검색 핸들
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    // 검색 실행
    const handleSearch = () => {
        const filtered = data.content.content.filter(item => {
            const date = new Date(item.tradAt);
            const start = startDate ? new Date(startDate) : new Date('0001-01-01');
            const end = endDate ? new Date(endDate) : new Date('9999-12-31');
            let matchesSearchQuery = false;

            if (searchType === 'company') {
                matchesSearchQuery = item.company.toLowerCase().includes(searchQuery.toLowerCase());
            } else if (searchType === 'item') {
                matchesSearchQuery = item.itemList.some(itemEntry => itemEntry.item.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            return matchesSearchQuery && date >= start && date <= end;
        });

        setFilterData(filtered);
        setPage(1);
        const newTotalPages = Math.ceil(filtered.length / 10);
        setTotalPages(newTotalPages);
    };

    // 검색시 enter 키 입력으로 실행행
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <main className='bg-mainCheck bg-cover h-screen flex justify-center items-center'>
            <div className='w-full flex flex-col items-center'>
                <div className='w-2/3 rounded-md bg-[#F1F1F1] bg-opacity-80'>
                    <div className='my-10 flex flex-col w-3/4 mx-auto'>
                        <div className='border-b-2 border-[#1454fb] flex justify-between items-center'>
                            <h1 className='ml-5 py-1 font-bold text-xl'>상세 검색</h1>
                        </div>
                        <div className='my-5 flex justify-between'>
                            <div className='flex flex-col w-4/5  rounded-md shadow-md p-2'>
                                <div className='py-1 flex items-center'>
                                    <form className='w-1/3'>
                                        <select
                                            className='w-full text-center outline-none bg-inherit'
                                            value={searchType}
                                            onChange={handleSearchTypeChange}>
                                            <option value='company'>업체명</option>
                                            <option value='item'>물품명</option>
                                        </select>
                                    </form>
                                    <input
                                        type='text'
                                        className='w-2/3 ms-5 text-center rounded-md outline-none'
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                        onKeyPress={handleKeyPress}/>
                                </div>
                                <div className='py-1 flex items-center'>
                                    <div className='w-1/3'>
                                        <div className='w-full text-center'>거래기간</div>
                                    </div>
                                    <div className='w-2/3 flex justify-between ms-5'>
                                        <input
                                            type='date'
                                            className='w-2/5 text-center rounded-md'
                                            value={startDate}
                                            onChange={handleStartDateChange}/>
                                        <div>~</div>
                                        <input
                                            type='date'
                                            className='w-2/5 text-center rounded-md'
                                            value={endDate}
                                            onChange={handleEndDateChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/6 flex flex-col justify-center items-center'>
                                <button
                                    type="button"
                                    className='w-5/6 bg-white text-[#1454fb] font-bold rounded-md border-2 border-[#1454FB] hover:bg-[#1454fb] hover:text-white'
                                    onClick={handleSearch}>검색
                                </button>
                            </div>
                        </div>
                        <div className='bg-white rounded-md'>
                            <table className='w-4/5 mx-auto mt-10'>
                                <thead className='border-2 border-x-0 border-[#1454fb] text-xl'>
                                    <tr>
                                        <th className='w-3/5 py-2'>업체명</th>
                                        <th className='w-2/5 py-2'>거래기간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterData && filterData.map((item, idx) => (
                                        <tr
                                            className='text-center border-b-2 border-slate-300 hover:bg-[#1454fb] hover:text-white'
                                            key={idx}>
                                            <td className='w-3/5 py-1'>
                                                <Link to={`/receipt/${item.receiptId}`} className="block w-full h-full">
                                                    {item.company}
                                                </Link>
                                            </td>
                                            <td className='w-2/5 py-1'>
                                                <Link to={`/receipt/${item.receiptId}`} className="block w-full h-full">
                                                    {item.tradAt}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='flex justify-center my-5'>
                                <Pagination
                                    activePage={page}
                                    itemsCountPerPage={10}
                                    totalItemsCount={filterData ? filterData.length : 0}
                                    pageRangeDisplayed={5}
                                    prevPageText={"‹"}
                                    nextPageText={"›"}
                                    onChange={handlePageChange}
                                    totalPages={totalPages}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}