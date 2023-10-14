import stars from './stars.svg';

const justifyContent = {
    space: "space-between",
    left: "left",
    right: "left"
};

const Header = () => {
    return (
        <div className="row" style={{ justifyContent: justifyContent.space }}>
            <div className="col" style={{ justifyContent: justifyContent.left }}>
                <p className="header-text"> crimepatrol.eth </p>
            </div>
            <div className="col" style={{ justifyContent: justifyContent.right }}>
                <img src={stars} alt="stars"/>
            </div>
        </div>
    );
}

export default Header;