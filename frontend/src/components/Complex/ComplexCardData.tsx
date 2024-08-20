import {Card, CardHeader, CardBody, CardFooter, Image, Button, user} from "@nextui-org/react";
import { ComplexType } from "../../types/ComplexTypes";

interface Props { 
    complexData: ComplexType[] | []
}

const ComplexCardData = ({complexData}: Props) => {
  return (
    <div className="flex gap-4">
        {complexData.length > 0 ? 
          complexData.map((cc : ComplexType) => ( 
            <Card key={cc.id} isFooterBlurred className="w-1/4 h-[300px] col-span-12 sm:col-span-5">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                   <h4 className="bg-white text-black font-medium text-2xl">{cc.name}</h4>
                </CardHeader>
                <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={cc?.complexImages?.[0]?.url}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <p className="text-black text-tiny">{cc.location}.</p>
                    <p className="text-black text-tiny">Canchas: {cc.numberOfCourts}</p>
                    <p className="text-black text-tiny">Telefono: {cc.phone}</p>
                </div>
                <Button className="text-tiny" color="primary" radius="full" size="sm">
                    Informacion
                </Button>
                </CardFooter>
            </Card>
          ))
       : null }
    </div>
  )
}

export default ComplexCardData
