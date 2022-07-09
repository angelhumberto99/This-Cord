import { useSocket } from '../../hooks'
import styles from './UserList.module.scss'
import { TiMicrophone } from 'react-icons/ti'
import { MdHeadphones } from 'react-icons/md'
import { RiSettings3Fill } from 'react-icons/ri'

const UserList = ({server, user}) => {
  const { id } = useSocket()

  const copy = () => {
    navigator.clipboard.writeText(id)
  }

  return (
    <div className={styles.container}>
      <h3>
        {server}
      </h3>
      <div className={styles.userInfo}>
        <div className={styles.img}>
          <span>{user[0]}</span>
        </div>
        <div>
          <div className={styles.wrapper}>
            <div className={styles.copyId} onClick={copy}>
              <p>{user}</p>
              <p className={styles.id}>#{id}</p>
            </div>
            <div className={styles.iconsWrapper}>
              <div className={styles.iconWrapper}>
                <TiMicrophone className={styles.icon}/>
              </div>
              <div className={styles.iconWrapper}>
                <MdHeadphones className={styles.icon}/>
              </div>
              <div className={styles.iconWrapper}>
                <RiSettings3Fill className={styles.icon}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList