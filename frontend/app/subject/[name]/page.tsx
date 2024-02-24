'use client';
import {useEffect, useState} from "react";
import useSubjects from "@/hooks/useSubjects";
import type Subject from "@/lib/Models/subject";
import BackButton from "@/components/BackButton";
import {notFound} from "next/navigation";
import {LoadingState} from "@/components/TmaSDKLoader";
import styles from '@/styles/Subject.module.css'
import Link from "next/link";

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


  let gradients = ['linear-gradient(128.66deg, rgb(156, 62, 152) 19.063%,rgb(170, 43, 248) 83.119%)', 'linear-gradient(128.66deg, rgb(62, 117, 156) 19.063%,rgb(109, 43, 248) 83.119%)']
  let remainingGradients = [...gradients]
  function getRandomGradient(): string | undefined {
    if (remainingGradients.length === 0) {
      remainingGradients = [...gradients]
    }
    const index = Math.floor(Math.random() * remainingGradients.length);
    return remainingGradients.splice(index, 1)[0];
  }

  return (
    <>
      <BackButton />
      {loading ? <LoadingState/> : (
        <div className={styles.content}>
          <h1 className={styles.title}>{currentSubject?.label}</h1>
          <div className={styles.training_classes}>
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