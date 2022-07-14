import styles from './Channel.module.scss'

const Channel = ({children, active}) => {
  return (
    <div className={`${styles.container} ${active && styles.active}`}>
        <p>{children}</p>
    </div>
  )
}

export default Channel