import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { zip } from 'rxjs';

@Component({
  selector: 'page-about',
  imports: [],
  templateUrl: './about-page.component.html',
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi About Page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'About Page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola,Mundo,Germosen,Angular,PRO',
    });
  }
}
