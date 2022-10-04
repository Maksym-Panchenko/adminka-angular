import { Injectable } from '@angular/core';
import { ApiBaseAbstractService } from '@misc/abstracts/api-base.abstract.service';
import { IPhoto } from '@models/interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoApiService extends ApiBaseAbstractService<IPhoto> {
  readonly entityUrl: string = 'photos';
  readonly parentEntityUrl: string = 'albums';
}
