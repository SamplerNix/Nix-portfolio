import styled from "styled-components";
const Home = () => {
  const handleViewCV = () => {
 window.open("http://localhost:5000/uploads/mycv.pdf", "_blank");
};
  return (
    <div>
    <Maincontent className="hero">
      <Namecal>
        <h1>
          Hi 👋 <br />
          My Name is
          <br />
        <div className="name"> Nikhil</div>
        I build things for web</h1>
      </Namecal>
      <Gola>
      <img src="http://localhost:5000/uploads/profile/profile.jpg"/>
      </Gola>
    </Maincontent>
    <Cvbutton>
    <button onClick={handleViewCV}>View CV</button>
    </Cvbutton>
    </div>
  );
};

export default Home;
const Maincontent = styled.div`
  margin-top: 220px;
  display: flex;
  justify-content:space-between;
  .hero{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

/* Mobile fix */
@media(max-width: 768px){
  .hero{
    flex-direction:column;
    text-align:center;
    gap:30px;
  }
}
`;
const Namecal = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 636px;
  height: 297px;
  /* background-color:red; */
  h1 {
    font-size: 45px;
    font-weight: 600;
    color:#CCCCCC;
  }
  .name {
    font-size: 45px;
    font-weight: 600;
    background: linear-gradient(90deg, #13b0f5 3%, #e70faa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
const Gola=styled.div`
width: 349px;
  height: 349px;
  border-radius: 50%;
  padding: 8px;   /* border thickness */

  background: linear-gradient(180deg,#E70FAA,#00C0FD);

  display:flex;
  align-items:center;
  justify-content:center;
  
img{
 width:100%;
  height:100%;
  border-radius:50%;
  object-fit:cover;
}
`;
const Cvbutton=styled.div`
button{
  min-width:150px;
  height:50px;
  border-radius:25px;
  border:none;
  font-size:20px;
  margin:0 auto;
  font-weight:700;
   background: linear-gradient(90deg, #13b0f5 3%, #e70faa 100%);
   color:white;
   cursor:pointer;
}

  `
