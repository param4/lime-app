import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { UntilDestroy } from '@ngneat/until-destroy';

import { SkuService } from 'src/app/data/services/sku.service';
import { HeaderService } from 'src/app/core/services/header.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  cols = 4;

  length = 0;
  pageIndex = 0;
  pageSize = 10;

  pageEvent!: PageEvent | void;

  products: any = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private skus: SkuService,
    private router: Router,
    private header: HeaderService) { }

  ngOnInit() {
    this.getProducts(1, 10);
    this.header.setHeaderButtonsVisibility(true);

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints['(max-width: 599.98px) and (orientation: portrait)'] || result.breakpoints['(max-width: 599.98px) and (orientation: landscape)']) {
          this.cols = 1;
        }
        else if (result.breakpoints['(min-width: 1280px) and (orientation: portrait)'] || result.breakpoints['(min-width: 1280px) and (orientation: landscape)']) {
          this.cols = 4;
        } else {
          this.cols = 3;
        }
      }
    });
  }

  private getProducts(page: number, pageSize: number) {
    this.skus.getSkus(page, pageSize)
      .subscribe(
        (skus : any) => {
          console.log(">>>>> ", skus);
          
          this.products = skus.data;
          this.length = skus.meta.record_count;
        },
        err => this.router.navigateByUrl('/error')
      );
  }

  getNextPage(event: PageEvent) {
    console.log(">>>>>", event);
    
    this.getProducts(event.pageIndex + 1, event.pageSize);
  }

  trackSkus(index: number, item: any) {
    return `${item.id}-${index}`;
  }
}
