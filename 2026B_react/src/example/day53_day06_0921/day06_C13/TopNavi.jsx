import { NavLink } from "react-router-dom";

export default function TopNavi(props){
    return (
    <div>
        <NavLink to="/use-ref1"> userRef1 </NavLink>
        <NavLink to="/use-ref2"> userRef2 </NavLink>
    
    </div>
    );

}