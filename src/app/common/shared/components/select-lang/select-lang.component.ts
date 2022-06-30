import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})
export class SelectLangComponent implements OnInit {


  constructor(private translate: TranslateService) { }

  ngOnInit(): void {console.log(this.translate.currentLang)
  }

  currentLang(): string {
    return 'LANG.' + this.translate.currentLang?.toUpperCase();
  }

  changeLang(lang: any): void {
    console.log(this.translate.currentLang)
    console.log(this.translate.getLangs())

    // this.translate.changeLanguage()
    this.translate.use(lang);
  }

  getLangList() {
    return this.translate.getLangs().filter((lang: string): boolean => lang !== this.translate.currentLang);
  }
}
