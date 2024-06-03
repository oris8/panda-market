interface Item {
  createdAt: Date;
  favoriteCount: number;
  ownerId: string;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: string;
  isFavorite: boolean;
}

interface ItemForPost {
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
}
