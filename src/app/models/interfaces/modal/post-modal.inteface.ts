import {IPost} from "@models/interfaces/post.interface";

export interface IPostModal {
  title?: string;
  message?: string;
  post?: IPost;
  buttonsNames?: {
    approve?: string;
    decline?: string;
  };
}
