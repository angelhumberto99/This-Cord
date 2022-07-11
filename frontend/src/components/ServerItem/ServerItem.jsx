import styles from './ServerItem.module.scss'
import { SiDiscord } from 'react-icons/si'
import { MdAdd } from 'react-icons/md'
import { IoCompassSharp } from 'react-icons/io5'

const ServerItem = ({element, callback, active}) => {
  const renderIcon = () => {
    switch (element) {
      case 'discord':
        return <SiDiscord className={styles.icon}/>
      case 'new':
        return <MdAdd className={`${styles.icon} ${styles.itemOP}`}/>
      case 'compass':
        return <IoCompassSharp className={`${styles.icon} ${styles.itemOP}`}/>
      default:
        return <p>{element.slice(0,4)}</p>
    }
  }

  active = active === element

  return (
    <div className={[`${styles.item} ${active && styles.active}`]} 
      onClick={() => callback(element)}>
      { renderIcon() }
    </div>
  )
}

export default ServerItem;
