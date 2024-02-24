import styles from "@/styles/Subjects.module.css";
import Link from "next/link";
import {useAppSelector} from "@/lib/hooks";
import useSubjects from "@/hooks/useSubjects";

export default function Subjects() {
  const {subjects} = useSubjects()

  return (
    <>
      <h2 className={styles.title}>Предметы</h2>
      <ul className={styles.subjects}>
          {subjects.map((subject, index) =>
              <Link href={`/subject/${subject.key}`} key={index} className={styles.subject} style={{background: subject.background}}>{subject.label}</Link>
          )}
      </ul>
    </>
  )
}