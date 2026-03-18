import styled from "styled-components";
import Projectcard from "./Projectcard";
import { useEffect, useState } from "react";
const Projects = () => {
  const [projects, setProjects] = useState([]); 
    useEffect(() => {

    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));

  }, []);
  return (
    <section id="Projects">
      <Project>

        <h4>Projects</h4>
        <p className="p">Things I've build so Far</p>

        <div className="grid">
          {projects.map((project, index) => (
            <Projectcard key={index} {...project} />
          ))}
        </div>

      </Project>
    </section>
  );
};

export default Projects;
const Project = styled.div`
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
    width: 90%;
    margin: auto;
    padding: 60px 0;
/* grid-template-columns: repeat(3, 1fr); */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 40px;
  }
  @media(max-width: 900px){
  .container{
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media(max-width: 600px){
  .container{
    grid-template-columns: 1fr;
  }
}
`;
