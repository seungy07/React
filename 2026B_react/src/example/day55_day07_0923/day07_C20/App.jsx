import { Route, Routes } from "react-router-dom";
import NotFound from "./common/NotFound";
import List from "./board/List";
import Write from "./board/Write";

export default function App(props){
    return (<>
        <Routes>
            <Route path="/write" element={<Write />}/>
            <Route path="/list" element={<List />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>)
}