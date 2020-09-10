import { Certificate } from './certificate';
import { User } from "./user";

export class Order {
  id: string;
  cost: number;
  creationDate: Date;
  user: User;
  deleted: boolean;
  certificates: Certificate[];
}




