import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as _ from 'lodash'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';
import { ComparisonService } from '../services/comparison.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent {
images = [];
currentImage = 0;
currentImageUrl;
numberToShow;
errorMessage: String;
correctGuesses = 0;

// flag to display images or results
guessing = true;

constructor(
  private comparisonService: ComparisonService, 
  private router: Router, 
  private authService: AuthService,
  private sanitizer: DomSanitizer) {}

ngOnInit() {
//  error handling if no images are returned
this.comparisonService.getRealAndArtificialImages().then(async (result: any[]) => {
if (result && result.length > 0) {
  this.numberToShow = result.length

  this.images = result
  this.currentImageUrl = await this.getImageUrl(this.images[0])
} else {
  //error message
}
 
})
}



  async getImageUrl(image) {
  // get image as blob from strapi
  // todo add error handling here
  const config = {
    headers: {
      'Authorization': 'Bearer ' + this.comparisonService.getSession().token
    }

  }

  const response = await axios.get(environment.strapi_url + '/images/imageFromFilename/' + image.filename, config);
  let objectUrl= 'data:image/jpg;base64,' + response.data;
  console.log(response)
  return this.sanitizer.bypassSecurityTrustUrl(objectUrl)
}

  async nextImage() {
  if (this.currentImage == this.numberToShow-1) {
    // display score
    this.guessing = false;
    
  } else {
    this.currentImage +=1;

    // display next image
    this.currentImageUrl = await this.getImageUrl(this.images[this.currentImage])
   
  }
}

finishedComparison() {
  this.router.navigate(['questions'])
}

submit(response) {

    this.comparisonService.submit(this.images[this.currentImage], response)
    .subscribe({
      next: (resp) => {

        // add to user's scores for fun
        this.checkIfAnswerIsCorrect(response)

        this.nextImage();
      },
      error: (error) => {
          this.errorMessage = error.message
      }
    })

}

checkIfAnswerIsCorrect(guess) {
  // guess is a string real, artificial or unsure
  // only add to score if they have picked real or artificial
  if (guess === 'real' || guess === 'artificial'){
    const actualAnswer = this.images[this.currentImage]['real']
    if ((guess === 'real' && actualAnswer === true) || (guess === 'artificial' && actualAnswer === false)) {
      this.correctGuesses +=1
    } 
  }
  
}

skipToQuestions() {
  this.router.navigate(['questions'])
}

logout() {
  this.authService.logout()
}
}
