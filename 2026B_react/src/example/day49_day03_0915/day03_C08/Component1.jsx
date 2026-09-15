
// 전통방식의 CSS 파일 import 'css파일경로' 또는 index.html 포함
import './index.css'
import logo from '../../../assets/logo.jpg';

export default function Component1( props ){
    // [3] CSS 객체 방식의 CSS 적용 : -하이픈대신 카멜표기법 사용
    const myStyle = {
        color : 'white' , backgroundColor : "DodgerBlue",
        padding : "10px" , fontFamily: "궁서"
    }
    const iWudth = { maxWidth : '300px' }
    return (<>
            <h2> 리액트 스타일 </h2>
            <ol>
                {/* 인라인방식의 CSS 적용, { key : value } 객체형태로 */}
                <li style={ {color:"red"} }> 프론트엔드 </li>
                <ul>
                    {/* [4] 이미지를 삽입하는 3가지 방법 */}
                    <li> <img src='/img/logo.jpg' style={ iWudth }/> </li>
                    <li> <img src={logo} style={iWudth}/> </li>
                    <li> <img src='http://nakja.co.kr/images/reactjs.png' style={iWudth}/> </li>
                </ul>
                <li className="backEnd"> 백엔드 </li>
                <ul>
                    {/* 전통방식의 CSS파일 적용 */}
                    <li id="backEndSub"> java </li>
                    <li class="warnings"> orcale </li>
                    <li style={myStyle}> jsp </li> 
                </ul>
            </ol>
        </>)
}