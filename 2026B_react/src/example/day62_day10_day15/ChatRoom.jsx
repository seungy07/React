import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react"
import './ChatRoom.css'
import Notice from "./Notice";

// 웹소켓/STOMP 설치 *** npm install @stomp/stompjs

export default function ChatRoom( props ){
    // 1. [useState] 상태(값) 저장하고 *변경시 해당 컴포넌트/함수 재실행/재호출* 훅/ 라이브러리
    // const [ 변수명, set변수명] = useState( 초기값 );
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); // 서버로 부터 받은 메시지 들

    // *[useRef] 상태(값) 저장하고 * 다른 상태와 상관없이 새로고침/초기화 방지
    const clientRef = useRef(null);  // 변수명 = userRef(초기값)  userRef 변수는 .current 속성의 저장
    // 지역변수 vs 상태변수 vs 참조(userRef) 변수

    // // 컴포넌트 실행시 최초 1번 실행
    // useEffect( () => {
            // 2~6 까지 있었음 day15 , day16_day63에서 이
    //     // 7. 만약에 컴포넌트 사망(사라지면)
    //     return () => {client.deactivate()};

    // }, []);

    // 2. 전송시 백엔드에게 메시지 보내기
        const sendMessage = (e) => {
            console.log("메시지 보내가");
            // 8. 만약 소켓 객체가 없으면 실패
            if(clientRef.current == null) return ;
            // 9. 존재하면 메시지 전송, client.publish( {destination : "/발행주소", body : 내용물} )
            // 발행주소 : setApplicationDestinationPrefixes 정의주소 + 매핑 주소
            const info = { // 스프링 DTO 참조 구성
                type : 'TALK', roomId , sender , content : message , date : new Date().toLocaleTimeString()

            } 

            clientRef.current.publish({
                destination : "/pub/chat/message", 
                body : JSON.stringify( info )  // Js 객체 -> 문자열 뱐환 함수
            })
        }

    const [ isConnected , setIsConnected] = useState( false ); // 방 접속 여부
    const [ roomId , setRoomId ] = useState(''); // 입력받은 방
    const [ sender , setSender ] = useState(''); // 접속자(닉네임)

    // 접속 함수
    const connect = ()=>{ 
        // const client = new client({ brokerURL: "접속할 백엔드 브로커 주소", onConnect : 접속성공이벤트 })
        const client = new Client({    
            brokerURL: "ws://localhost:8080/ws-chat", // registerStompEndpoints() 함수 주소와 일치
            // 3. 만약 stomp 접속 성골시 특정 경로 구독
            onConnect : () => { // 접속 성공하면 실행되는 이벤트/함수
                setIsConnected( true ); // *** 1. 접속 상태 변경

                // 특정 경로 구독 신청
                // client.subscribe("구독경로", (message)=> {메시지를 받았을떄} )
                // ** 2.  입력받은 방제목으로 구독(경로)
                client.subscribe(`/sub/chat/room/${roomId}`, (message)=> {// configureMessageBroker 주소와 일치
                    // 만약에 특정 경로의 구독에서 메시지를 받았을때
                    // JSON.parse( 문자열 -> JS 객체 변환) vs stringify(객체 -> 문자열 변환)
                    // AXIOS 통신은 JSON 기본값으로 자동 변환 지원 (기본값)
                    messages.push( JSON.parse(message.body) ); // message.body 메시지 본문
                    console.log( JSON.parse(message.body) )
                    setMessages( [...messages] ); // 렌더링
                } ) 
                // 3. 입장메시지 발행
                client.publish( {
                    destination : "/pub/chat/message",
                    body : JSON.stringify( {type:'ENTER', roomId, sender, content: '', date: new Date().toLocaleTimeString() } )
                } );

            } 
        }) // client 종료

        // 5. stomp 실행, client.activate()
        client.activate();
        // 6. client 객체 다른 함수(전송함수) 사용하기 위해 밖으로 뺌 -> 전역변수로
        clientRef.current = client;
    }

    // 퇴장 함수
    const disconnect = ()=>{
        clientRef.current.publish(
            {destination : "/pub/chat/message",
                    body : JSON.stringify( {type:'QUIT', roomId, sender, content: '', date: new Date().toLocaleTimeString() } )
        });
        // 2. 소켓 닫기
        clientRef.current.deactivate()
        setIsConnected(false); setMessage([]); // 상태변수 초기화
    }

    return (
        <div>
                { !isConnected ? (
                    <div>
                        <input value={ roomId } placeholder="방제목/번호 입력"
                            onChange={ (e) =>{ setRoomId( e.target.value ) } } />
                        <input value={ sender } placeholder="채팅 닉네임 입력"
                            onChange={ (e) =>{ setSender( e.target.value) } } />
                        <button type="button" onClick={ connect }> 접속 </button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <b> 방제목:{ roomId } / 접속자 : { sender } </b>
                            <button type="button" onClick={ disconnect }> 퇴장 </button>
                        </div>
                        <div>
                            { messages.map( (msg)=>{
                                <div>
                                    { msg.type === 'TALK' ? (
                                        /* 내가 보낸 메시지 여부 */
                                        msg.sender === sender ? (
                                            <div>
                                                <time>{msg.date} </time>
                                                <p>{ msg.content} </p>
                                            </div>
                                        ) : ( /* 남이 보낸 메시지 */
                                            <div>
                                                <small>{ msg.sender} </small>
                                                <div>
                                                    <span> {msg.content } </span>
                                                    <p> {msg.date }</p>
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <i> { msg.content } </i>
                                    )}
                                </div>
                            } )}
                        </div>
                        <div>
                            <input value={ message } onChange={ (e)=> setMessage(e.target.value )} />
                            <button type="button" onClick={ sendMessage }> 전송 </button>
                        </div>
                    </div>
                )}
                <Notice />
            </div>
    )
}