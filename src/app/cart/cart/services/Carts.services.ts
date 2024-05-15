import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HandleErrosServices } from "../../../shared/services/handleError.services";


@Injectable({
providedIn: 'root'
})

export class CartsServices
{
   // تخزين الجزء الثابت من رابط الاي بي اي في متغير
   baseApi = 'https://fakestoreapi.com/';

   constructor(private httpClient: HttpClient,
               private handleErrosServices: HandleErrosServices) {}
  createNewCart(model: any)
  {
    return this.httpClient.post(this.baseApi+'carts', model).pipe(
                           catchError(this.handleErrosServices.handleError));
  }

}



