import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react"

// 웹소켓/STOMP 설치 *** npm install @stomp/stompjs

export default function ChatRoom( props ){
    // 1. [useState] 상태(값) 저장하고 *변경시 해당 컴포넌트/함수 재실행/재호출* 훅/ 라이브러리
    // const [ 변수명, set변수명] = useState( 초기값 );
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); // 서버로 부터 받은 메시지 들

    // *[useRef] 상태(값) 저장하고 * 다른 상태와 상관없이 새로고침/초기화 방지
    const clientRef = useRef(null);  // 변수명 = userRef(초기값)  userRef 변수는 .current 속성의 저장
    // 지역변수 vs 상태변수 vs 참조(userRef) 변수

    // 컴포넌트 실행시 최초 1번 실행
    useEffect( () => {
        // const client = new client({ brokerURL: "접속할 백엔드 브로커 주소", onConnect : 접속성공이벤트 })
        const client = new Client({    
            brokerURL: "ws://localhost:8080/ws-chat", // registerStompEndpoints() 함수 주소와 일치
            // 3. 만약 stomp 접속 성골시 특정 경로 구독
            onConnect : () => { // 접속 성공하면 실행되는 이벤트/함수
                // 특정 경로 구독 신청
                // client.subscribe("구독경로", (message)=> {메시지를 받았을떄} )
                client.subscribe("/sub/chat/room/general", (message)=> {// configureMessageBroker 주소와 일치
                    console.log( message )
                    // 만약에 특정 경로의 구독에서 메시지를 받았을때
                    // JSON.parse( 문자열 -> JS 객체 변환) vs stringify(객체 -> 문자열 변환)
                    // AXIOS 통신은 JSON 기본값으로 자동 변환 지원 (기본값)
                    messages.push( JSON.parse(message.body) ); // message.body 메시지 본문
                    console.log( JSON.parse(message.body) )
                    setMessages( [...messages] ); // 렌더링
                } ) 

            } 
        }) // client 종료

        // 5. stomp 실행, client.activate()
        client.activate();
        // 6. client 객체 다른 함수(전송함수) 사용하기 위해 밖으로 뺌 -> 전역변수로
        clientRef.current = client;
        // 7. 만약에 컴포넌트 사망(사라지면)
        return () => {client.deactivate()};

    }, []);

    console.log( 'dd')

    // 2. 전송시 백엔드에게 메시지 보내기
    const sendMessage = (e) => {
        console.log("메시지 보내가");
        // 8. 만약 소켓 객체가 없으면 실패
        if(clientRef.current == null) return ;
        // 9. 존재하면 메시지 전송, client.publish( {destination : "/발행주소", body : 내용물} )
        // 발행주소 : setApplicationDestinationPrefixes 정의주소 + 매핑 주소
        const info = { // 스프링 DTO 참조 구성
            type : 'TALK', roomId : 'general', sender : 'user' , content : message , date : new Date().toString()

        } 

        clientRef.current.publish({
            destination : "/pub/chat/message", 
            body : JSON.stringify( info )  // Js 객체 -> 문자열 뱐환 함수
        })
    }

    console.log( messages )
    return (
    <>
        <h3> 채팅방 </h3>
        { messages.map((msg)=>{
            <div>
                {msg.sender} : {msg.content}
            </div>
        })}
        <input value={message} onChange={ (e)=> {console.log(e.target.value); setMessage(e.target.value);} } />
        <button type="button" onClick={ sendMessage }> 전송 </button>
    </>)
}