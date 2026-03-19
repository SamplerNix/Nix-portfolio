import styles from './Projectcard.module.css'

const Projectcard = ({ image, title, description, tech, link, gitlink }) => {

  return (
    <div className={styles.card}>

      <img
        src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/uploads/projects/${image}`}
        alt={title}
        className={styles.image}
      />

      <div className={styles.content}>

        <h3>{title}</h3>

        <p>{description}</p>

        <span className={styles.tech}>
          Tech stack : {tech}
        </span>

        <div className={styles.links}>
          <a href={link} target="_blank">
            <img src="./Techicon/akar-icons_link-chain.png" />
            Live Preview
          </a>

          <a href={gitlink} target="_blank">
            <img src="./Techicon/akar-icons_github-fill.png" />
            View Code
          </a>
        </div>

      </div>

    </div>
  )

}

export default Projectcard