import { SiDiscord } from 'react-icons/si'
import { MdAdd } from 'react-icons/md'
import { IoCompassSharp } from 'react-icons/io5'
import styles from './ServerItem.module.scss'

const ServerItem = ({ element, callback, active }) => {
  const renderIcon = () => {
    switch (element) {
      case '$<Inicio>$':
        return <SiDiscord className={styles.icon}/>
      case '$<Añadir un servidor>$':
        return <MdAdd className={`${styles.icon} ${styles.itemOP}`}/>
      case '$<Explora servidores>$':
        return <IoCompassSharp className={`${styles.icon} ${styles.itemOP}`}/>
      default:
        return <p>{element.slice(0,4)}</p>
    }
  }

  active = active === element

  return (
    <li className={[`${styles.item} ${active && styles.active}`]} 
      onClick={() => callback(element)}>
      { renderIcon() }
    </li>
  )
}

export default ServerItem;
