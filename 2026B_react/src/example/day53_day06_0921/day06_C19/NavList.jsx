export default function NavList(props){
    return (
        <nav>
            <a href="/"
                onClick={function (e) {
                    e.preventDefault();
                    props.onChangeMode();
                }}> 글 쓰기 </a>
        </nav>
    );
}