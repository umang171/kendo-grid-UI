import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/model/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public form:FormGroup;
  public placeholder: Category = {
    categoryName: "Select category...",
    categoryId:-1
  };
  public product?:Product;
  public listItems!:Category[]; 
  constructor(private formBuilder:FormBuilder,private productService:ProductService,private router:Router) {
    this.form=new FormGroup({
      productName:new FormControl(),
      price:new FormControl(),
      categoryId:new FormControl(),
    });
  }
  ngOnInit(): void {
    this.productService.getCategories()
    .subscribe(data=>{this.listItems=data})
  }

  onSubmit() {
    this.product = this.form.value;
    if (this.product) {
      this.productService.addProduct(this.product).subscribe(
        (value) => {
          alert("Product added successfully");
          this.router.navigate(["/"]);
        },
        (error) => {
          console.log("fail");
        }
      );
    }
  }
}
