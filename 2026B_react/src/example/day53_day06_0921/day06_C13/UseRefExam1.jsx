import { useRef, useState } from "react";

// P.201 하단 표 참고 
export default function UserRefExam1(props){
    // 훅: 리액트에서 만든 다양한 함수들, 컴포넌와 연관기능
    const [stateNum, setStateNum] = useState(0); // 상태변수
    const refNum = useRef(0); // Ref 변수
    let myNum = 0; // 일반 변수

    const plusState = ()=>{  // 상태변수 1을 증가시키는 함수
        setStateNum( stateNum +1 );
        console.log( 'State증가', stateNum);
    }

    const plusRef = () => {  // Ref를 1 증가시키는 함수
        refNum.current = refNum.current + 1 ;
        console.log('Ref증가', refNum.current); // {current : 0}
    }

    const plusMyNum = () => {
        console.log( '일반 변수 증가', ++myNum);
    }

    return (<>
        <h2> userRef 사용하기1 </h2>
        <div>
            <p> State : {stateNum} </p>
            <p> Ref : {refNum.current} </p>
            <p> myNum : {myNum} </p>
            <button onClick={plusState}>State 증가</button>
            <button onClick={plusRef}> Ref 증가</button>
            <button onClick={plusMyNum}> myNum 증가 </button>
        </div>
    
    </>);
}