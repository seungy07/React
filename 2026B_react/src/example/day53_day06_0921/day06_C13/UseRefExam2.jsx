import { useEffect, useRef } from "react"

// ID 만들 시 password 확인 예제 p.202~203
export default function UseRefExam2(props){
    const passRef1 = useRef();
    const passRef2 = useRef();

    useEffect( () => {  // 컴포넌트 생성시 최초 1번 실행
        console.log('passRef', passRef1, passRef2);
        passRef1.current.focus(); //  .focus : 해당 dom 마우스 (깜빡거리는)커스 두기
    }, []);

    const checkPassword = () => {
        if( !passRef1.current.value || passRef2.current.value == ''){
            alert( '비밀번호 입력' );
            passRef1.current.focus();
            return ;
        }
        if( passRef1.current.value === passRef2.current.value){
            alert('비밀번호 확인');
        }
        else{
            alert('비밀번호 일치 안함');
            passRef1.current.value = '' ;
            passRef2.current.value = '' ;
            passRef1.current.focus();
        }
    } 

    return (<>
        <h2>useRef ㅅㅏ용하기 2</h2>
        <form>
            패스워드1 : <input type="text" ref={passRef1} name="pass1" /><br />
            패스워드2 : <input type="text" ref={passRef2} name="pass2" /><br />
            <button type="button" onClick={checkPassword}>패스워드 확인</button>
        </form>
    </>)
}
/*
    입력 상자내 입력받은 값 제어
    1. useState
        const [title, setTitle] = useState('');
        <input value={title} onChange={(e)=>{setTitle(e.target.value);}}

    2. useRef
        const titleRef = useRef('');
        <input ref={titleRef} />
-----------------------------------------------------------------------
    const formRef = useRef('');
    *<form ref= {formRef} >
    </form>

    뒤 memo, callback랑 넘김 
*/