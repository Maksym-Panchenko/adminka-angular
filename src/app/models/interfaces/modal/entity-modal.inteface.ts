import {IPost} from "@models/interfaces/post.interface";
import {IAlbum} from "@models/interfaces/album.interface";
import {ITodo} from "@models/interfaces/todo.interface";
import {EntityModalType} from "@models/enums/entity-modal-type";

export interface IEntityModal {
  title: string;
  entityType: EntityModalType;
  message?: string;
  post?: IPost;
  album?: IAlbum;
  todo?: ITodo;
  albumId?: number;
  buttonsNames?: {
    approve?: string;
    decline?: string;
  };
}
