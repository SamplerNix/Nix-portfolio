import style from "./Experience.module.css"
const Experience = ({title,location,organisation,date,type}) => {
  return (<div>
    <div className="column">
    <div className={style.title}>
      {title}
      <button>{type}</button>
    </div>
    <div className={style.organisation}>  
      {organisation}
      <p><img src="./Techicon/carbon_location.svg"/>{location}  </p>
     <p>{date}</p> 
    </div>
    </div>
    </div>
  )
}

export default Experience;
