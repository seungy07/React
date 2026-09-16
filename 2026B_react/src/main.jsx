import { StrictMode } from 'react'
//[필수] 1. 리액트 라이브러리 최초 렌더링(그리기)하는 함수
import { createRoot } from 'react-dom/client'
//[필수] 2. index.html 에서 root 마크업 가져오기 , #ID , .Class
const root = document.querySelector( '#root' )
//[필수] 3. 가져온 root 마크업을 createRoot 함수에 전달한다.
const create = createRoot( root );
// [선택] 최초로 화면을 그리기 할 컴포넌트 가져와서 렌더링
// 1. import 이용하여 컴포넌트 가져온다. 
// import App from './App.jsx'
// 2. 가져온 컴포넌트 렌더링하기
// create.render( <App> </App> )

// [practice2]
// import Practice2 from './example/react_Practice2/Practice2';
// create.render(<Practice2 />)

// [day04 - 09 / 16]
import { BrowserRouter } from 'react-router-dom'; // 1. 라우터 라이브러리 가져오기
import App from './example/react_Practice3/App';
// 2. 최초 렌더링 되는 컴포넌트 앞뒤로 라우터 컴포넌트 감싼다
create.render( <BrowserRouter> <App /> </BrowserRouter>)