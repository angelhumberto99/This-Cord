import styles from './Channel.module.scss'

const Channel = ({children, active}) => {
  return (
    <li className={`${styles.container} ${active && styles.active}`}>
        <p>{children}</p>
    </li>
  )
}

export default Channel