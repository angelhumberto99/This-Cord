import React from 'react'
import styles from './Dialog.module.scss'
import { GrClose } from 'react-icons/gr'

const Dialog = ({close, children}) => {
  return (
    <div className={styles.container} onMouseDown={close}>
        <div className={styles.card} 
          onMouseDown={(e) => e.stopPropagation()}>
            <GrClose className={styles.close}
            onClick={close}/>
            {
                children
            }
        </div>
    </div>
  )
}

export default Dialog