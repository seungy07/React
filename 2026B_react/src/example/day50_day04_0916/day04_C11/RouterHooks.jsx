import { useLocation, useSearchParams } from "react-router-dom"

export default function RouterHooks(props){
    const location = useLocation();  // useLocation 훅 선언
    const [searchParams, setSearchParams] = useSearchParams();

    // const mode = searchParams.get('변수명');
    const mode = searchParams.get('mode');
    const pageNum = searchParams.get('pageNum');

    const changMode = () => {
        const nextMode = (mode=='list') ? 'view' : 'list' ;
        setSearchParams({
            mode : nextMode, pageNum
        });
    }

    const nextPage = () => {
        let pageTemp = (pageNum === null || isNaN(pageNum) ) ? 1 : parseInt(pageNum) + 1 ;
        setSearchParams({
            mode, pageNum : pageTemp
        });
    }

    const prevPage = () => {
        let pageTemp = (pageNum === null || isNaN(pageNum) ) ? 1 : parseInt(pageNum) - 1;
        setSearchParams({
            mode, pageNum : pageTemp
        });
    }

    return (<>
        <h2> 라우터 관련 Hook </h2>
        <div>
            <ul>
                <li> URL : {location.pathname} </li>
                <li> 쿼리스트링 : {location.search} </li>
                <li> mode : {mode} </li>
                <li> pageNum : {pageNum} </li>
            </ul>
            <button onClick={changMode}> mode 변경 </button>
            <button onClick={prevPage}> 이전 page </button>
            <button onClick={nextPage}> 다음 page </button>
        </div>
    </>)
}