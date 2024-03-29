'use client';
import BackButton from "@/components/BackButton";
import {useEffect, useRef, useState} from "react";
import type {ILesson} from "@/interfaces/lesson.interface";
import styles from '@/styles/Video.module.css'
import fade_in from '@/styles/FadeIn.module.css';
import Link from "next/link";
import useLessons from "@/hooks/useLessons";
import useLesson from "@/hooks/useLesson";

export default function Page({ params }: { params: { name: string, class: string, id: string } }) {
  const { data: currentLesson } = useLesson(params.id)
  const [showContinueButton, setShowContinueButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateButtonVisibility = () => {
        const timeRemaining = video.duration - video.currentTime;
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
  }, []);

  return (
    <>
      <BackButton />
      <div className={styles.content}>
        <h1 className={styles.title}>{currentLesson?.title}</h1>
        <video playsInline controls autoPlay className={styles.frame} ref={videoRef}>
          {currentLesson && <source src={"/shorts/" + currentLesson?.video} type="video/mp4" />}
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