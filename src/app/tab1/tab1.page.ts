import { Component, OnInit } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { MarsService } from '../services/mars.service';
import { NasalibService } from '../services/nasalib.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  apodImage: string = '';
  apodTitle: string = '';
  selectedDate: string = '';

  marsPhotos: any[] = [];
  currentSol: number = 4399;
  selectedSol: number | null = null;

  nasaMedia: any[] = []; 
  private intervalId: any;

  constructor(
    private apodService: ApodService,
    private marsService: MarsService,
    private nasaLibraryService: NasalibService,
    private router: Router
  ) {}

  navigateToTab1() {
    if (this.router.url !== '/tabs/tab1') {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  ngOnInit() {
    this.loadTodayPicture();
    this.loadCurrentMarsSol();
    this.loadRandomNasaMedia();
    this.startNasaMediaRefresh();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); 
    }
  }

  loadTodayPicture() {
    this.apodService.getPictureOfTheDay().subscribe((data: any) => {
      this.apodImage = data.url;
      this.apodTitle = data.title;
    });
  }

  loadPictureByDate() {
    if (this.selectedDate) {
      const formattedDate = this.selectedDate.split('T')[0]; 
      console.log('Formatted Date:', formattedDate);
  
      this.apodService.getPictureByDate(formattedDate).subscribe(
        (data: any) => {
          this.apodImage = data.url; 
          this.apodTitle = data.title;
        },
        (error) => {
          console.error('Error loading picture by date:', error);
        }
      );
    } else {
      console.error('No date selected');
    }
  }

  loadCurrentMarsSol() {
    this.marsService.getMarsPhotos().subscribe(
      (data: any) => {
        if (data.photos.length > 0) {
          this.currentSol = data.photos[0].sol; 
          this.marsPhotos = this.getRandomPhotosFour(data.photos); 
        } else {
          console.warn('No photos found for today.');
        }
      },
      (error) => {
        console.error('Error fetching Mars photos:', error);
      }
    );
  }

  loadMarsPhotosBySol() {
    if (this.selectedSol !== null) {
      this.marsService.getMarsPhotosBySol(this.selectedSol).subscribe(
        (data: any) => {
          if (data.photos.length > 0) {
            this.marsPhotos = this.getRandomPhotosFour(data.photos);
          } else {
            this.marsPhotos = [];
            console.warn('No photos found for the entered sol.');
          }
        },
        (error) => {
          console.error('Error fetching Mars photos for sol:', error);
        }
      );
    }
  }

  private getRandomPhotosFour(photos: any[]): any[] {
    const shuffled = photos.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, 4); 
  }

  loadRandomNasaMedia() {
    this.nasaLibraryService.searchMedia('space').subscribe(
      (data: any) => {
        const items = data.collection.items;
        if (items.length > 0) {
          this.nasaMedia = this.getRandomPhotosSix(items).map((item: any) => {
            return {
              href: item.links[0].href,
            };
          });
        } else {
          console.warn('No media found in NASA Library.');
        }
      },
      (error) => {
        console.error('Error fetching NASA media:', error);
      }
    );
  }

  private startNasaMediaRefresh() {
    this.intervalId = setInterval(() => {
      this.loadRandomNasaMedia();
    }, 25000); 
  }

  private getRandomPhotosSix(photos: any[]): any[] {
    const shuffled = photos.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }
}