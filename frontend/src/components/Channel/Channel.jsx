import styles from './Channel.module.scss'
import { BiHash } from 'react-icons/bi'

const Channel = ({ children, active }) => {
  return (
    <li className={styles.container}>
      <button className={`${styles.channelBtn} ${active && styles.active}`}>
        <BiHash className={styles.icon}/>
        { children }
      </button>
    </li>
  )
}

export default Channel