import React, { ReactNode } from 'react'
import styles from './plate.module.css'
type Props = {
    children:ReactNode
}

export const Plate = ({children}: Props) => {
  return (
    <div className={styles.body} >{children}</div>
  )
}