import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HandleErrosServices } from "../../shared/services/handleError.services";


@Injectable({
providedIn: 'root'
})

export class ProdutcsServices
{

  // تخزين الجزء الثابت من رابط الاي بي اي في متغير
  baseApi = 'https://fakestoreapi.com/products';

  constructor(private httpClient: HttpClient,
              private handleErrosServices: HandleErrosServices) {}


  // جلب كل المنتجات
  getAllProducts(): Observable<any>
  {
    return this.httpClient.get(this.baseApi).pipe(
                           catchError(this.handleErrosServices.handleError));
  }



  // جلب كل التصنيفات
  getAllCategories(): Observable<any>
  {
    return this.httpClient.get(this.baseApi+'/categories').pipe(
                           catchError(this.handleErrosServices.handleError));
  }


  // الدالة التالية هي الدالة التي تدمج ركويست جلب المنتجات مع ركويست جلب التصنيفات
  // Method to fetch all data concurrently using forkJoin
  getAllCategoriesWithAllProducts(): Observable<any[]> {
  // Array of observables representing different API calls
    const observables = [
    this.getAllProducts(),
    this.getAllCategories(),
  ];
    // Use forkJoin to make parallel API calls and wait for all responses
    return forkJoin(observables);
}

// الدالة التالية لفتلرة المنتجات بحسب التصنيف
getProductsByCatogery(keyword: string): Observable<any>
{
  return this.httpClient.get(this.baseApi+'/category/'+keyword).pipe(
    catchError(this.handleErrosServices.handleError));
}


// الدالة التالية لجلب المنتج بحسب رقم الاي دي
getProductById(id: any): Observable<any>
{
  return this.httpClient.get(this.baseApi+'/'+id).pipe(
    catchError(this.handleErrosServices.handleError));
}


}



