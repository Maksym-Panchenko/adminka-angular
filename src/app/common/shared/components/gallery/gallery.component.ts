import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InitDetail} from "lightgallery/lg-events";
import {LightGallery} from "lightgallery/lightgallery";
import lgZoom from 'lightgallery/plugins/zoom';
import {IPhoto} from "@models/interfaces/photo.interface";
import {ModeType} from "@models/enums/mode-type";

interface IGalleryPhoto {
  id: string;
  size: string;
  src: string;
  thumb: string;
  title?:string;
}

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges {
  @Output() removePhoto: EventEmitter<number> = new EventEmitter()
  @Input() photos: IPhoto[] = [];
  @Input() mode: ModeType = ModeType.view;
  readonly ModeType: typeof ModeType = ModeType;
  items: IGalleryPhoto[] = [];
  private _lightGallery!: LightGallery;

  settings = {
    counter: false,
    plugins: [lgZoom],
  };

  ngOnInit(): void {
    this.getItemList();
  }

  getItemList() {
    this.items = this.photos?.map((e: IPhoto): IGalleryPhoto => ({
      id: e.id?.toString() || '', // TODO - problem with optional param
      size: '150-150',
      src: e.url,
      thumb: e.thumbnailUrl,
      title: e.title
    }))
  }

  onInit = (detail: InitDetail): void => {
    this._lightGallery = detail.instance;
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.getItemList();
  }

  deletePhoto(e: Event, id: string): void {
    e.stopPropagation();
    e.preventDefault();
    this.removePhoto.emit(parseInt(id));
  }
}
