import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  imports: [],
  templateUrl: './pricing-page.component.html',
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      document.title = 'Pricing';
    }
    // this.title.setTitle('Pricing page');
    // this.meta.updateTag({
    //   name: 'description',
    //   content: 'Este es mi Pricing Page',
    // });
    // this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
  }
}
