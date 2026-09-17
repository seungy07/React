import axios from "axios";
import { useEffect, useState } from "react"

function RandomUser(props){
    // 객체 안에 빈배열 속성으로 초기화
    const [myJSON, setMyJSON] = useState( {results:[]} );

    // userEffect( ()=> {하고싶으코드}, []); 최초 1번 실행
    useEffect( async function(){
        // await axios.HTTP메소드명 ("통신할주소", body값);
        const response = await axios.get("https://api.randomuser.me?results=10");
        const data = response.data;
        setMyJSON(data); // 통신 응답결과 상태변수 대입 --> 렌더링
        }, [] );


    let trTag = myJSON.results.map( (data)=>{
        return (
            <tr key={data.login.md5}>
                <td><img src={data.picture.thumbnail} alt={data.login.username} /></td>
                <td><a href="/" onClick={ (e)=> {
                    e.preventDefault();
                    props.onProfile(data);
                } }>{data.login.username}</a>
                </td>
                <td>{data.name.title} {data.name.first} {data.name.last}</td>
                <td>{data.nat}</td>
                <td>{data.email}</td>
            </tr>
        );
    });

    return (
        <div>
            <table border='1'>
                <thead>
                    <tr>
                        <th>사진</th> <th>로그인</th> <th>이름</th>
                        <th>국가</th> <th>Email</th>
                    </tr>
                </thead>
                <tbody>{trTag}</tbody>
            </table>
        </div>
    );
}

export default function ExternalApi(props){
    return (<>
        <h2>외부 서버 통신</h2>
        <RandomUser onProfile={ (sData)=>{
            console.log(sData);
            let info = `전화번호: ${sData.cell}
                        성별: ${sData.gender}
                        usernae: ${sData.login.username}
                        password: ${sData.login.password}`;
                        alert(info);
        }}></RandomUser>

    </>)
}

/*
    [axios] 주로 API 비동기 통신
    - 주로 외부 API와 백엔드 API(controller) 통신도구
    - content-type 기본값이 application/jso 
    -1. 사용법
        const 함수명 = async( ) => {
                const response = await axios.HTTP메소드명( "통신할주소?쿼리스트링" , {body});
                const data =response.data
            }
*/