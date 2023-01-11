import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
public registerForm: FormGroup | any;
showAlert : boolean;
message : String;

constructor(
  private authService: AuthService, private router: Router
  )
  {}

ngOnInit() {
  this.showAlert = false;
  this.message = '';
  this.registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)
  })
}

onSubmit() {
  
this.removeAlert();
  if (this.registerForm.get('email').valid && this.registerForm.get('password').valid && this.registerForm.get('username').valid) {
    this.authService.register(
    this.registerForm.get('email').value,
    this.registerForm.get('password').value,
    this.registerForm.get('username').value
  )
  .pipe()
  .subscribe({
    next: () => { 
      this.router.navigate(['login'])
    },
    error: (error) => {
      console.log(error); 
      this.showAlert = true; 
      if (error['error']['error']['message']) {
        this.message = error['error']['error']['message']
      } else {
        this.message = 'An error occured with registration, please try again.'
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
