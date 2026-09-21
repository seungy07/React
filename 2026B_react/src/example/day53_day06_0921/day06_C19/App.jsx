import NavList from "./NavList";
import NavWrite from "./NavWrite";
import NavView from "./NavView";
import NavEdit from "./NavEdit";
import ArticleList from "./ArticleList";
import { useState } from "react";
import ArticleView from "./ArticleView";
import ArticleWrite from "./ArticleWrite";
import ArticleEdit from "./ArticleEdit";

function Header(props){
    return (
        <header>
            <h2>{props.title}</h2>
        </header>
    );
}

export default function App(props){
    const [boardData, setBoardData] = useState([
        {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2025-01-01', 
        contents:'React를 \n뽀개봅시당'},
        {no:2, title:'어제는 Javascript공부해씸', writer:'유겸쌤', date:'2025-02-02', 
        contents:'Javascript는 할게 너무 많아요'},
        {no:3, title:'내일은 Project해야징', writer:'미르쌤', date:'2025-03-03', 
        contents:'Project는 뭘 만들어볼까?'},
    ]);

    const [mode, setMode] = useState("list");
    const [no, setNo] = useState(null);
    const [nextNo, setNextNo] = useState(4);


    let articleComp, navComp, titleVar, selectRow;
    if(mode === "list"){
        titleVar= "게시판-목록";
        navComp = (
            <NavList onChangeMode={
                () => { setMode("write"); }
            }></NavList>
        );
        articleComp = (
            <ArticleList boardData={boardData}
            onChangeMode={ (no) => {
                setMode("view");
                setNo(no);
            } }></ArticleList> 
        );
    }else if (mode === "view"){
        titleVar = "게시판-열람";
        navComp = <NavView onChangeMode={ (pmode) => {setMode(pmode);}}></NavView>
        
        for(let i=0; i<boardData.length; i++){
            if(no===boardData[i].no){
                selectRow = boardData[i];
            }
        }
        
        articleComp = <ArticleView selectRow={selectRow}></ArticleView>;

    }else if(mode==="write"){
        titleVar = "게시판-쓰기";
        navComp = (
            <NavWrite onChangeMode={
                ()=> {setMode("list");}
            }></NavWrite>
        );
        articleComp = <ArticleWrite writeAction={ (t,w,c) => {
            let nowDate = new Date().toISOString().slice(0,10);
            let addBoardData = {no: nextNo, title: t, writer: w, contents: c, date: nowDate};
            let copyBoardData = [...boardData];
            copyBoardData.push(addBoardData);

            setBoardData(copyBoardData);
            setNextNo(nextNo+1);
            setMode('list');
        }}></ArticleWrite>;

    }else if(mode === "delete"){
        let newBoardData = [];
        for(let i=0; i<boardData.length; i++){
            if( no !== boardData[i].no ){newBoardData.push(boardData[i]);}
        }
        setBoardData(newBoardData);
        setMode('list');
    }


    return (<>
        <Header title={titleVar}></Header>
        {navComp}
        {articleComp}
    </>)
}