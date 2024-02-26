'use client';
import {useEffect, useState} from "react";
import useSubjects from "@/hooks/useSubjects";
import type Subject from "@/lib/Models/subject";
import BackButton from "@/components/BackButton";
import {notFound} from "next/navigation";
import {LoadingState} from "@/components/TmaSDKLoader";
import styles from '@/styles/Subject.module.css'
import Link from "next/link";
import {getRandomGradient} from "@/lib/utils";
import fade_in from "@/styles/FadeIn.module.css";

export default function Page({ params }: { params: { name: string } }) {
  const { subjects, loading } = useSubjects();
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
      {loading ? <LoadingState/> : (
        <div className={styles.content}>
          <h1 className={styles.title}>{currentSubject?.label}</h1>
          <div className={styles.training_classes + " " + fade_in.style}>
            {currentSubject?.lessons &&
              Object.keys(currentSubject.lessons).map((trainingClass, index) =>
                <Link
                  key={index}
                  href={`/subject/${currentSubject.key}/${trainingClass}`}
                  style={{background: getRandomGradient()}}
                  className={styles.training_class}
                >
                  {trainingClass} класс
                </Link>
              )
            }
          </div>
        </div>
      )}
    </>
  );
}