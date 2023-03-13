
  interface EventInformation {
    dateTime: string;
    disabled: boolean;
    local: string;
    title: string;
  }
  
  export interface Event extends EventInformation {
    id: string;
  }