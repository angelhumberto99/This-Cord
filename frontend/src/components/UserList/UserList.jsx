import React from 'react'
import styles from './UserList.module.scss'

const UserList = ({server}) => {
  return (
    <div className={styles.container}>
      <p>
        {server}
      </p>
    </div>
  )
}

export default UserList