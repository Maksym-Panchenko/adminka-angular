import { Injectable } from '@angular/core';
import {IAlbum} from "@models/interfaces/album.interface";
import {ApiBaseAbstractService} from "../../../misc/abstracts/api-base.abstract.service";

@Injectable({
  providedIn: 'root'
})
export class AlbumApiService extends ApiBaseAbstractService<IAlbum>{
  readonly entityUrl: string = 'albums';
  readonly parentEntityUrl: string = 'users';

}
