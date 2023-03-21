import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public productList:any;
  constructor(private auth:AuthService) { }

  user={displayName:"Your name",localID:"xxxx"};
  ngOnInit(): void {
// check user authentication
this.auth.canAccess();

 // get product list from fake api store
 this.auth.getProductDetails().subscribe(res=>{
  this.productList=res;
  console.log(this.auth.getProductDetails());
  console.log(this.productList);
    this.productList.forEach((a:any)=>{
      Object.assign(a,{quantity:1,total:a.price}); 
    })
})
// get product list from fake api store

    // user function start
 
    if(this.auth.isAuth()){
        //get user detail from firebase using rest api
        this.auth.getUserDetails().subscribe({
          next:data=>{
            this.user.localID=data.users[0].localId;
            this.user.displayName=data.users[0].displayName;
          }
        })
    }

  }
    // user function end

    // add to cart function start 
    addToCart(item:any){
      this.auth.addToCart(item);
    }
    // add to cart function end

}
