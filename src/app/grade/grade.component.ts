import { Component } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-test',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent {

  images: any;
  error: any;


  async ngOnInit() {
    try {
      const response = await axios.get('http://localhost:1337/api/images');
      this.images = response.data.data;
      console.log(response.data.data)
    } catch (error) {
      this.error = error;
    }
  }


}