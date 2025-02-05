import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsteroidsService } from '../services/asteroid.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule], 
})
export class Tab4Page implements OnInit {
  asteroids: any[] = [];
  startDate: string = '';
  endDate: string = '';
  isLoading = true;
 
  constructor(private asteroidsService: AsteroidsService) {}

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.startDate = today;
    this.endDate = today;
  }

  loadAsteroids() {
    this.isLoading = true;
    this.asteroidsService.getAsteroids(this.startDate, this.endDate).subscribe(
      (data: any) => {
        const asteroidObjects = data.near_earth_objects || {};
        this.asteroids = Object.values(asteroidObjects).reduce((acc: any[], val: any) => acc.concat(val), []);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading asteroids:', error);
        this.isLoading = false;
      }
    );
  }
}
