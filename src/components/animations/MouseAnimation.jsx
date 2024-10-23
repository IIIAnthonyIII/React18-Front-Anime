import { useEffect } from "react";
import "./MouseAnimation.css";

const MouseAnimation = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const body = document.querySelector("body");
      const star = document.createElement("span");
      star.className = 'star';
      const size = Math.random() * 20;
      const transformValue = Math.random() * 100;

      star.style.left = e.clientX + "px";
      star.style.top = e.clientY + "px";
      star.style.fontSize = 10 + size + "px";
      star.style.transform = "rotate(" + transformValue + "deg)";
      body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 1000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Limpieza del evento cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null; // Este componente no necesita renderizar nada
};

export default MouseAnimation;
