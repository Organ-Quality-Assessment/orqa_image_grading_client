import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComparisonService } from '../comparison.service';
import * as _ from 'lodash'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent {
images = [];
currentImage = 0;
numberToShow = 2;
errorMessage: String;
url=environment.strapi_image_url;

constructor(private comparisonService: ComparisonService, private router: Router, private authService: AuthService) {}

ngOnInit() {
  // todo note that currently media in strapi is unsecured, eventually need to rectify this/ use oracle bucket direct access
  this.comparisonService.getImages().then((result) => {
    
  // todo for now select 2 images randomly but this needs updating  
   this.images = _.sampleSize(result.data, this.numberToShow)
 
})
}

nextImage() {
  if (this.currentImage == this.numberToShow-1) {
    this.router.navigate(['questions'])
  } else {
    this.currentImage +=1;
   
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
