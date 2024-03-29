import styles from "@/styles/Test.module.css";
import Checkbox from "@/components/Checkbox";
import React, {type SetStateAction, useEffect} from "react";
import type {ILesson} from "@/interfaces/lesson.interface";
import {useBackButton} from "@tma.js/sdk-react";
import {type IAnswers} from "@/interfaces/answers.interface";

interface TestProps {
  lesson: ILesson;
  questionID: number;
  questionAnswers: number[];
  handleNext: () => void;
  setQuestionAnswers: React.Dispatch<SetStateAction<number[]>>;
  answers: IAnswers;
  setAnswers: React.Dispatch<SetStateAction<IAnswers>>;
  setQuestionID: React.Dispatch<SetStateAction<number>>;
}

export default function Test({
  lesson,
  questionID,
  questionAnswers,
  handleNext,
  setQuestionAnswers,
  answers,
  setAnswers,
  setQuestionID
}: TestProps) {
  const backButton = useBackButton();
  backButton.show()

  useEffect(() => {
    const onBackButtonClick = () => {
      if (questionID === 0) {
        window.history.back()
      } else {
        let newAnswers = answers
        newAnswers[questionID] = questionAnswers
        setAnswers(newAnswers)
        setQuestionAnswers(answers[questionID - 1] || [])
        setQuestionID(prevState => prevState - 1)
      }

    };
    backButton.on('click', onBackButtonClick);

    return () => {
      backButton.off('click', onBackButtonClick);
    };
  }, [backButton, questionID, answers, questionAnswers, setAnswers, setQuestionAnswers, setQuestionID]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      if (lesson?.test && lesson.test[questionID].type === 'multiply') {
        setQuestionAnswers(prevAnswers => [...prevAnswers, index]);
      } else {
        setQuestionAnswers([index])
      }
    } else {
      setQuestionAnswers(prevAnswers => prevAnswers.filter(id => id !== index));
    }
  };

  return (
    <>
      <h1 className={styles.title}>{lesson?.title} {questionID + 1}/{lesson?.test?.length}</h1>
      <div className={styles.inner}>
        <h2 className={styles.subject}>{lesson?.test &&lesson.test[questionID].subject}</h2>
        {lesson?.test && lesson.test[questionID].variants.map((variant, index) =>
          <div className={styles.variant} key={index}>
            <input
              onChange={(event) => handleCheckboxChange(event, index)}
              type={lesson?.test && lesson.test[questionID].type === 'multiply'? "checkbox" : "radio"}
              id={`variant-${index}-${questionID}`}
              name={lesson?.test && lesson.test[questionID].type === 'multiply' ? 'variants' : 'variant'}
              className={styles.check}
            />
            <label htmlFor={`variant-${index}-${questionID}`} className={styles.label}>
              <Checkbox checked={questionAnswers.includes(index)} />
              <span>{variant}</span>
            </label>
          </div>
        )}
        <div onClick={handleNext} className={styles.next}>
          {questionID + 1 === lesson?.test?.length? 'Завершить' : 'Дальше'}
        </div>
      </div>
    </>
  )
}