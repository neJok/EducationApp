import styles from '@/styles/Loading.module.css';

export default function Loading({width, height, className}: {height: number, width?: number | string, className?: string}) {
  return (
    <div
      style={{
        width: width,
        height: height - (height * 0.3),
        borderRadius: 10,
        backgroundColor: "#7E7E7E",
      }}
      className={styles.pulsating + " " + className}
    />
  )
}