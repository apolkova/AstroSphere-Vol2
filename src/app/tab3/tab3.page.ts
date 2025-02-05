import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  newsArticles: any[] = [];
  isLoading: boolean = false;

  constructor(private spaceNewsService: NewsService) {}

  ngOnInit() {
    this.loadSpaceNews();
  }

  loadSpaceNews() {
    this.isLoading = true;
    this.spaceNewsService.fetchNews().subscribe({
      next: (data: any) => {
        console.log('News Articles:', data);
        this.newsArticles = data.results || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching space news:', error);
        this.isLoading = false;
      }
    });    
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

}
