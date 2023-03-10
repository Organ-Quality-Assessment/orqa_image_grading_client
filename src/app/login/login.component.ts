import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
// if liver or kidney selected direct to grading
// todo add other organs as they are included in application
if (resp['user']['liver'] || resp['user']['kidney']) {
  const organString = this.buildStringFromCheckedOrgansCurrentlyGrading(resp['user'])

            // look at what organs people have said they would grade and add to navigation
            this.router.navigate(['grading'],
            {queryParams: {organs: organString}})

} else {
  // go to comparison
  this.router.navigate(['comparison'])
}
            
            

    
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

    buildStringFromCheckedOrgansCurrentlyGrading(user) {
      let organList =[]
      if (user['liver']) {
        organList.push('liver')
      }
      if (user['kidney']) {
        organList.push('kidney')
      }
      let listString = organList.join(',')
   
      return listString
      // todo in future as we add images to the tool expand on this
    }

    removeAlert() {
      this.message = '';
      this.showAlert = false;
    }
    
    goToPage(page: String) {
      this.router.navigate([page])
    }

}
