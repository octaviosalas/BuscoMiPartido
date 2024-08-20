interface Admin {
    name: string;
  }
  
interface ComplexImage {
    url: string;
  }
  
export  interface ComplexType {
    id: number;
    name: string;
    location: string;
    province: string;
    address: string;
    phone: string;
    shiftPrice: number;
    numberOfCourts: number;
    admin: Admin;
    adminId: number;
    complexImages: ComplexImage[];
    createdAt: string; // Considera usar Date para manejar fechas
    updatedAt: string; // Considera usar Date para manejar fechas
  }