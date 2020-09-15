import { Certificate } from './certificate';
import { Order } from './order';
import { Tag } from './tag';

export type CertificatesData = {
  certificates: Certificate[];
};

export type OrdersData = {
  orders: Order[];
};

export type TagsData = {
  tags: Tag[];
};

export type JwtToken = {
  userId: string;
};
