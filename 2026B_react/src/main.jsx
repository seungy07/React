import { StrictMode } from 'react'
//[필수] 1. 리액트 라이브러리 최초 렌더링(그리기)하는 함수
import { createRoot } from 'react-dom/client'
// [선택] 최초로 화면을 그리기 할 컴포넌트 가져와서 렌더링
// 1. import 이용하여 컴포넌트 가져온다. 
// import App from './App.jsx'
// 2. 가져온 컴포넌트 렌더링하기
// create.render( <App> </App> )

// [day01] render 1번 가능하므로 예제 컴포넌트 변경
// import MyMarkup from "./example/day01/MyMarKup";
// create.render( <MyMarkup> </MyMarkup>)

//import Component1 from "./example/day01/Component1";
//create.render( <Component1> </Component1> )

// import Component2 from "./example/day01/Component2";
// create.render( <Component2 /> )

// import Component3 from "./example/day01/Component3";
// create.render( <Component3/> )

// import Component4 from "./example/day01/Component4";
// create.render( <Component4/> )

import Component5 from "./example/day47_day01_0911/Component5";
create.render( <Component5/> )