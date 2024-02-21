import styles from "@/styles/Subjects.module.css";

export default async function Subjects() {
  const subjects = [
      {
          label: 'Математика',
          imgURL: '/bg-math.svg',
          background: "linear-gradient(128.66deg, rgb(84, 138, 216) 16.631%,rgb(138, 75, 211) 85.578%)",
      },
      {
          label: 'Информатика',
          background: "linear-gradient(128.66deg, rgb(243, 62, 98) 16.631%,rgb(247, 147, 52) 85.578%)",
      },
  ]

  return (
    <>
      <h2 className={styles.title}>Предметы</h2>
      <ul className={styles.subjects}>
          {subjects.map((subject, index) =>
              <li key={index} className={styles.subject} style={{background: subject.background}}>{subject.label}</li>
          )}
      </ul>
    </>
  )
}