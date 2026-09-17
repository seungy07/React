import axios from "axios";
import { useEffect, useState } from "react";
import "./Cjw.css";


export default function Ksy(props){
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [cno, setCno] = useState("");

    // 카테고리 목록
    const [categories, setCategories] = useState([]);
      // 카테고리 전체 조회
    useEffect(() => {
        const categoryPrint = async() => {
            const response = await axios.get(
                "https://wellness-exclusion-surfing-advisory.trycloudflare.com/api/categories"
            );
            console.log(response.data);
            setCategories(response.data);
        };
        categoryPrint();
    }, []);

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

            </div>

        </div>
    );
}