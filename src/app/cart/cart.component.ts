import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // addToQuantity(){
  //   for(let i=0;i<this.auth.getProductsList.length;i++){
  //     this.auth.getProductsList().subscribe(res=>{
  //       this.products = res;
  //       this.grandTotal = this.auth.getTotalPrice();
  //       this.totalItem = res.length;
  //       console.log(this.products);
  //     })
  //   }
  // }

  constructor(private auth:AuthService) { }
  public products :any=[];
  public totalItem : number =0;
  public grandTotal :number=0;
  public cartQuatity:number=0;
  ngOnInit(): void {
    this.auth.getProductsList().subscribe(res=>{
      this.products = res;
      this.grandTotal = this.auth.getTotalPrice();
      this.totalItem = res.length;
      
    })
  }
  

 
  removeAll(){
    this.auth.removeAllCartItem();
  }
  removeParticularItem(item:any){
    this.auth.removeCartItem(item);
  }
}
