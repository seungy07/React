import { Route, Routes } from "react-router-dom";
import Home from "./home";
import TopNavi from "./TopNavi";
import NotFound from "./NotFound";
import CommonLayout from "./CommonLayout";
import LayoutIndex from "./LayoutIndex";
import RouterHooks from "./RouterHooks";

export default function App(props){
    return (<> 
        <TopNavi></TopNavi>
        <Routes>  {/* 여기에 들어가는 경로들은 주소 정의에 따라 렌더링 */}
            <Route path="/" element={< Home/>} ></Route>
            <Route path="/intro" element={ <CommonLayout /> }>
                <Route index element={<LayoutIndex />} />

                <Route path="router" element={<RouterHooks />} />
            </Route> 
            <Route path="*" element={ <NotFound /> } />  {/* *은 와일드 캍=드 */}
        </Routes> 
    </>)
}

//<Route path="/도메인이후주소정의" element={< 컴포넌트/>} ></Route>