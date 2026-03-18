import styled from "styled-components";
import style from "./Experience.module.css";
import Experience from "./Experience";
import Education from "./Education";
import { useState,useEffect } from "react";
const AboutMe = () => {
  // const Experiences = [
  //   {
  //     title: "Tester Intern",
  //     organisation: "Equartis Tech",
  //     location: "Chandigarh",
  //     date: "7/Jan/2026 - Present",
  //     type: "Internship",
  //   },
  // ];
  const [Experiences, setExperiences] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/experience")
    .then((res) => res.json())
    .then((data) => setExperiences(data));
}, []);
  const Educa = [
    {
      Deegree: "Master's Of Computer Application",
      institute: "Panjab University",
      date: "18/Aug/2024 - Present",
      type: "Full time",
    },
    {
      Deegree: "Bachelor's Of Computer Application",
      institute: "Post Graduate Govt College",
      date: "18/Sep/2021 - 2024",
      type: "Full time",
    },
    {
      Deegree: "O Level",
      institute: "NIELIT",
      date: "2021-2022",
      type: "Part Time",
    },
       {
      Deegree: "12th",
      institute: "Govt Model Sr Sec School",
      date: "2020-2021",
      type: "Full time",
    },
  ];
  return (
    <>
      <Aboutme>
        <h4>About Me</h4>
        <div className="p">
          My journey into the world of technology began with a deep fascination
          for how websites are built and the impact they create through user
          experience. This curiosity led me to explore different areas of web
          development—from designing visually appealing interfaces to ensuring
          smooth, efficient functionality. Currently, I’m working on a Petroleum
          Management System using Java, where I’m developing a dynamic web
          application with Servlets and JSP (JavaServer Pages). This project has
          helped me dive deeper into backend development and understand
          real-world application workflows. I also recently participated in a
          36-hour hackathon, where my team and I presented an innovative idea to
          deliver real-time AQI readings using satellite data—completely
          eliminating the need for physical on-ground sensors.
        </div>
      </Aboutme>
      <div className={style.h4}>Work Experience</div>
      {Experiences.map((value, index) => (
        <Experience key={index} {...value} />
      ))}
      <Edu>
        <h4>Education</h4>
        {Educa.map((value, index) => (
          <Education key={index} {...value} />
        ))}
      </Edu>
    </>
  );
};

export default AboutMe;
const Aboutme = styled.div`
  h4 {
    font-size: 48px;
    font-weight: 600;
    color: #cccccc;
    justify-content: center;
    display: flex;
    margin-top: 100px;
  }
  .p {
    color: #a7a7a7;
    font-size: 18px;
    display: flex;
   max-width: 1193px;
    margin: 0 auto;
    margin-top: 49;
    height: 200px;
    /* background-color:red; */
    text-align: justify;
  }
`;
const Edu = styled.div`
  h4 {
    font-size: 48px;
    font-weight: 600;
    color: #cccccc;
    justify-content: center;
    display: flex;
  }
`;
