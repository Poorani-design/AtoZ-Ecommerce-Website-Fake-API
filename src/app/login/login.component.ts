import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata={email:"",password:""}
  submit=false;
  loading=false;
  errorMessage="";
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();

  }
  onSubmit()
  {
    console.log(this.formdata);
    this.loading=true;
    //login api service for backend (firebase)
    this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({next:data=>{
      this.auth.storeToken(data.idToken);
      console.log('login token'+data.idToken);
      this.auth.canAuthenticate();
    },
    error:data=>{
      if(data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage="Invalid Login Credentials";
      }
      else
      {
        this.errorMessage="Unknown error";
      }
    }
  }).add(()=>{
    console.log('login completed');
    this.loading=false;
  })
  ;
  }
}
