export interface Tag {
  id: string;
  name: string;
  color: string;
  updatedAt?: Date;
}

export interface CreateOrUpdateTag {
  id?: string;
  name: string;
  color: string;
  updatedAt?: Date;
}
