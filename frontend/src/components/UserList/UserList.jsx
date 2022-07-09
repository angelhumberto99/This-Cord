import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import styles from './UserList.module.scss'
const ENDPOINT = "http://localhost:4000"

const UserList = ({server, user}) => {
  const [id, setId] = useState("")
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io(ENDPOINT))
  }, [])

  useEffect(() => {
    if (socket != null) {
      socket.on('connect', () => {
        setId(socket.id)
      })
    }
  }, [socket])

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
          <p>{user}</p>
          <div className={styles.copyId} onClick={copy}>
            <p>#{id.slice(0,4)}...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList