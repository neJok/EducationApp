'use client';
import BackButton from "@/components/BackButton";
import styles from "@/styles/Lessons.module.css";
import Link from "next/link";
import {getRandomGradient} from "@/lib/utils";
import fade_in from "@/styles/FadeIn.module.css";
import {useUser} from "@/hooks/useUser";
import useSubjectLessons from "@/hooks/useLessons";

export default function Page({ params }: { params: { name: string, class: string } }) {
  const { data } = useSubjectLessons(params.name, params.class)
  const { data: user } = useUser()

  return (
    <>
      <BackButton />
      <div className={styles.content}>
        <h1 className={styles.title}>{data?.label}</h1>
        <h2 className={styles.class + " " + fade_in.style}>{params.class} класс</h2>
        <ul className={styles.lessons + " " + fade_in.style}>
          {data?.lessons.map((lesson, index) =>
            <Link
              href={`/subject/${params.name}/${params.class}/lesson/${lesson.lesson_id}/view`}
              className={styles.lesson}
              key={index}
              style={{background: getRandomGradient()}}
            >
              {user?.completed_tests.includes(lesson.lesson_id) && '✔️'} {lesson.title}
            </Link>
          )}
        </ul>
      </div>
    </>
  )
}