import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = {name:"",email:"",password:""};
  submit=false;
  errorMessage="";
  loading=false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
  onSubmit(){
    console.log('form submitted');
    console.log(this.formdata); 
    this.loading=true;
    this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=> {
        //store user token id      
            this.auth.storeToken(data.idToken);
            console.log('token stored'+data.idToken);
            this.auth.canAuthenticate();
          },
        error:data=>{
            if(data.error.error.message=="INVALID_EMAIL"){
              this.errorMessage="Invalid email";
              }
            else if(data.error.error.message=="EMAIL_EXISTS"){
              this.errorMessage="Existed email";
            }
            else{
              this.errorMessage="Unknown error when creating this request";
            }
        }
    }).add(()=>{
      this.loading=false;
      console.log('Registered completed');
    }) ;
    
  }
}
