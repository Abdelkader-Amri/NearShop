import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
 
 constructor(private http:HttpClient) { }
   public signUp(user: any){
    return this.http.post('http://localhost:3000/api/users/signup', user)
 }

  ngOnInit(): void {}
}
//   email = ""
//   password = ""
//   userName=""
//   confirmPassword = ""
//   url:any=""

//   seletImage(event:any){
//     let reader = new FileReader();
//     reader.readAsDataURL(event.target.files[0])
//     reader.onload = () =>{
//       this.url = reader.result
//      }
//   }

//   GetEmail(event:any) {
//     this.email = event.target.value
    
//   }

//   GetPassword (event:any) {
//       this.password = event.target.value
//   }

//   GetuserName (event:any) {
//         this.userName = event.target.value
//   }

//   Getadresse (event:any) {
//         this.adresse = event.target.value
//   }

//         addUser(f:any) {
  
//         let data = f.value
//         var email = this.email  
//         var password = this.password
//         var userName = this.userName
//         var adresse = this.adresse
//         var image = this.url

//   const data1={
//   email:email,
//   password:password,
//   username:userName,
//   adresse:adresse,
//   image:image
//   }
// }

// this.router.navigate(['/sites/AllSites']);
