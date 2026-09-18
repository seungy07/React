import { Route, Routes, Link, Outlet } from "react-router-dom";
import "./App.css";
import Hsy from "./Hsy";
import Cjw from "./Cjw";
import Ksy from "./ksy";
import Home from "./Home";
import HomeMain from "./Homemain";
// import HomeMain from "./HomeMain";

export default function App ( props ){
    return(<>
    
    <Routes>
        <Route path="/" element={<Home/>}>
            <Route index element={<HomeMain />} />

            <Route path="hsy" element={<Hsy />}></Route>
            <Route path="cjw" element={<Cjw  />}></Route>
            <Route path="ksy" element={<Ksy />}></Route>
        </Route>
    </Routes>
    
    </>)
    
}