import { Link, Outlet } from "react-router-dom";

export default function Home(props){
    return (<>
        <div id="sidebar">
            <h3 id="team">1조 팀프로젝트</h3>
            <ul id="list">
                <li><Link to="/">홈 (공통)</Link></li>
                <li><Link to="/hsy">황소연(제폼 목록 출력)</Link></li>
                <li><Link to="/cjw">최정우(카레고리전체출력)</Link></li>
                <li><Link to="/ksy">김승연(제품 등록)</Link></li>
            </ul>
        </div>

        <div id="main">
            <Outlet />
        </div>
    </>)
}
// import axios from "axios";
// import { useEffect, useState } from "react"
// import "./Body.css";

// export default function CategoryPost(props){
//     const [cname,setCname] = useState('');
//     // 등록 버튼 클릭 / Form 제출 시 실행되는 함수
//     const saveData = async (e) => {
//         e.preventDefault();
//         const response = await axios.post(
//             "https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/categories",{name: cname}
//         );
//         setCname('');
//         console.log("등록 성공 응답:", response.data);
//         alert("카테고리가 등록되었습니다!");
//     };
    
//     return (
//         <div className="card-container">
//             <h2 className="card-title"> [카테고리 등록]</h2>
            
//             <div className="table-box">
//                 {/* 기능 수행 행만 남긴 단일 테이블 구조 */}
//                 <div className="table-row last-row">
//                     <div className="label-cell">기능 수행</div>
//                     <div className="content-cell">
//                         <div className="form-group">
//                             <input 
//                                 className="custom-input"
//                                 placeholder="새 카테고리명" 
//                                 value={cname}
//                                 onChange={(e) => setCname(e.target.value)}
//                             />
//                             <button className="custom-btn" onClick={saveData}>등록</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }