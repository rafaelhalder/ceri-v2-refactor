
  interface EventInformation {
    dateTime: string;
    disabled: boolean | string;
    local: string;
    title: string;
  }
  
  export interface Event extends EventInformation {
    id: string;
  }