interface Player {
    id: number;
    teamId: number;
    name: string;
    age: number;
    createdAt?: Date; 
    updatedAt?: Date;
  }
  
  interface Team {
    id: number;
    name: string;
    location: string;
    userOwner: number;
    createdAt?: string; 
    updatedAt?: string; 
    players: Player[];
  }

export const calculateTeamAverage = (team : Team) => { 
    if(team.players.length > 0) { 
        const ages = team.players.reduce((acc, el) => acc + el.age, 0)
        const average = ages /  team.players.length
        return average
    } else { 
        return null
    }
}