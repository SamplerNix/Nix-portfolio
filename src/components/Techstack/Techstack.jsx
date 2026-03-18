import styled from "styled-components"
import { useEffect, useState } from "react"

const Techstack = () => {

  const [tech,setTech] = useState([])

  useEffect(()=>{

    fetch("http://localhost:5000/techstack")
    .then(res=>res.json())
    .then(data=>setTech(data))

  },[])

  return (
    <>
      <section id="techstack">

        <Maincon>
          <h4>TechStack</h4>
          <p>Technology that I've been working with recently</p>
        </Maincon>

        <Icongal>

          {tech.map((t)=>(
            <img
              key={t.id}
              src={`http://localhost:5000/uploads/tech/${t.icon}`}
              alt={t.name}
            />
          ))}

        </Icongal>

      </section>
    </>
  )
}

export default Techstack
const Maincon=styled.div`
h4{
    font-size:48px;
    font-weight:600;
    color:#CCCCCC;
    justify-content:center;
    display:flex;
    margin-top:150px;
}
p{
    color:#A7A7A7;
    font-size:32px;
    display:flex;
    justify-content:center;
    margin-top:49;
}
`;
const Icongal=styled.div`
display:grid;
grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
gap:100px;
justify-items:center;
padding:40px;
`;
