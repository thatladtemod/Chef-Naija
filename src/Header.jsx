import logo from "../public/ChefNaija.png"

export default function Header() {

    return (
        <header>
            <div className="brand">
                <div className="brand-image-container">
                    <img className="brand-image" src={logo} alt="the brand logo for chef naija" />
                </div>
                <h1 className="brand-name">Chef Naija</h1>
            </div>
        </header>
    )
}