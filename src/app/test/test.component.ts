import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  images: any;
  error: any;
  image: any;

  constructor(private sanitizer: DomSanitizer) {}


  async ngOnInit() {
    try {
      const response = await axios.get(environment.strapi_url + '/images/imageFromFilename/name');
      let objectUrl= 'data:image/jpg;base64,' + response.data;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectUrl)
    } catch (error) {
      this.error = error;
    }
  }


}
