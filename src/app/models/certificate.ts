import { Tag } from './tag'

export class Certificate {
  id: string;
  name: string;
  description: string;
  price: number;
  creationDate: Date;
  durationInDays: number;
  tags: Tag[]
}
