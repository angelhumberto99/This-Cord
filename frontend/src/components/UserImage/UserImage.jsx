import { capitalize, getTextColor } from '@/utils'
import stc from 'string-to-color'
import styles from './UserImage.module.scss'

const UserImage = ({ user, styling }) => {
  const color = stc(user[0].toUpperCase())
  const bgColor = { backgroundColor: color }
  const fontColor = { color: getTextColor(color)}
  
  return (
    <div className={`${styles.userImg} ${styling}`} 
      style={bgColor}>
        <span style={fontColor}>
          { capitalize(user).slice(0,2) }
        </span>
    </div>
  )
}

export default UserImage
