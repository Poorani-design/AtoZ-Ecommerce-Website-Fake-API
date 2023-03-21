import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public totalItem:number=0;

  constructor(public auth:AuthService) { }
  
  user={displayName:"",localID:""};

  ngOnInit(): void {

    if(this.auth.isAuth()){
       //get user detail from firebase using rest api
        this.auth.getUserDetails().subscribe({
          next:data=>{
            this.user.localID=data.users[0].localId;
            this.user.displayName=data.users[0].displayName;
          }
        })
    }
    this.auth.getProductsList().subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  logout()
  {
    this.auth.removeUserDetails();
    this.auth.canAccess();
  }


}
