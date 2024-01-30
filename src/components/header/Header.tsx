import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">ReactWeather</div>
      <div className="github-icon">
        <FaGithub />
      </div>
    </div>
  );
};

export default Header;
