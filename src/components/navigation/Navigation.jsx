import React from "react";
import "./Navigation.css";
import { useEffect } from "react";
import { BranchesOutlined, DashboardOutlined, GlobalOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

const Navigation = ({onOptionSelect}) => {
  const [active, setActive] = React.useState(false);
  const [currentOption, setCurrentOption] = React.useState('');
  const { logout } = useAuth();

  const options = [
    { option: 'Dashboard', icon: <DashboardOutlined/>, route: '/' },
    { option: 'Anime', icon: <GlobalOutlined/>, route: '/animead' },
    { option: 'Tipo', icon: <BranchesOutlined/>, route: '/type' },
    { option: 'Logout', icon: <LogoutOutlined/>, route: '/login' },
  ];

  useEffect(() => {
    onOptionSelect(active);
  }, [active]);

  const menuToggle =() => setActive(!active);
  
  useEffect(() => {
    getCurrentRoute();
  }, [currentOption]);
  
  const getCurrentRoute = () => {
    const path = window.location.pathname;
    const currentOption = options.find(option => option.route === path);
    setCurrentOption(currentOption ? currentOption.option : '');
  };

  return (
    <div className="box_navigation">
      <div className="drawer">
        <div className={`menu_toggle ${active ? 'active' : ''}`} onClick={menuToggle}>
          <span></span>
        </div>
        <div className={`navigation ${active ? 'active' : ''}`}>
          <ul className="menu">
            {options.map((option, index) => (
              <li key={index} title={option.option} className={currentOption === option.option ? 'active' : ''} onClick={getCurrentRoute}>
                {option.option === 'Logout' ? (
                  <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                    <span className="icon">{option.icon}</span>
                    <span className="text">{option.option}</span>
                  </a>
                ) : (
                  <Link to={option.route}>
                    <span className="icon">{option.icon}</span>
                    <span className="text">{option.option}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
