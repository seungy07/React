import { useState } from "react"

// html -> CSS -> JS
export default function Practice2( props ){
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState(0);

    const [members, setMembers] = useState( [] ); // 빈배열 선언

    // ---- 등록함수
    const 등록함수 = () => {
        const obj = { name, phone, age} // 입력받은 값들을 객체로 만든
        // 배열에 객체 저장
        members.push(obj); 
        console.log(obj)
        // 랜더리을 위한 members setter에 스프레드 연산자 배열 복사
        setMembers( [...members] );
    }

    // -- 삭제함수
    const 삭제함수 = (index) => {
        members.splice(index, 1);
        setMembers([...members]);
    }
    return (<>
        <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
        <input value={age} onChange={(e)=>{setAge(e.target.value)}}/>
        <button onClick={ 등록함수 }>등록</button>
        <br />
        {
            members.map( (m, index)=>{
                return (<>
                    <div>
                        <span> 성명 : {m.name} </span>
                        <span> 연락처 : {m.phone} </span>
                        <span> 나이 : {m.age} </span> 
                        {index}
                        <button onClick={삭제함수}>삭제</button>
                    </div>
                </>);
            } )
        }
        <div> 총 인원: {members.length}명 </div>
    </>)
}