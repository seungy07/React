import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

export default function Write(props){
    // html : <a>,              REACT : <Link> 
    // js : location.href="" ,  REACT : navigate("")
    //  *html/js 코드는 깜빡거림(새로고침).  
    const navigate = useNavigate();  // 화면을 이동하기 위한 훅
    
    // 등록함수 form  onSubmit
    const 등록함수 = async (e) => {
        e.preventDefault();
        // 이벤트 발생시킨 form 마크업내 name 속성으로 입력값 반환
        const obj = {
            name : e.target.writer.value,
            subject : e.target.title.value,
            content : e.target.contents.value
        }
        // axios
        const response = await axios.post("http://localhost:8080/api", obj);
        const data = response.data;
        if(data == true){ navigate("/list")} // 반환값이 true이면 페이지 전환

    }

    return (<>
        <header>
            <h2>게시판-작성</h2>
        </header>
        <nav>
            <Link to="/list" >목록</Link>
        </nav>
        <article>
            <form onSubmit={(e)=>{등록함수(e);}}>
                작성자: <input type="text" name="writer" /> <br />
                제목:   <input type="text" name="title" />  <br />
                내용: <textarea name="contents" rows="3"></textarea> <br />
                <input type="submit" value="작성" />
            </form>
        </article>
    </>)
}