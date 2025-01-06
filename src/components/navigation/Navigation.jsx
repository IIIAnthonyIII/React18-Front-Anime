import React from "react";
import "./Navigation.css";

const Navigation = () => {
  const options = [
    { option: 'Profile', icon: 'a' },
    { option: 'Videos', icon: 'b' },
    { option: 'Revenue', icon: 'c' },
    { option: 'Inbox', icon: 'd' },
    { option: 'Settings', icon: 'e' },
    { option: 'Support', icon: 'f' },
    { option: 'Logout', icon: 'g' },
  ]
  const menuToggle =() => {
    const menu_toggle = document.querySelector(".menu_toggle");
    const navigation = document.querySelector(".navigation");
    navigation.classList.toggle("active");
    menu_toggle.classList.toggle("active");
  };
  return (
    <div className="box_navigation">
      <div className="drawer">
        <div className="menu_toggle" onClick={menuToggle}>
          <span></span>
        </div>
        <div className="navigation">
          <ul className="menu">
            <li>
              <a href="#">
                <span className="icon">
                  {/* <ion-icon name="person-outline"></ion-icon> */}a
                </span>
                <span className="text">Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  {/* <ion-icon name="videocam-outline"></ion-icon> */}b
                </span>
                <span className="text">Videos</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  {/* <ion-icon name="wallet-outline"></ion-icon> */}c
                </span>
                <span className="text">Revenue</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  {/* <ion-icon name="chatbubbles-outline"></ion-icon> */}d
                </span>
                <span className="text">Inbox</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  {/* <ion-icon name="settings-outline"></ion-icon> */}e
                </span>
                <span className="text">Settings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  {/* <ion-icon name="help-outline"></ion-icon> */}f
                </span>
                <span className="text">Support</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  {/* <ion-icon name="log-out-outline"></ion-icon> */}g
                </span>
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
