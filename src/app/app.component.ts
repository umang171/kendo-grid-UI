import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ProductService } from './services/product.service';
import { Product } from './model/product.interface';
import { from, map, of, pipe } from 'rxjs';
import { SortDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'kendo-example';
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
  ngOnInit(): void {
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
