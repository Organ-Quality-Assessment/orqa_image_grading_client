import { Component } from '@angular/core';
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


  async ngOnInit() {
    try {
      const response = await axios.get(environment.strapi_url + '/images');
      this.images = response.data.data;
      console.log(response.data.data)
    } catch (error) {
      this.error = error;
    }
  }


}
