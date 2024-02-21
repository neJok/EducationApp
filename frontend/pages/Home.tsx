'use client';
import GetUser from "@/components/GetUser";
import Top from "@/components/Top";
import styles from '@/styles/Main.module.css'
import Points from "@/components/Points";
import React from "react";
import {useViewport} from "@tma.js/sdk-react";

function Expand() {
  const viewport = useViewport()
  return null
}


export default function HomePage(
  {
    children,
  }: {
    children: React.ReactNode
  }
) {

  // const viewport = useViewport()
  // viewport.expand()

  return (
    <>
      <GetUser />
      <Expand />
      <div className={styles.page_layout}>
        <div className={styles.page_inner}>
          <Points />
          {children}
          <Top />
        </div>
      </div>
    </>
  );
}
