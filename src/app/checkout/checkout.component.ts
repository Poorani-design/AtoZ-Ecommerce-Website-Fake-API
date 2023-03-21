import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private auth:AuthService) { 
      // check user can Access
  this.auth.canAccess();
  this.auth.isAuth();
      // user function start
  }
  public grandTotal :number=0;
  public totalItem : number =0;
  public products :any=[];
  couponValue=0;
  shippingAmount:number=50;
  ngOnInit(): void {
    this.grandTotal = this.auth.getTotalPrice();  

    // get product -cart item count
    this.auth.getProductsList().subscribe(res=>{
      this.totalItem = res.length;
    }) 
  
  }
 
 
}


