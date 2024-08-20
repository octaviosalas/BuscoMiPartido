import  { useEffect, useState } from 'react'
import MainInfo from './MainInfo'
import MainSearchComplex from './MainSearchComplex'
import { userStore } from '../../store/accountStore'
import apiBackendUrl from '../../utils/axios'
import MainComplexRecomendationsByLocation from './MainComplexRecomendationsByLocation'
import { ComplexType } from '../../types/ComplexTypes'
import MainTeamsSearchingForRival from './MainTeamsSearchingForRival'

const Main = () => {

  const [complexesOnLocation, setComplexesOnLocation] = useState<ComplexType[] | []>([])
  const {user} = userStore()

    useEffect(() => { 
      getComplexInUserLocations()
    }, [])

    const getComplexInUserLocations = async () => { 
      try {
         const {data, status} = await apiBackendUrl.get(`/complex/complexByLocation/${user?.location}`)
         if(status === 200) { 
          console.log(data)
          setComplexesOnLocation(data)
         }
      } catch (error) {
         console.log(error)
      }
    }

    useEffect(() => { 
      console.log("cambio user", user)
   }, [user])

  return (
    <div>
        <MainInfo/>
        <MainSearchComplex/>
        <MainComplexRecomendationsByLocation complexes={complexesOnLocation}/>
        <MainTeamsSearchingForRival/>
    </div>
  )
}

export default Main
