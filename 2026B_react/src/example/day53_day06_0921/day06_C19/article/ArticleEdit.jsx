import { useState } from "react";

export default function ArticleEdit(props){
    const [title, setTitle] = useState(props.selectRow.title);
    const [writer, setWriter] = useState(props.selectRow.writer);
    const [contents, setContents] = useState(props.selectRow.contents);

    return (
        <article>
            <form onSubmit={(e)=>{
                e.preventDefault();
                let title = e.target.title.value;
                let writer = e.target.writer.value;
                let contents = e.target.contents.value;
                props.editAction( title, writer, contents);
            }}>
                <table id="boardTable">
                    <tbody>
                        <tr>
                            <th>작성자</th>
                            <td><input type="text" name="writer" value={writer} onChange={
                                (e)=>{setWriter(e.target.value);}
                            }/></td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td><input type="text" name="title" value={title} onChange={
                                (e) => { setTitle( e.target.value );}
                            } /></td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td><textarea name="contents" cols='22' rows='3' value={contents} onChange={
                                (e)=>{setContents(e.target.value);}
                            }></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" >수정</button>
            </form>
        </article>
    );
}