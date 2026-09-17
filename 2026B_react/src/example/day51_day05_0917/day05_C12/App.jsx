import { Route, Routes } from "react-router-dom";
import TopNavi from "./TopNavi";
import Lifecycle from "./Lifecycle";
import ExternalApi from "./ExternalApi";

export default function App(props){
    return (<>
        <TopNavi> </TopNavi>
        <Routes>
            <Route path="/" element={<Lifecycle />} />
            <Route path="/external" element={<ExternalApi />} />
        </Routes>
    </>)
}