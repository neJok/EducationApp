'use client';
import Subjects from "@/components/Subjects";
import styles from "@/styles/Main.module.css";
import Points from "@/components/Points";
import Top from "@/components/Top";
import {useBackButton} from "@tma.js/sdk-react";

export default function Page() {
  const backButton = useBackButton();
  if (backButton.isVisible) {
    backButton.hide()
  }

  return (
    <div className={styles.page_layout}>
      <div className={styles.page_inner}>
        <Points />
        <Subjects />
        <Top />
      </div>
    </div>
  );
}
