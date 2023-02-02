import { Component } from '@angular/core';
import { GradingService } from '../grading.service';
import * as _ from 'lodash'
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

constructor(private gradingService: GradingService) {}

  ngOnInit() {
  // get list of images to grade

  // todo note that currently media in strapi is unsecured, eventually need to rectify this/ use oracle bucket direct access
  this.gradingService.getListOfAllImages().then((result) => {
    this.imagesToGrade =  _.filter(result.data, function(o) {return o.attributes.organ.data.attributes.organ_type == 'liver'})
    this.numberImages = this.imagesToGrade.length
    console.log(this.imagesToGrade[this.currentImage])

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
  console.log(this.form.get('quality').value)
  this.nextImage();
}

}
