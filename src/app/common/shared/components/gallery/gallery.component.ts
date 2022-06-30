import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IPhoto} from "@models/interfaces/photo.interface";
import {ModeType} from "@models/enums/mode-type";
import {Gallery, GalleryItem} from "ng-gallery";
import {Lightbox} from "ng-gallery/lightbox";

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges {
  items: GalleryItem[] = [];
  @Output() removePhoto: EventEmitter<number> = new EventEmitter()
  @Input() photos: IPhoto[] = [];
  @Input() mode: ModeType = ModeType.view;
  readonly ModeType: typeof ModeType = ModeType;

  constructor(public gallery: Gallery, public lightbox: Lightbox) {}

  ngOnInit() {
    this.getItemList();
  }

  getItemList(): void {
    this.items = this.photos?.map((e: IPhoto): GalleryItem => ({
      data: {
        id: e.id?.toString(),
        src: e.url,
        thumb: e.thumbnailUrl,
        title: e.title
      }
    }));
    this.gallery.ref().load(this.items);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getItemList();
  }

  deletePhoto(e: Event, id: string): void {
    e.stopPropagation();
    e.preventDefault();
    this.removePhoto.emit(parseInt(id));
  }

  // if user click on ::before (simulate click on img)
  open(index: number): void {
    this.lightbox.open(index);
  }
}
