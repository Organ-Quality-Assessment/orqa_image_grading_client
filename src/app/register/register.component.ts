import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
public registerForm: FormGroup | any;

constructor(
  private authService: AuthService, 
  private alertService: AlertService, private router: Router
  )
  {}

ngOnInit() {
  this.registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)
  })
}

onSubmit() {
  if (this.registerForm.get('email').valid && this.registerForm.get('password').valid && this.registerForm.get('username').valid) {
    this.authService.register(
    this.registerForm.get('email').value,
    this.registerForm.get('password').value,
    this.registerForm.get('username').value
  )
  .pipe()
  .subscribe({
    next: () => { this.alertService.success('Registration successful', true); this.router.navigate(['/login']) },
    error: (error) => {console.log('error'); this.alertService.error(error)}
  }
  )


  }
  
}
}
