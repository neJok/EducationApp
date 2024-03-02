'use client';
import React, {useEffect, useState} from "react";
import type Subject from "@/lib/Models/subject";
import type Lesson from "@/lib/Models/lesson";
import {notFound} from "next/navigation";
import useSubjects from "@/hooks/useSubjects";
import styles from '@/styles/Test.module.css';
import {useInitDataRaw} from "@tma.js/sdk-react";
import Test from "@/components/Test";
import {sendAnswers} from "@/lib/utils";
import {type Answers} from "@/lib/Models/answers";
import {TestResult} from "@/lib/Models/testResult";
import Result from "@/components/Result";
import {addTest, incPoints} from "@/lib/Features/User/userSlice";
import {useDispatch} from "react-redux";


export default function Page({ params }: { params: { name: string, class: number, id: string } }) {
  const { subjects } = useSubjects()
  const initData = useInitDataRaw()
  const dispatch = useDispatch()

  const [questionID, setQuestionID] = useState<number>(0)
  const [questionAnswers, setQuestionAnswers] = useState<number[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
  const [loadingResult, setLoadingResult] = useState<boolean>(false)
  const [result, setResult] = useState<TestResult | undefined>(undefined)

  useEffect(() => {
    if (subjects.length !== 0) {
      const subject = subjects.find((subject: Subject) => subject.key === params.name);
      const currentLesson = subject?.lessons[params.class].find((lesson: Lesson) => lesson.lesson_id === params.id)
      if (!currentLesson) {
        notFound()
      }
      setLesson(currentLesson);
    }
  }, [params.name, subjects, params.class, params.id]);

  const handleNext = async () => {
    let newAnswers = answers
    newAnswers[questionID] = questionAnswers
    setAnswers(newAnswers)
    if (questionID + 1 === lesson?.test.length) {
      setLoadingResult(true)
      const data: TestResult = await sendAnswers(lesson.lesson_id, newAnswers, initData)
      setResult(data)
      dispatch(incPoints(data.points))
      dispatch(addTest(lesson.lesson_id))
      setLoadingResult(false)
    } else {
      setAnswers(newAnswers)
      setQuestionAnswers(answers[questionID + 1] || [])
      setQuestionID(prevState => prevState + 1)
    }
  }

  return (
    <div className={styles.content}>
      {(lesson && !result && !loadingResult) &&
        <Test
          lesson={lesson}
          questionID={questionID}
          questionAnswers={questionAnswers}
          handleNext={handleNext}
          setQuestionAnswers={setQuestionAnswers}
          answers={answers}
          setAnswers={setAnswers}
          setQuestionID={setQuestionID}
        />
      }
      {loadingResult &&
        <h1 className={styles.title}>Загрузка результатов...</h1>
      }
      {(result && !loadingResult) &&
        <Result correct_answers={result.correct_answers} points={result.points} />
      }
    </div>
  )
}