import { Certificate } from './certificate';
import { Order } from './order';
import { Tag } from './tag';

export interface CertificatesData {
  certificates: Certificate[];
}

export interface OrdersData {
  orders: Order[];
}

export interface TagsData {
  tags: Tag[];
}

export interface JwtToken {
  userId: string;
}
