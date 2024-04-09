import styles from '@/styles/Top.module.css'
import fade_in from '@/styles/FadeIn.module.css'
import Avatar from "@/components/Avatar";
import useTop from "@/hooks/useTop";

export default function Top() {
  const { data: users } = useTop()

  return (
    <>
      <h2 className={styles.title}>Топ 10 пользователей</h2>
      <h2 className={styles.description}>Обновляется каждые 10 секунд</h2>
      <ul className={styles.users + " " + fade_in.style} >
        {users?.map((user, index) =>
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