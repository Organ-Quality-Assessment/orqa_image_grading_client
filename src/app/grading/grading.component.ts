import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import * as _ from 'cypress/types/lodash';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { GradingService } from '../grading.service';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css']
})
export class GradingComponent {
  imagesToGrade: any;
  currentImage= 0;
  numberImages;
  url=environment.strapi_image_url
  public form: FormGroup
  organsToGradeString:any;

  
  errorMessage: String;

  // current image to grade
  organType;
  currentImageUrl;
  
  constructor(
    private gradingService: GradingService, 
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer
    ) {}
  
    ngOnInit() {
  // get user's chosen organs from query parameters
  this.route.queryParams
  .subscribe(params => {
    if (params['organs'] === undefined) {
      // todo once finished developing, just return the user to the login page here
      // this.router.navigate(['login']);
      console.log('something has gone wrong there is no organs')
    }
    this.organsToGradeString = params['organs']
  })
  
    // get list of images to grade
  
    // todo note that currently media in strapi is unsecured, eventually need to rectify this/ use oracle bucket direct access
    // this.gradingService.getListOfAllImages().then((result) => {
      
    //   this.imagesToGrade =  _.filter(result.data, function(o) {return (o.attributes.organ.data.attributes.organ_type == 'liver' && o.attributes.real == true)})
      
 this.gradingService.getImagesToGrade(this.organsToGradeString).then(async (result) => {
  this.imagesToGrade = result;
  
  this.numberImages= this.imagesToGrade.length
this.organType = this.imagesToGrade[0].organ.organ_type
this.currentImageUrl = await this.getImageUrl(this.imagesToGrade[0])
 })
     
  
      // create form depending on organ type
      this.form = new FormGroup({
        steatosis: new FormControl(2.5, [Validators.required]),
        perfusion: new FormControl(2.5, [Validators.required]),
        transplantable: new FormControl(true, Validators.required)
      })
  
      
  }

  async getImageUrl(image) {
    // get image as blob from strapi
    const config = {
      headers: {
        'Authorization': 'Bearer ' + this.gradingService.getSession().token
      }
  
    }
  
    const response = await axios.get(environment.strapi_url + '/images/imageFromFilename/' + image.filename, config);
    let objectUrl= 'data:image/jpg;base64,' + response.data;
    console.log(response)
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl)
  }


  
    nextImage() {
      if (this.currentImage == this.numberImages-1) {
        // we are at the end
        console.log('no more images')
      } else {
        this.currentImage +=1;
        this.organType = this.imagesToGrade[this.currentImage].organ.organ_type
  
        this.resetForm()
      }
    }
  
    resetForm() {
      this.form = new FormGroup({
        steatosis: new FormControl(2.5, [Validators.required]),
        perfusion: new FormControl(2.5, [Validators.required]),
        transplantable: new FormControl(true, Validators.required)
      })
    }
  
  submit() {

// different fields depending on organ type
if (this.organType === 'liver') {
  // steatosis, perfusion and transplantable
  if (this.form.get('steatosis').valid && this.form.get('perfusion').valid && this.form.get('transplantable').valid) {
    // submit scores, image, organ and user to strapi
    this.gradingService.submitScore(this.form.get('perfusion').value, this.form.get('steatosis').value, this.form.get('transplantable').value, this.imagesToGrade[this.currentImage])
    .subscribe({
      next: (resp) => {
        this.nextImage();
      },
      error: (error) => {
          this.errorMessage = error.message
      }
    })
  } else {
    this.displayError('Please complete all fields')
  }
} else if (this.organType === 'pancreas') {
  // steatosis and transplantable
  if (this.form.get('steatosis').valid  && this.form.get('transplantable').valid) {
    // submit scores, image, organ and user to strapi
    this.form.get('perfusion').setValue(null)
    this.gradingService.submitScore(this.form.get('perfusion').value, this.form.get('steatosis').value, this.form.get('transplantable').value, this.imagesToGrade[this.currentImage])
    .subscribe({
      next: (resp) => {
        this.nextImage();
      },
      error: (error) => {
          this.errorMessage = error.message
      }
    })
  } else {
    this.displayError('Please complete all fields')
  }
} else {
  // kidney
  // perfusion and transplantable 
  if (this.form.get('perfusion').valid  && this.form.get('transplantable').valid) {
    // submit scores, image, organ and user to strapi
    this.form.get('steatosis').setValue('null')
    this.gradingService.submitScore(this.form.get('perfusion').value, this.form.get('steatosis').value, this.form.get('transplantable').value, this.imagesToGrade[this.currentImage])
    .subscribe({
      next: (resp) => {
        this.nextImage();
      },
      error: (error) => {
          this.errorMessage = error.message
      }
    })
  } else {
    this.displayError('Please complete all fields')
  }
}
  
  }
  
  skipToQuestions() {
      this.router.navigate(['questions'])
  }
  
  skipToComparison() {
    this.router.navigate(['comparison'])
  }
  
  logout() {
    this.authService.logout()
  }

  displayError(message) {
this.errorMessage = message
  }
}
