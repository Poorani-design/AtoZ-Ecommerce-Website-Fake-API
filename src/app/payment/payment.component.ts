import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentSubmit()
  {
   window.alert("your payment submitted successfully..");
  }

  constructor(private auth:AuthService) {
      // check user can Access
  this.auth.canAccess();
  this.auth.isAuth();
      // user function start
   }
  public grandTotal :number=0;
  public totalItem : number =0;
  public products :any=[];
  public cartQuatity:number=0;
  couponValue=0;
  shippingAmount:number=50;
  ngOnInit(): void {
    this.auth.getProductsList().subscribe(res=>{
      this.products = res;
      this.grandTotal = this.auth.getTotalPrice();
      this.totalItem = res.length;
      
    })
    this.grandTotal = this.auth.getTotalPrice();  
   


 
    
  }



}

