import React, { useEffect, useState } from 'react'
import { userStore } from '../../store/accountStore'
import apiBackendUrl from '../../utils/axios'
import { SearchingRivalTeamTtype } from '../../types/Teams'
import TeamCard from '../Teams/TeamCard'

const MainTeamsSearchingForRival = () => {

    const {user} = userStore()
    const [someTeamsData, setSomeTeamsData] = useState<SearchingRivalTeamTtype[] | []>([])

    const getTeams = async () => { 
        try {
            const {data, status} = await apiBackendUrl.get(`/team/teamsLookingForRivalByLocation/${user?.location}`)
            console.log(status)
            if(status === 200) { 
                setSomeTeamsData(data)
                console.log("buscando rivales en la plata", data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
        getTeams()
    }, [])

  return (
    <div className='mt-4'>
         <div className='ml-4'>
             <h3>Equipos buscando rival en tu localidad</h3>
         </div>
         <div>
             <TeamCard data={someTeamsData}/>
         </div>
    </div>
  )
}

export default MainTeamsSearchingForRival
