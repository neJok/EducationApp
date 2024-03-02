import {type TestResult} from "@/lib/Models/testResult";
import {useBackButton} from "@tma.js/sdk-react";
import styles from '@/styles/Result.module.css'
import Happy from "@/components/Happy";
import React from "react";
import Link from "next/link";

export default function Result({correct_answers, points}: TestResult) {
  const backButton = useBackButton();
  backButton.hide()

  return (
    <>
      <h1 className={styles.title}>Результаты теста</h1>
      <div className={styles.inner}>
        {(points === 0 && correct_answers.length > 0)?
          <span className={styles.text}>Points выдаются только за первую попытку</span> :
          <span className={styles.text}>+{points} points</span>
        }
        <span className={styles.text}>Правильных ответов: {correct_answers.length}</span>
        <div className={styles.center}>
          <Happy />
          <Link href='/' className={styles.next}>
            На главную
          </Link>
        </div>
      </div>
    </>
  )
}