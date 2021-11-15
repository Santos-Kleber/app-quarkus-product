import { Product } from './../models/product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //url = 'https://app-quarkus-product.herokuapp.com/products';
  url = '/api/products';

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  // Obtem todos os produtos
  getProducts(): Observable<Product[]> {
    console.log('Chamou o getProducts()');
    return this.httpClient.get<Product[]>(this.url, this.httpOptions)
      .pipe(
        retry(2)
      );
  }

  // Obtem um produto pelo id
  getProductById(id: number): Observable<Product> {
    console.log('Chamou o getProductById()');
    return this.httpClient.get<Product>(this.url + '/' + id)
      .pipe(
        retry(2)
      )
  }

  // salva um produto
  saveProduct(product: Product): Observable<Product> {
    console.log('Chamou o saveProducts()');
    return this.httpClient.post<Product>(this.url, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(2)
      )
  }

  // utualiza um produto
  updateProduct(product: Product): Observable<Product> {
    console.log('Chamou o updateProducts()');
    return this.httpClient.put<Product>(this.url + '/' + product.id, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(1)
      )
  }

  // deleta um produto
  deleteProduct(product: Product) {
    console.log('Chamou o deleteProducts()');
    return this.httpClient.delete<Product>(this.url + '/' + product.id, this.httpOptions)
      .pipe(
        retry(1)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    console.log(error.message);
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
function catchError(handleError: (error: any) => any): import("rxjs").OperatorFunction<Product[], Product[]> {
  throw new Error('Function not implemented.');
}

function throwError(errorMessage: string) {
  throw new Error('Function not implemented.');
}

