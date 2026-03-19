import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    navigate("/"); // go to home first
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  return (
    <Nav>
      <div className="logo-container">
        <img className="imges" src="/images/nixlogo.png" alt="logo" />
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <div />
          <div />
          <div />
        </Hamburger>
      </div>
      <Menu isOpen={isOpen}>
        <ul>
          <li>
            <Link onClick={()=>setIsOpen(false)} to="/">Home</Link>
          </li>
          <li>
            <Link onClick={()=>setIsOpen(false)} to="/AboutMe">About</Link>
          </li>
          <li onClick={() => scrollToSection("techstack")}>TechStack</li>
          <li onClick={() => scrollToSection("Projects")}>Project</li>
          <li>
            <Link onClick={()=>setIsOpen(false)} to="/Contactform">Contact</Link>
          </li>
        </ul>
        <div className="icon">
          <a href="https://github.com/SamplerNix">
            {" "}
            <img src="/images/github.svg" alt="github"></img>
          </a>
          {/* <img src="./images/twitter.svg" alt="twitter"></img> */}
          <a href="https://linkedin.com/in/nikhil-dev-code">
            <img src="/images/linkedin.svg" alt="linkedin"></img>
          </a>
        </div>
      </Menu>
    </Nav>
  );
};
export default Navigation;

const Nav = styled.div`
  margin-top: 0;
  background: black;
  z-index: 1000;
  display: flex;
  width: 100%;
  padding: 0;
  animation: fadeInDown 0.8s ease-out forwards;

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  min-height: 59px;
  align-items: center;

  @media (min-width: 769px) {
    position: sticky;
    top: 0;
  }
  justify-content: space-between;
  box-sizing: border-box;

  .logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  @media (min-width: 769px) {
    .logo-container {
      width: auto;
    }
  }

  .imges {
    max-width: 97px;
    height: 59px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 0;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;

  div {
    width: 25px;
    height: 3px;
    background-color: white;
    border-radius: 5px;
    transition: all 0.3s linear;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ul {
    list-style: none;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    gap: 67px;
    padding: 0;
    margin: 0;
    margin-left: auto;
  }
  
  ul li {
    cursor: pointer;
  }

  ul a {
    text-decoration: none;
    color: white;
  }

  .icon {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-left: 51px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    gap: 20px;
    
    ul {
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-left: 0;
    }
    
    .icon {
      margin-left: 0;
      justify-content: center;
    }
  }
`;
