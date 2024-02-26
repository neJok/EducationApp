'use client';
import BackButton from "@/components/BackButton";
import styles from "@/styles/Lessons.module.css";
import useSubjects from "@/hooks/useSubjects";
import {useEffect, useState} from "react";
import Subject from "@/lib/Models/subject";
import {notFound} from "next/navigation";
import Lesson from "@/lib/Models/lesson";
import Link from "next/link";
import {getRandomGradient} from "@/lib/utils";
import fade_in from "@/styles/FadeIn.module.css";

export default function Page({ params }: { params: { name: string, class: number } }) {
  const { subjects } = useSubjects();
  const [currentSubject, setCurrentSubject] = useState<Subject | undefined>(
    undefined
  );

  useEffect(() => {
    if (subjects.length !== 0) {
      const subject = subjects.find((subject: Subject) => subject.key === params.name);
      if (!subject) {
        notFound()
      }
      setCurrentSubject(subject);
    }
  }, [params.name, subjects]);

  return (
    <>
      <BackButton />
      <div className={styles.content}>
        <h1 className={styles.title}>{currentSubject?.label}</h1>
        <h2 className={styles.class + " " + fade_in.style}>{params.class} класс</h2>
        <ul className={styles.lessons + " " + fade_in.style}>
          {currentSubject?.lessons[params.class].map((lesson: Lesson, index) =>
            <Link
              href={`/subject/${params.name}/${params.class}/lesson/${lesson.lesson_id}/view`}
              className={styles.lesson}
              key={index}
              style={{background: getRandomGradient()}}
            >
              {lesson.title}
            </Link>
          )}
        </ul>
      </div>
    </>
  )
}