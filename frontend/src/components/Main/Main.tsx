import React, { useEffect } from 'react'
import MainInfo from './MainInfo'
import MainSearchComplex from './MainSearchComplex'
import { userStore } from '../../store/accountStore'

const Main = () => {

  const {user} = userStore()

  useEffect(() => { 
     console.log(user)
  }, [user])

  return (
    <div>
        <MainInfo/>
        <MainSearchComplex/>
    </div>
  )
}

export default Main
