import styles from "@/styles/Points.module.css";
import Loading from "@/components/Loading";
import useUser from "@/hooks/useUser";

export default function Points() {
  const {user, loading} = useUser()

  return (
    <>
      <h1 className={styles.greeting}>Привет,
        {loading?
          <Loading width={50} height={40} /> :
          <div>{user?.first_name}</div>
        }!
      </h1>
      <div className={styles.points}>
          <div>
            {loading?
              <Loading width={50} height={40} /> :
              <h1>{user?.points}</h1>
            }
            <span>Points</span>
          </div>
          <span>
              Смотрите обучающие видео,
              <br />
              чтобы получать очки
          </span>
      </div>
    </>
  )
}