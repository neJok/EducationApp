'use client';
import {useBackButton} from "@tma.js/sdk-react";
import {useEffect} from "react";

export default function BackButton() {
  const backButton = useBackButton();
  backButton.show()

  useEffect(() => {
    const onBackButtonClick = () => window.history.back();
    backButton.on('click', onBackButtonClick);

    return () => {
      backButton.off('click', onBackButtonClick);
    };
  }, []);

  return null
}