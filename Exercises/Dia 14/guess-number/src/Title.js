import image from './interrogation.png'

function Header(props) {
    return (
        <div className="Header">
            <h1>Guess a number between 1 and {props.maxNum}!</h1>
            <hr />
            <img src={image} alt="Logo"></img>
            {/* TODO: create the header */}
        </div>
    );
}

export default Header;

