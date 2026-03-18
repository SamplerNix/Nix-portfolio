import style from './Experience.module.css'
const Education = ({Deegree,institute,type,date}) => {
  return (
    <div>
        <div className="column">
        <div className={style.title}>
          {Deegree}
          <button>{type}</button>
        </div>
        <div className={style.organisation}>  
          {institute}
         <p>{date}</p> 
        </div>
        </div>
        </div>
  )
}

export default Education