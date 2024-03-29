'use client';
import React, {useEffect, useState} from "react";
import styles from '@/styles/Test.module.css';
import {useInitDataRaw} from "@tma.js/sdk-react";
import Test from "@/components/Test";
import {type IAnswers} from "@/interfaces/answers.interface";
import {ITestResult} from "@/interfaces/testResult.interface";
import Result from "@/components/Result";
import testsService from "@/services/tests.service";
import {useUser} from "@/hooks/useUser";
import useLesson from "@/hooks/useLesson";


export default function Page({ params }: { params: { name: string, class: number, id: string } }) {
  const { data: lesson } = useLesson(params.id)
  const { refetch: refetchUser } = useUser()
  const initData = useInitDataRaw()

  const [questionID, setQuestionID] = useState<number>(0)
  const [questionAnswers, setQuestionAnswers] = useState<number[]>([])
  const [answers, setAnswers] = useState<IAnswers>({})
  const [loadingResult, setLoadingResult] = useState<boolean>(false)
  const [result, setResult] = useState<ITestResult | undefined>(undefined)

  const handleNext = async () => {
    let newAnswers = answers
    newAnswers[questionID] = questionAnswers
    setAnswers(newAnswers)
    if (questionID + 1 === lesson?.test?.length) {
      setLoadingResult(true)
      const data = (await testsService.sendResults(lesson.lesson_id, newAnswers, initData)).data
      await refetchUser()
      setResult(data)

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