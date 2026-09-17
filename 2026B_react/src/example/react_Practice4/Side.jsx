export default function Side(props){
    return (<>
        <div id="sidebar">
        <h3 id="team">1조 팀프로젝트</h3>
        <ul id="list">
            <li><Link to="/">홈 (공통)</Link></li>
            <li><Link to="/hsy">황소연</Link></li>
            <li><Link to="/cjw">최정우</Link></li>
            <li><Link to="/ksy">김승연</Link></li>
        </ul>
        </div>
    </>)
}