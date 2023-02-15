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
errorMessage: String;

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
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    institution: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    task: new FormControl('', Validators.required),
    liver: new FormControl(false, Validators.required),
    pancreas: new FormControl(false, Validators.required),
    kidney: new FormControl(false, Validators.required),
    thoracic: new FormControl(false, Validators.required),
    contactable: new FormControl(false, Validators.required),
  })
}

checkAllFieldsValid() {
  if(this.registerForm.get('email').valid && this.registerForm.get('password').valid &&
  this.registerForm.get('name').valid && this.registerForm.get('institution').valid &&
  this.registerForm.get('job').valid && this.registerForm.get('experience').valid &&
  this.registerForm.get('task').valid ) {
return true
  } else {
    return false
  }
}

convertExperienceToEnum(value) {
switch(value) {
  case 'less than 1 year': {
    return 'less than one'
  } 
  case '1-5 years': {
    return 'one-five years'
  }
  default:
    return 'five years or more'
}
}

onSubmit() {
    
this.removeAlert();


//name
//institution
// job
// experience
// task
// liver pancreas kidney thoracic
// contactable

  if (this.checkAllFieldsValid() ) {
    // use email as username
    this.registerForm.get('username').setValue(this.registerForm.get('email').value)
    
    this.authService.register(
    this.registerForm.get('email').value,
    this.registerForm.get('password').value,
    this.registerForm.get('username').value,
    this.registerForm.get('name').value,
    this.registerForm.get('institution').value,
    this.registerForm.get('job').value.toLowerCase(),
    this.convertExperienceToEnum(this.registerForm.get('experience').value),
    this.registerForm.get('task').value.toLowerCase(),
    this.registerForm.get('liver').value,
    this.registerForm.get('pancreas').value,
    this.registerForm.get('kidney').value,
    this.registerForm.get('thoracic').value,
    this.registerForm.get('contactable').value
  )
  .pipe()
  .subscribe({
    next: (result) => { 
      this.message = 'success'
     

// login user
this.authService.login(this.registerForm.get('email').value,
this.registerForm.get('password').value)
.pipe()
.subscribe({
  next: (resp) => {
    // handle jwt
    this.authService.setSession(resp)

// direct to grading if liver and/or kidney are checked
if (this.registerForm.get('liver').value || this.registerForm.get('kidney').value) {
  const organString = this.buildStringFromCheckedOrgansCurrentlyGrading()
  
  this.router.navigate(['grading'],
  {queryParams: {organs: organString}})
} else {
  // otherwise direct to comparison? or research questions
  this.router.navigate(['comparison'])
}

  },
  error: (error) => {
    console.log(error); 
    this.showAlert = true; 
    if (error['error']['error']['message']) {
      this.message = error['error']['error']['message']
    } else {
      this.message = 'An error occured, please try logging in.'
    }
    
  }
})



      //this.router.navigate(['login'])
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


  } else {
    this.errorMessage = 'Please complete all fields'
  }
  
}

buildStringFromCheckedOrgansCurrentlyGrading() {
  let organList =[]
  if (this.registerForm.get('liver').value) {
    organList.push('liver')
  }
  if (this.registerForm.get('kidney').value) {
    organList.push('kidney')
  }
  let listString = organList.join(',')
console.log(listString)
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

openGDPR() {
  console.log('click')
  window.open("https://www.ncl.ac.uk/data.protection/", "_blank")
}
}
