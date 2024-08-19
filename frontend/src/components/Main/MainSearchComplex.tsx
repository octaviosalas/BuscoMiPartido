import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingComponent from '../spinner/Spinner'
import { MunicipiesType } from '../../types/LocationsAndMunicipiesTypes'


const MainSearchComplex = () => {

    const [locationValue, setLocationValue] = useState<string>("")
    const [municipalities, setMunicipalities] = useState<[]>([])
    const [failedSearch, setFailedSearch] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)

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

 
  return (
    <div className='w-screen h-[450px] ' style={{ 
        backgroundImage: "url('https://i.pinimg.com/originals/ca/72/20/ca7220650e2f93ce42890c645c8296d5.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
        <div className='flex flex-col items-center justify-center'>
            <div className='mt-24'>
               <h2 className='text-white font-medium text-2xl'>¿Donde deseas jugar?</h2>
            </div>
            <div className='flex flex-col items-center justify-center mt-6'>
               <Input type="text" placeholder='Escribe tu provincia..' className='w-auto lg:w-72 xl:w-96 h-12 rounded-lg' value={locationValue} onChange={(e) => setLocationValue(e.target.value)}/>

               {locationValue.length > 0 && !load && municipalities.length === 0 && !failedSearch?
                    <Button className='w-auto lg:w-72 xl:w-96 text-white bg-green-700 font-medium' onClick={() => searchLocation(locationValue)}>
                        Buscar Complejos
                    </Button> 
                    : 
                    null
                }

               {load ? <LoadingComponent/> : null}

              {!load && municipalities.length > 0 && !failedSearch? 
                <Select placeholder='Municipios' className='w-auto lg:w-72 xl:w-96'>
                    {municipalities.map((mun) => (
                            <SelectItem key={mun}>{mun}</SelectItem>
                        ))}
               </Select> : null}

               {failedSearch && locationValue.length > 0 ? <p className=' mt-4 bg-red-600 text-white w-72 text-center'>No hay nada</p> : null}

                {locationValue.length > 0 && municipalities.length > 0 && !failedSearch ? 
                    <Button className='mt-4 w-auto lg:w-72 xl:w-96 text-white bg-green-700 font-medium'>
                        Realizar Busqueda
                    </Button> 
                  :
                 null}

            </div>
        </div>
        
    </div>
  )
}

export default MainSearchComplex
