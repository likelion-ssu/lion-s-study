export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type ArticleItemInput = {
  title: string;
  content: string;
  creatorId: string;
  creatorName: string;
  creatorYear: number;
};

export type ArticleItem = {
  id: string;
  title: string;
  content: string;
  creatorId: string;
  createdAt: any;
  creatorName: string;
  creatorYear: number;
  tags: string[];
};
