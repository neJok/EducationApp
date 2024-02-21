import styles from '@/styles/Top.module.css'
import {useEffect, useState} from "react";
import Avatar from "@/components/Avatar";

export default function Top() {
  interface User {
    first_name: string | null
    username: string | null
    points: number
  }

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/top/`, {method: "POST"}).then((res) => res.json().then((data) => setUsers(data)))
  }, []);

  return (
    <>
      <h2 className={styles.title}>Топ 10 пользователей</h2>
      <ul className={styles.users} >
        {users.map((user, index) =>
          <li key={index} className={styles.user}>
            <Avatar avatarURL={`https://t.me/i/userpic/320/${user.username}.jpg`} size={48} className={styles.avatar} />
            <div className={styles.user_info}>
              <label className={styles.first_name}>{user.first_name}</label>
              <p>{user.points}</p>
            </div>
            <span className={styles.place}>{index + 1}</span>
          </li>
        )}
      </ul>
    </>
  )
}