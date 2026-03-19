import styled from "styled-components"
import { useEffect, useState, useRef } from "react"

const Techstack = () => {

  const [tech,setTech] = useState([])
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(()=>{

    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/techstack`)
    .then(res=>res.json())
    .then(data=>setTech(data))

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    
    return () => observer.disconnect();
  },[])

  return (
    <>
      <section id="techstack" ref={domRef}>

        <Maincon className={isVisible ? "animate" : ""}>
          <h4>TechStack</h4>
          <p>Technology that I've been working with recently</p>
        </Maincon>

        <Icongal className={isVisible ? "animate" : ""}>

          {tech.map((t)=>(
            <img
              key={t.id}
              src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/uploads/tech/${t.icon}`}
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
  opacity: 0;
  &.animate {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

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
  opacity: 0;
  &.animate {
    animation: fadeInUp 0.8s ease-out 0.2s forwards;
  }
display:grid;
grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
gap:100px;
justify-items:center;
padding:40px;
@media(max-width: 768px) {
  gap: 30px;
  padding: 20px;
}
`;
