import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup | any;
showAlert : boolean;
message : String;

constructor(
  private authService: AuthService, private router: Router
  )
  {}

  ngOnInit() {
    this.showAlert = false;
    this.message = '';
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
  
    this.removeAlert();
      if (this.loginForm.get('email').valid && this.loginForm.get('password').valid) {
        this.authService.login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .pipe()
      .subscribe({
        next: (resp) => { 
          console.log(resp)
          // handle jwt
          this.authService.setSession(resp)
      
          if (this.authService.getRedirectPage() && this.authService.getRedirectPage().length > 0)  {
            // navigate back to requested page
            const page = this.authService.getRedirectPage()
            // reset reqested page
            this.authService.setRedirectPage('')
            // pass user onto next page
            
            this.router.navigate([page])
          } else {
            // this won't be the route but for now got to liver          
            // this.router.navigate(['liver'], { queryParams: { user: JSON.stringify(resp.user)}})
            this.router.navigate(['liver'], { queryParams: { user: JSON.stringify(resp.user)}})
          }
          
        },
        error: (error) => {
          console.log(error); 
          this.showAlert = true; 
          if (error['error']['error']['message']) {
            this.message = error['error']['error']['message']
          } else {
            this.message = 'An error occured, please try again.'
          }
          
        }
      }
      )
    
    
      }
      
    }
    removeAlert() {
      this.message = '';
      this.showAlert = false;
    }
    
    goToPage(page: String) {
      this.router.navigate([page])
    }

}
