import styles from "@/styles/Checkbox.module.css";

export default function Checkbox(props: {checked: boolean}) {
  return (
    <svg width="50" height="50" viewBox="0 0 100 100">
      <rect x="30" y="20" width="50" height="50" stroke="black" fill="none" />
      <g transform="translate(0,-952.36218)">
        <path d="m 13,983 c 33,6 40,26 55,48 " stroke="black" style={props.checked? {strokeDashoffset: 0} : {}} strokeWidth="3" className={styles.path1} fill="none" />
        <path d="M 75,970 C 51,981 34,1014 25,1031 " stroke="black" style={props.checked? {strokeDashoffset: 0} : {}} strokeWidth="3" className={styles.path1} fill="none" />
      </g>
    </svg>
  )
}