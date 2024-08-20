import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button, user} from "@nextui-org/react";
import { SearchingRivalTeamTtype } from '../../types/Teams';


interface Props { 
    data: SearchingRivalTeamTtype[] | []
}

const TeamCard = ({data}: Props) => {
  return (
    <div>
       {data.length > 0 ? 
          data.map((data: SearchingRivalTeamTtype) => ( 
            <div>
                   <Card isFooterBlurred className="w-1/4 h-[300px] col-span-12 sm:col-span-5">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">                   
                        <h4 className="text-black font-medium text-2xl">{data.teamData.name}</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src="https://nextui.org/images/card-example-6.jpeg"
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <p className="text-black text-tiny">{data.teamData.phone}</p>
                            <p className="text-black text-tiny">{data.teamData.creatorData.name}</p>
                        </div>
                        <Button className="text-tiny" color="primary" radius="full" size="sm">
                           Contactar
                        </Button>
                    </CardFooter>
                    </Card>
            </div>
          ))
       : null}
    </div>
  )
}

export default TeamCard
