import { ComplexType } from '../../types/ComplexTypes'
import ComplexCardData from '../Complex/ComplexCardData'

interface Props { 
    complexes: ComplexType[] | []
}

const MainComplexRecomendationsByLocation = ({complexes}: Props) => {

  return (
    <div className='w-screen'>
         <div className='flex flex-col'>
                  <div className='ml-2 mt-4 flex justify-start items-start'>
                      <h1 className='text-black font-medium text-md'>Complejos en tu localidad</h1>
                  </div>
                  <div className='mt-2'>
                     <ComplexCardData complexData={complexes}/>
                  </div>
         </div>
    </div>
  )
}

export default MainComplexRecomendationsByLocation
