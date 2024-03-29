'use client';
import BackButton from "@/components/BackButton";
import {LoadingState} from "@/components/TmaSDKLoader";
import styles from '@/styles/Subject.module.css'
import Link from "next/link";
import {getRandomGradient} from "@/lib/utils";
import fade_in from "@/styles/FadeIn.module.css";
import useSubjectClasses from "@/hooks/useClasses";

export default function Page({ params }: { params: { name: string } }) {
  const { data, isLoading } = useSubjectClasses(params.name)

  return (
    <>
      <BackButton />
      {isLoading ? <LoadingState/> : (
        <div className={styles.content}>
          <h1 className={styles.title}>{data?.label}</h1>
          <div className={styles.training_classes + " " + fade_in.style}>
            {data?.classes.map((trainingClass, index) =>
                <Link
                  key={index}
                  href={`/subject/${params.name}/${trainingClass}`}
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