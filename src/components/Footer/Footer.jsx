import style from "./Footer.module.css";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
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
    <footer className={style.footer}>
      <div className={style.top}>
        <div className={style.logo}>
          <h2>{`NIX`}</h2>
          <span>Dev</span>
        </div>

        <div className={style.contact}>
          <p>+91 8437396749</p>
          <p>nikhilprocode@gmail.com</p>
        </div>

        <div className={style.social}>
          <a href="https://github.com/SamplerNix">
            {" "}
            <img src="/images/github.svg" alt="github" />
          </a>
          {/* <img src="./images/twitter.svg" alt="twitter"/> */}
          <a href="https://linkedin.com/in/nikhil-dev-code">
            {" "}
            <img src="/images/linkedin.svg" alt="linkedin" />
          </a>
        </div>
      </div>

      <div className={style.line}></div>

      <div className={style.bottom}>
        <div className={style.nav}>
          <ul>
            <li
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
            >
              Home
            </li>
            <li>
              <Link className={style.Link} to="/AboutMe">
                About
              </Link>
            </li>
            <li onClick={() => scrollToSection("techstack")}>Techstack</li>
            <li onClick={() => scrollToSection("Projects")}>Project</li>
            <li>
              <Link className={style.Link} to="/Contactform">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <p className={style.credit}>
          Designed and built by <span>Nikhil</span> with{" "}
          <span>React and figma</span>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
