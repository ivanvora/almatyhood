import React from 'react'
import {Button,Input,Space,Row,Col} from 'antd';
import {BackwardOutlined} from '@ant-design/icons';
import { Plate } from '../../common/plate';
import {Logo} from '../../common/icons/logo'

import styles from './auth.module.css'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import("@/components/pages/map"), { ssr:false })
type Props = {}

export const Auth = (props: Props) => {
const router= useRouter()

  return (<>
  <Map layers=''/>
<div className={styles.page}>
       <Plate >
        <div className={styles.body}>
        <div className={styles.top}>
          <Logo colorRevert/>
          </div>
         <div className={styles.center}>
          <Input placeholder='логин' />
          <Input placeholder='пароль' />
         
          <Button onClick={()=>router.push('/map')}  block={true}>войти</Button>
         </div>
        </div>
          </Plate> 
</div></>

  )
}