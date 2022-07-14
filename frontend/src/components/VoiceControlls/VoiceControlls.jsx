import React from 'react'
import styles from './VoiceControlls.module.scss'
import { TiMicrophone } from 'react-icons/ti'
import { MdHeadphones } from 'react-icons/md'
import { RiSettings3Fill } from 'react-icons/ri'

const VoiceControlls = () => {
  return (
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
  )
}

export default VoiceControlls