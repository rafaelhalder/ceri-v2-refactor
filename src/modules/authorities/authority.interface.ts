interface CellNumber {
    cellNumber: string;
  }
  
  interface ChairPerson {
    chairPerson: string;
    chainPersonCellNumber: string;
  }
  
  interface ContactInformation {
    city: string;
    country: string;
    displayName: string;
    email: string;
    name: string;
    party: string;
    phoneNumber: string;
    role: string;
    state: string;
    status: string;
    whatsAppOn: boolean;
    disabled: boolean | string;
  }
  
  export interface Authority extends CellNumber, ChairPerson, ContactInformation {
    id: string;
  }