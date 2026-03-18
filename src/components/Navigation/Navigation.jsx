import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
const Navigation = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate("/"); // go to home first

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  return (
    <Nav>
      <div>
        <img className="imges" src="/images/nixlogo.png" />
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AboutMe">About</Link>
          </li>
          <li onClick={() => scrollToSection("techstack")}>TechStack</li>
          <li onClick={() => scrollToSection("Projects")}>Project</li>
          <li>
            <Link to="/Contactform">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="icon">
        <a href="https://github.com/SamplerNix">
          {" "}
          <img src="/images/github.svg" alt="github"></img>
        </a>
        {/* <img src="./images/twitter.svg" alt="twitter"></img> */}
        <a href="https://linkedin.com/in/nikhil-dev-code">
          <img src="/images/linkedin.svg" alt="github"></img>
        </a>
      </div>
    </Nav>
  );
};
export default Navigation;
const Nav = styled.div`
  margin-top: 0;
  background: black;
  z-index: 1000;
  display: flex;
  min-width: 1193px;
  height: 59px;
  align-items: center;
  justify-content: space-between;
  /* margin: 0 auto; */
  ul {
    list-style: none;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    gap: 67px;
  }
  ul li {
    cursor: pointer;
  }
  .icon {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-left: 51px;
    cursor: pointer;
  }
  .imges {
    max-width: 97px;
    height: 59px;
  }
  ul a {
    text-decoration: none;
    color: white;
  }
  @media(max-width: 768px){
  .nav{
    flex-direction:column;
    gap:15px;
  }
}
`;
