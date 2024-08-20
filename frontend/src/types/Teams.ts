interface creatorDataType { 
    createdAt: string
    email: string
    id: number
    name: string
    password: string
    updatedAt: string
}

interface teamData { 
    admin: number | null,
    createdAt: string,
    id: number,
    location: string,
    name:string,
    phone:string,
    updatedAt:string,
    userOwner:number,
    creatorData: creatorDataType
}

export interface SearchingRivalTeamTtype { 
    createdAt: string,
    dateTime: string,
    id: number
    location: string,
    teamId: number,
    updatedAt: string,
    teamData: teamData
}