import axios from "axios";
import { useEffect, useState } from "react";
import "./Cjw.css";


export default function Ksy(props){
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [cno, setCno] = useState("");

    // 스프링 api 연결부분 
    const [powerPlants, setPowerPlants] =useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // sping 발전소 목록 요청

    useEffect( ()=> {
        const powerPlantPrint = async () => {
        try{
            const response = await axios.get("http://localhost:8080/day08");
            const list = Array.isArray(response.data) ? response.data : response.data.data;    

            if( !Array.isArray(list)){ throw new Error("배열아님") }
            setPowerPlants(list);
        }catch(error){
            console.error(error);
            setError("출력실패");
        } finally {
            setLoading(false);
        }
        };
        powerPlantPrint();
    },[]);

    // 카테고리 목록
    const [categories, setCategories] = useState([]);
      // 카테고리 전체 조회
    useEffect(() => {
         const categoryPrint = async () => {
        try {
            const response = await axios.get(
                "https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/categories"
            );

            console.log("카테고리 응답:", response.data);

            if (!Array.isArray(response.data)) {
                throw new Error("카테고리 응답이 배열이 아닙니다.");
            }

            setCategories(response.data);
        } catch (error) {
            console.error("카테고리 조회 실패:", error);
            setCategories([]);
        } finally {
        setLoading(false);
        };
        categoryPrint();
    }}, [] );

    // 제품 등록
    const productAdd = async() => {
        const obj = {
            name: name,
            price: Number(price),
            cno: Number(cno)
        };

        const response = await axios.post(
            "https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/products",
            obj
        );

        console.log(response.data);
        alert("제품 등록 성공");
        setName("");
        setPrice("");
        setCno("");
    };



    return ( <div className="cjwContainer">

            <div className="profileCard">

                <h2>
                    김승연
                    <span>[제품 등록]</span>
                </h2>


                {/* 제품명 */}
                <div className="profileRow">

                    <div className="profileTitle">
                        제품명
                    </div>

                    <div className="profileContent">
                        <input
                            className="productInput"
                            type="text"
                            placeholder="제품명을 입력하세요."
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>

                </div>


                {/* 가격 */}
                <div className="profileRow">

                    <div className="profileTitle">
                        가격
                    </div>

                    <div className="profileContent">
                        <input
                            className="productInput"
                            type="number"
                            placeholder="가격을 입력하세요."
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </div>

                </div>


                {/* 카테고리 */}
                <div className="profileRow">

                    <div className="profileTitle">
                        카테고리
                    </div>

                    <div className="profileContent">

                        <select
                            className="productInput"
                            value={cno}
                            onChange={(e) => {
                                setCno(e.target.value);
                            }}
                        >

                            <option value="">
                                카테고리를 선택하세요.
                            </option>

                            {
                                categories.map((category) => {
                                    return (
                                        <option
                                            key={category.cno}
                                            value={category.cno}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })
                            }

                        </select>

                    </div>

                </div>


                {/* 버튼 */}
                <div className="productButtonBox">

                    <button
                        className="productButton"
                        type="button"
                        onClick={productAdd}
                    >
                        제품 등록
                    </button>

                </div>
                {/* 추가: 제품 등록 아래에 발전소 목록 표시 */}
                <div style={{ marginTop: "30px" }}>
                    <h3>발전소 목록</h3>

                    {loading ? (
                        <p>불러오는 중입니다.</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : powerPlants.length === 0 ? (
                        <p>조회된 데이터가 없습니다.</p>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>발전소명</th>
                                        <th>설비구분</th>
                                        <th>사용연료</th>
                                        <th>설비용량(MW)</th>
                                        <th>위치</th>
                                        <th>주연료</th>
                                        <th>준공일자</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {powerPlants.map((plant) => (
                                        <tr key={plant["번호"]}>
                                            <td>{plant["번호"]}</td>
                                            <td>{plant["발전소명"]}</td>
                                            <td>{plant["설비구분"]}</td>
                                            <td>{plant["사용연료"]}</td>
                                            <td>{plant["설비용량(MW)"]}</td>
                                            <td>{plant["위치"]}</td>
                                            <td>{plant["주연료"]}</td>
                                            <td>{plant["준공일자"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}