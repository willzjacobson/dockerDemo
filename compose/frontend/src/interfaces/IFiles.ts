export interface IFiles extends Array<IFile> {}

export interface ICategories extends Array<ICategory> {}

export interface IFile {
  categories: ICategory[];
  createdDate: string;
  filename: string;
  id: string;
}

export interface ICategory {
  _id: string;
  name: string;
  rootNode?: boolean;
  children: string[];
}
