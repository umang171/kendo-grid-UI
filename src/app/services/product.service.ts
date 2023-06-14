import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getProducts(pageSkip?:number,pageSize?:number,searchText?:string,orderBy?:string,dir?:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageSkip",pageSkip||0);
    queryParams = queryParams.append("pageSize",pageSize||5);
    queryParams = queryParams.append("searchText",searchText||"");
    queryParams = queryParams.append("orderBy",orderBy||"");
    queryParams = queryParams.append("dir",dir||"");
    return this.http.get<any>("https://localhost:7054/api/Product",{params:queryParams});    
  }
}
