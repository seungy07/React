import BackComp from "./BackComp.jsx";
import FrontComp from "./FrontComp.jsx";

function Component1( props ){
    return (<>
        <h2> 리액트 모듈 </h2>
        <ol>
            <FrontComp onMyevent1={() =>
                {alert('프론트 엔드 클릭됨(부모전달');
            }}/>
            <BackComp onMyEvent2={ (msg)=>{
                alert(msg)
            }} />
        </ol>
    </>)
}
export default Component1;