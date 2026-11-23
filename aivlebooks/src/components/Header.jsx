function Header({onHome,onCreate}){
    return (
        <header className="px-4">
            <div className="header-innor">
                <button className="home-button" tybe="button" onClick={onHome}>
                    aivlebooks
                    </button>
                    <button className="button" type="button" onClick={onCreate}>
                        도서등록
                    </button>
            </div>
        </header>
    )
}
export default Header