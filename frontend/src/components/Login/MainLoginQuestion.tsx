import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MunicipiesType } from '../../types/LocationsAndMunicipiesTypes'
import { userStore } from '../../store/accountStore'
import { useNavigate } from 'react-router-dom'

const MainLoginQuestion = () => {

    const [withOutAccount, setWithOutAccount] = useState<boolean>(false)
    const [locationValue, setLocationValue] = useState<string>("")
    const [municipalities, setMunicipalities] = useState<[]>([])
    const [municipalitieSelected, setMunicipalitieSelected] = useState<string>("")
    const [failedSearch, setFailedSearch] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)

    const navigate = useNavigate()
    const {setUserAccountData} = userStore()

    const searchLocation = async (locationValue : string) => { 
            setLoad(true)
            try {
                const {data} = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${locationValue}&max=200`)
                if(data.municipios.length === 0) { 
                    setFailedSearch(true)
                    setLoad(false)
                } else { 
                    setMunicipalities(data.municipios.map((m : MunicipiesType) => m.nombre).sort())     
                    setLoad(false)
                    setFailedSearch(false)
                }
            
            } catch (error) {
                console.log(error)
            }
    }

    useEffect(() => { 
       if(locationValue.length === 0) { 
        setFailedSearch(false)
        setMunicipalities([])
        setLocationValue("")
       }
    }, [locationValue])

    const confirmData = () => { 
        console.log({ 
            id: null,
            location: municipalitieSelected,
            province: locationValue 
        })
        setUserAccountData({ 
            id: null,
            location: municipalitieSelected,
            province: locationValue
        })
        navigate("/main")
    }

  return (
    <div className='mt-24 flex flex-col items-center justify-center'>
        <div className='flex flex-col lg:flex-row lg:gap-12 2xl:gap-16'>
            <Button className='mt-4 lg:mt-0'onClick={() => setWithOutAccount(!withOutAccount)}>Entrar sin cuenta</Button>
            <Button className='mt-4 lg:mt-0'>Entrar con cuenta de usuario</Button>
            <Button className='mt-4 lg:mt-0'>Entrar como administrador</Button>
        </div>
        {withOutAccount ? 
            <div className='flex flex-col mt-4'>
              <Input placeholder='Escribe tu Provincia' type="text" value={locationValue} className='border rounded-lg w-auto lg:w-72 2xl:w-96' onChange={(e) => setLocationValue(e.target.value)} />

                {locationValue.length > 0 && !load && municipalities.length === 0 && !failedSearch?
                    <Button className='mt-2 w-auto lg:w-72 xl:w-96 text-white bg-green-700 font-medium' onClick={() => searchLocation(locationValue)}>
                        Continuar
                    </Button>
                : null}

                {!load && municipalities.length > 0 && !failedSearch? 
                     <Select placeholder='Municipios' className='border rounded-lg w-auto mt-4 lg:w-72 xl:w-96' onChange={(e) => setMunicipalitieSelected(e.target.value)}>
                        {municipalities.map((mun) => (
                                <SelectItem key={mun} value={mun}>{mun}</SelectItem>
                            ))}
                     </Select> 
                : null}

                {failedSearch && locationValue.length > 0 ? 
                    <p className=' mt-4 bg-red-600 text-white w-72 text-center'>No hay nada</p> 
                    : 
                 null
                }

                {locationValue.length > 0 && municipalities.length > 0 && !failedSearch ? 
                    <Button className='mt-4 w-auto lg:w-72 xl:w-96 text-white bg-green-700 font-medium' onClick={() => confirmData()}>
                        Confirmar Ubicacion
                    </Button> 
                  :
                 null}

            </div> 
            :
            null
        }
    </div>
  )
}

export default MainLoginQuestion
