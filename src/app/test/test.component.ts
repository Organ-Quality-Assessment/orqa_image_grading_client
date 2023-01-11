import { Component } from '@angular/core';
import { environment } from './../../environment/environment';
import axios from 'axios';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  images: any;
  error: any;
  filepath: any;


  async ngOnInit() {
    try {
      const response = await axios.get(environment.apiUrl+'images');
      this.images = response.data.data;
      console.log(response.data.data)
      this.filepath = environment.imagePath;
      console.log(environment.imagePath)
    } catch (error) {
      this.error = error;
    }
  }


}
