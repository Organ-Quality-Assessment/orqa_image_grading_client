import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComparisonService } from '../comparison.service';
import * as _ from 'lodash'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';

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


constructor(
  private comparisonService: ComparisonService, 
  private router: Router, 
  private authService: AuthService,
  private sanitizer: DomSanitizer) {}

ngOnInit() {
//   // todo note that currently media in strapi is unsecured, eventually need to rectify this/ use oracle bucket direct access
//   this.comparisonService.getImages().then((result) => {
    
//   // todo for now select 2 images randomly but this needs updating  
//    this.images = _.sampleSize(result.data, this.numberToShow)
 
// })

this.comparisonService.getRealAndArtificialImages().then(async (result: any[]) => {
  console.log(result)
 this.numberToShow = result.length
  this.images = result
  this.currentImageUrl = await this.getImageUrl(this.images[0])
  console.log(this.numberToShow)

})
}



  async getImageUrl(image) {
  // get image as blob from strapi
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
    this.router.navigate(['questions'])
  } else {
    this.currentImage +=1;

    // display next image
    this.currentImageUrl = await this.getImageUrl(this.images[this.currentImage])
   
  }
}

submit(response) {

    this.comparisonService.submit(this.images[this.currentImage], response)
    .subscribe({
      next: (resp) => {
        this.nextImage();
      },
      error: (error) => {
          this.errorMessage = error.message
      }
    })

}

skipToQuestions() {
  this.router.navigate(['questions'])
}

logout() {
  this.authService.logout()
}
}
