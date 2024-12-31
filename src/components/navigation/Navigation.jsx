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
    <div class="box_navigation">
      <div class="drawer">
        <div class="menu_toggle" onClick={menuToggle}>
          <span></span>
        </div>
        <div class="navigation">
          <ul class="menu">
            <li>
              <a href="#">
                <span class="icon">
                  {/* <ion-icon name="person-outline"></ion-icon> */}a
                </span>
                <span class="text">Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  {/* <ion-icon name="videocam-outline"></ion-icon> */}b
                </span>
                <span class="text">Videos</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  {/* <ion-icon name="wallet-outline"></ion-icon> */}c
                </span>
                <span class="text">Revenue</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  {/* <ion-icon name="chatbubbles-outline"></ion-icon> */}d
                </span>
                <span class="text">Inbox</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  {/* <ion-icon name="settings-outline"></ion-icon> */}e
                </span>
                <span class="text">Settings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  {/* <ion-icon name="help-outline"></ion-icon> */}f
                </span>
                <span class="text">Support</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  {/* <ion-icon name="log-out-outline"></ion-icon> */}g
                </span>
                <span class="text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
