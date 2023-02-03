import { Component } from '@angular/core';
import { GradingService } from '../grading.service';
import * as _ from 'lodash'
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-livergrading',
  templateUrl: './livergrading.component.html',
  styleUrls: ['./livergrading.component.css']
})
export class LivergradingComponent {
imagesToGrade: any;
currentImage= 0;
numberImages: number;
url=environment.strapi_image_url
public form: FormGroup
user: any;
errorMessage: String;

constructor(
  private gradingService: GradingService, 
  private route: ActivatedRoute,
  private router: Router
  ) {}

  ngOnInit() {
// get user from query parameters
// this.route.queryParams
// .subscribe(params => {
//   if (params['user'] === undefined) {
//     // todo once finished developing, just return the user to the login page here
//     // this.router.navigate(['login']);
//     console.log('something has gone wrong there is no user')
//   }
//   this.user = params['user']
//   console.log(this.user)
// })

  // get list of images to grade

  // todo note that currently media in strapi is unsecured, eventually need to rectify this/ use oracle bucket direct access
  this.gradingService.getListOfAllImages().then((result) => {
    
    this.imagesToGrade =  _.filter(result.data, function(o) {return (o.attributes.organ.data.attributes.organ_type == 'liver' && o.attributes.real == true)})
    this.numberImages = this.imagesToGrade.length
   

    // create form
    this.form = new FormGroup({
      quality: new FormControl(2.5, [Validators.required]),
      transplantable: new FormControl(true, Validators.required)
    })

    
})
  }

  nextImage() {
    if (this.currentImage == this.numberImages-1) {
      // we are at the end
      console.log('no more images')
    } else {
      this.currentImage +=1;

      this.resetForm()
    }
  }

  resetForm() {
    this.form = new FormGroup({
      quality: new FormControl(2.5, [Validators.required]),
      transplantable: new FormControl(true, Validators.required)
    })
  }

submit() {
  if (this.form.get('quality').valid && this.form.get('transplantable').valid) {
  // submit scores, image, organ and user to strapi
  this.gradingService.submitLiverScore(this.form.get('quality').value, this.form.get('transplantable').value, this.imagesToGrade[this.currentImage])
  .subscribe({
    next: (resp) => {
      this.nextImage();
    },
    error: (error) => {
        this.errorMessage = error.message
    }
  })
  
  
  
  } else {
    // todo display error message, something in form is missing
    
  }

}

skipToQuestions() {
    this.router.navigate(['questions'])
}

skipToComparison() {
  this.router.navigate(['comparison'])
}

logout() {
  // todo log out
}

}
