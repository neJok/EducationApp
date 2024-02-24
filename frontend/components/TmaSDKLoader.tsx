'use client';
import type { PropsWithChildren } from 'react';
import {SDKProvider, DisplayGate, useInitDataRaw} from '@tma.js/sdk-react';
import styles from "@/styles/Loader.module.css"

interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError({ error }: SDKProviderErrorProps) {
  return (
    <div>
      Oops. Something went wrong.
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className={styles.inner}>
      <div className={styles.load}>
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
}


export function TmaSDKLoader({ children }: PropsWithChildren) {
  return (
    <SDKProvider options={{ cssVars: true, acceptCustomStyles: true, async: true }}>
      <DisplayGate
        error={SDKProviderError}
        loading={LoadingState}
        initial={LoadingState}
      >
        {children}
      </DisplayGate>
    </SDKProvider>
  );
}
