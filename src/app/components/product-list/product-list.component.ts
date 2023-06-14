import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { map } from 'rxjs';
import { Product } from 'src/app/model/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  public products!:Product[];
  public count!:number;
  public gridView!: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public search="";
  public sort: SortDescriptor[] = [
    {
      field: "productName",
      dir: "asc",
    },
  ];
  constructor(private productService:ProductService) {
    this.loadItems(this.skip,this.search,this.sort);
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems(this.skip,this.search,sort);
  }
  searchProduct(event:any){
    this.search=event.target.value;
    this.loadItems(this.skip,this.search,this.sort);
  }
  public pageChange(event:PageChangeEvent){
    this.skip=event.skip;
    this.loadItems(event.skip,this.search,this.sort);
  }
  private loadItems(pageSkip?:number,searchText?:string,tmpSort?:SortDescriptor[]):void{
    this.productService.getProducts(pageSkip,this.pageSize,searchText,tmpSort?.at(0)?.field,tmpSort?.at(0)?.dir,)
    .pipe(map(values=>{
      this.count=values.total;
      return values.products
    }))      
    .subscribe(
      values=>{
        this.products=values;
        this.gridView={data:this.products,total:this.count};
      }
      );
  }
}
