import styled from "styled-components";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";

const BASE_URL = API_URL;

const Home = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  useEffect(() => {
    // Fetch profile image URL from backend
    fetch(`${BASE_URL}/get-profile`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.url) {
          setProfileUrl(data.url);
        } else {
          setProfileUrl(`${BASE_URL}/uploads/profile/profile.jpg`);
        }
      })
      .catch(() => {
        setProfileUrl(`${BASE_URL}/uploads/profile/profile.jpg`);
      });
  }, []);

  const handleViewCV = () => {
    // Open CV — if URL is a Cloudinary link it works directly
    window.open(`${BASE_URL}/uploads/mycv.pdf`, "_blank");
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
      <img src={profileUrl || `${BASE_URL}/uploads/profile/profile.jpg`} alt="Profile" />
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
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeInUp 0.8s ease-out forwards;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

/* Mobile fix */
@media(max-width: 768px){
    flex-direction: column;
    text-align: center;
    gap: 40px;
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
  height: auto;
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
  @media(max-width: 768px) {
    h1 {
      font-size: 32px;
    }
    .name {
      font-size: 32px;
    }
  }
`;
const Gola=styled.div`
  width: 349px;
  max-width: 80vw;
  max-height: 80vw;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  border-radius: 50%;
  padding: 8px;   /* border thickness */
  box-sizing: border-box;
  margin: 0 auto;

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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.4s forwards;
  
  @media(max-width: 768px) {
    justify-content: center;
  }
  button{
    min-width:150px;
    height:50px;
    border-radius:25px;
    border:none;
    font-size:20px;
    font-weight:700;
    background: linear-gradient(90deg, #13b0f5 3%, #e70faa 100%);
    color:white;
    cursor:pointer;
  }
`;
