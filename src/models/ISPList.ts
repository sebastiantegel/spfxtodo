export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export interface ITodoItem {
  Id: number;
  Title: string;
  Complete: boolean;
}
