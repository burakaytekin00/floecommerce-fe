import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // HttpClient'i import edin
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: false
})
export class CategoryComponent {
  
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}
  