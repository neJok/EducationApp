import styles from "@/styles/Subjects.module.css";
import Link from "next/link";
import useSubjects from "@/hooks/useSubjects";
import fade_in from "@/styles/FadeIn.module.css";
import Loading from "@/components/Loading";

export default function Subjects() {
  const {data: subjects, isLoading} = useSubjects()

  return (
    <>
      <h2 className={styles.title}>Предметы</h2>
      <ul className={styles.subjects  + " " + fade_in.style}>
        {isLoading?
          <Loading height={20} className={styles.subject} width={120} /> :
          <>
            {subjects?.map((subject, index) =>
              <Link href={`/subject/${subject.key}`} key={index} className={styles.subject} style={{background: subject.background}}>{subject.label}</Link>
            )}
          </>
        }
      </ul>
    </>
  )
}