import { Tag } from './tag'

export class Certificate {
  id: string;
  name: string;
  price: number;
  durationInDays: number;
  creationDate: Date;
  description: string;
  tags: Tag[];
  deleted: boolean;
  _links: any;
}
