import styled from "styled-components";
import Projectcard from "./Projectcard";
import { useEffect, useState, useRef } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]); 
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    
    return () => observer.disconnect();
  }, []);
  return (
    <section id="Projects" ref={domRef}>
      <Project className={isVisible ? "animate" : ""}>

        <h4>Projects</h4>
        <p className="p">Things I've build so Far</p>

        <div className="grid">
          {(showAll ? projects : projects.slice(0, 6)).map((project, index) => (
            <Projectcard key={index} {...project} />
          ))}
        </div>

        {projects.length > 6 && (
          <ButtonContainer>
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </button>
          </ButtonContainer>
        )}

      </Project>
    </section>
  );
};

export default Projects;
const Project = styled.div`
  opacity: 0;
  &.animate {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h4 {
    font-size: 48px;
    font-weight: 600;
    color: #cccccc;
    justify-content: center;
    display: flex;
    margin-top: 200px;
  }
  .p {
    color: #a7a7a7;
    font-size: 32px;
    display: flex;
    justify-content: center;
    margin-top: 49;
  }
  .grid {
    width: 100%;
    margin: auto;
    padding: 60px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }

  @media(max-width: 900px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media(max-width: 650px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 40px;
  
  button {
    min-width: 150px;
    height: 50px;
    border-radius: 25px;
    border: none;
    font-size: 18px;
    font-weight: 600;
    background: linear-gradient(90deg, #13b0f5 3%, #e70faa 100%);
    color: white;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }
  
  button:hover {
    transform: scale(1.05);
  }
`;
