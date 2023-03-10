import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { QuestionsService } from '../services/questions.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  public form: FormGroup

  constructor(private authService: AuthService, 
    private questionService: QuestionsService,
    private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      photography: new FormControl('', [Validators.required])      

    })
  }

  submit() {

    // submit answers once finalised and log user out
    if (this.form.get('photography').valid) {
     
     this.correctFormattingFor1And5()
this.questionService.submit(this.form.get('photography').value)
.subscribe({
  next: () => {
    this.authService.logout();
this.router.navigate(['register'])
  },
  error: (error) => {
    console.log('error submitting form')
  }
})



    } else {
      //todo error message for empty field(s)
      console.log('problem with form')
    }


  }

  correctFormattingFor1And5() {
    if(this.form.get('photography').value === '1 - not important') {
      this.form.get('photography').setValue('1')
    }
    else if(this.form.get('photography').value === '5 - very important') {
      this.form.get('photography').setValue('5')
    }
  }

  logout() {
    this.authService.logout()
  }
}
