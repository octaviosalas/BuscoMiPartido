type centerType = { 
   lat: number,
   lot: number
}

type provinceType = { 
    id: string,
    nomber: string
}

export type MunicipiesType = { 
   centroide: centerType,
   id: string,
   nombre: string,
   provincia: provinceType
}