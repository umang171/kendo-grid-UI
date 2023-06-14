export interface Category{
    categoryId:number,
    categoryName:string
}
export interface Product{
    productId:number,
    productName:string,
    price:number,
    category:Category
}