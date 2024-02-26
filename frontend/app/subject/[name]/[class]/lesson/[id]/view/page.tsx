'use client';
import BackButton from "@/components/BackButton";
import useSubjects from "@/hooks/useSubjects";
import {useEffect, useRef, useState} from "react";
import type Subject from "@/lib/Models/subject";
import {notFound} from "next/navigation";
import type Lesson from "@/lib/Models/lesson";
import styles from '@/styles/Video.module.css'
import fade_in from '@/styles/FadeIn.module.css';
import Link from "next/link";

export default function Page({ params }: { params: { name: string, class: number, id: string } }) {
  const { subjects } = useSubjects();
  const [lesson, setLesson] = useState<Lesson | undefined>(
    undefined
  );
  const [showContinueButton, setShowContinueButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    if (subjects.length !== 0) {
      const subject = subjects.find((subject: Subject) => subject.key === params.name);
      const currentLesson = subject?.lessons[params.class].find((lesson: Lesson) => lesson.lesson_id === params.id)
      if (!currentLesson) {
        notFound()
      }
      setLesson(currentLesson);
    }
  }, [params.name, subjects]);

  useEffect(() => {
    const video = videoRef.current;
    console.log(video)
    if (video) {
      const updateButtonVisibility = () => {
        const timeRemaining = video.duration - video.currentTime;
        console.log(timeRemaining)
        if (timeRemaining <= 5) {
          setShowContinueButton(true);
        } else {
          setShowContinueButton(false);
        }
      };
      video.addEventListener("timeupdate", updateButtonVisibility);
      return () => {
        video.removeEventListener("timeupdate", updateButtonVisibility);
      };
    }
  }, [videoRef.current]);

  return (
    <>
      <BackButton />
      <div className={styles.content}>
        <h1 className={styles.title}>{lesson?.title}</h1>
        <video playsInline controls autoPlay className={styles.frame} ref={videoRef}>
          {lesson && <source src={"/shorts/" + lesson?.video} type="video/mp4" />}
        </video>
        {showContinueButton && (
          <Link href={`/subject/${params.name}/${params.class}/lesson/${params.id}/test`} className={styles.next + " " + fade_in.style}>
            Продолжить
          </Link>
        )}
      </div>
    </>
  )
}