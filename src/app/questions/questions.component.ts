import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {


  constructor(private authService: AuthService) {}

  submit() {
    // todo submit answers once finalised and log user out
  }

  logout() {
    this.authService.logout()
  }
}
