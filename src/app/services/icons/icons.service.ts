import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeResourceUrlWithIconOptions } from '@angular/material/icon/icon-registry';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
  ) {
    this._iconRegistry.addSvgIconResolver((name: string, namespace: string): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
      const path: string = `assets/img/svg/${namespace ? `${namespace}/` : ''}${name}.svg`;
      return this._sanitizer.bypassSecurityTrustResourceUrl(path
      );
    });
  }
}
