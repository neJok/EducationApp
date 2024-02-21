import styles from "@/styles/Points.module.css";
import {useAppSelector} from "@/lib/hooks";
import {selectUserState} from "@/lib/Features/User/userSlice";
import Loading from "@/components/Loading";

export default function Points() {
  const state = useAppSelector(selectUserState)

  return (
    <>
      <h1 className={styles.greeting}>Привет,
        {state.loading?
          <Loading width={50} height={40} /> :
          <div>{state.user.first_name}</div>
        }!
      </h1>
      <div className={styles.points}>
          <div>
            {state.loading?
              <Loading width={50} height={40} /> :
              <h1>{state.user.points}</h1>
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