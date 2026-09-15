import { useState } from "react"

const TopComp = ( {MyData} ) => {
    return (<>
        <ol>
            <li> 프론트엔드 </li>
            <ul>
                {MyData.front.map( (item, i) => <li key={i}> {item} </li> )}
            </ul>
            <li> 백엔드 </li>
            <ul>
                {MyData.back.map( (item, i) => <li key={i}> {item} </li> )}
            </ul>

        </ol>
    </>)
}
export default function Component3( props ){
    const [MyData, setMyData] = useState( {
        front: ['html5', 'css3', 'js', 'jQuery'],
        back: ['java', 'Oracle', 'JSP' , 'Spring Boot'],
    })
    const addFront = () => {
        MyData.front.push('React');
        setMyData(MyData);
        console.log(MyData)
    }

    const addBack = () => {
        const newBack = [...MyData.back, 'Node.js'];
        const newMyData = {...MyData, back: newBack};
        setMyData(newMyData);
    }
    return (<>
        <h2>React-Shallow Comparison</h2>
        <TopComp MyData = {MyData} />
        <button type="button" onClick= { addFront }> 프론트 추가 </button>
        <button type="button" onClick= { addBack }> 백엔드 추가 </button>
    </>)
}