import { Certificate } from './certificate';
import { Tag } from './tag';

export interface CertificatesData {
  certificates: Certificate[];
}

export interface TagsData {
  tags: Tag[];
}

export interface JwtToken {
  userId: string;
}
