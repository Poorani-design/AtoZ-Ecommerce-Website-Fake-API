import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient) { }
  // authentication function start
  isAuth():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }
  // authentication function end
  canAccess(){
    if(!this.isAuth()){
      this.router.navigate(['/login']);
    }
  }
  // if authenticated redirect to dashboard page start
  canAuthenticate()
  {
    if(this.isAuth()){
      this.router.navigate(['/dashboard']);
    }
  }
  // if authenticated redirect to dashboard page end
  
  // product api service start
  getProductDetails()
  {
    return this.http.get<any>("https://fakestoreapi.com/products")
      .pipe(map((res:any)=>{
      
        return res;
        
      }))
  }
  
// product service end

  register(name:string,email:string,password:string){
    //send register data to backend
   return  this.http.
    post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUjAhaDGNPQw9AhVhTvBB7tSKDBiafx-Q',{displayName:name,email,password});
  }
  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }
  login(email:string,password:string)
  {
    return this.http.post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUjAhaDGNPQw9AhVhTvBB7tSKDBiafx-Q',{email,password});
  }
  getUserDetails(){
    //get user detail using token
    let token= sessionStorage.getItem('token');
    return this.http.post<{users:Array<{localId:string,displayName:string}>}>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBUjAhaDGNPQw9AhVhTvBB7tSKDBiafx-Q',{idToken:token})
  }
  removeUserDetails(){
    sessionStorage.removeItem('token');
  }
  public cartItemList : any = [];
  
  // public cartQuantity: number;

  public productList = new BehaviorSubject<any>([]);

  
// cart service start
  // get product 
  getProductsList(){
    return this.productList.asObservable();
  }
  //push item 
  setProductList(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
    
  }

  // add to cart 
    addToCart(product:any){
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
    }
    // get total amount
    getTotalPrice():number{
      let grandTotal = 0;
      this.cartItemList.map((a:any)=>{
        grandTotal += a.total;
      })
      return grandTotal;
    }

    // remove particular item in the cart
    removeCartItem(product:any){
      this.cartItemList.map((a:any, index:any)=>{
        if(product.id === a.id){
          this.cartItemList.splice(index,1);
        }
        this.productList.next(this.cartItemList);
      })
    }
    // remove all item in cart
    removeAllCartItem(){
      this.cartItemList=[];
      this.productList.next(this.cartItemList);
    }
// cart service end

// cartQuality Item start
// cartQuatity(){
//   this.cartQuantity=2;
// }

// cartQualtiy Item end 
}
