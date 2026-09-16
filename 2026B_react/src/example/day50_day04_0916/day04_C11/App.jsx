import { Route, Routes } from "react-router-dom";
import Home from "./home";

export default function App(props){
    return (<> 
        <Routes>  {/* 여기에 들어가는 경로들은 주소 정의에 따라 렌더링 */}
              <Route path="/home" element={< Home/>} ></Route>
        </Routes> 
    </>)
}

//<Route path="/도메인이후주소정의" element={< 컴포넌트/>} ></Route>