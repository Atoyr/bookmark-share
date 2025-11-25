export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Bookmark {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: Tag[];
  createdAt?: Date;
  updatedAt?: Date;
}
