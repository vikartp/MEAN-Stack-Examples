import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-is',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss',
})
// IsComponent class refers to Infinite Scroll Component
export class IsComponent implements OnInit {
  posts: any[] = [];
  page = 1; // Current page
  limit = 10; // Number of posts to fetch per request
  loading = false; // Loader status
  allDataLoaded = false; // Indicates no more data

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadPosts();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !this.loading &&
      !this.allDataLoaded
    ) {
      this.loadPosts();
    }
  }

  loadPosts() {
    this.loading = true;
    this.http
      .get(`http://localhost:3000/posts`, {
        params: { limit: this.limit, offset: (this.page - 1) * this.limit },
      })
      .subscribe((response: any) => {
        if (response.length === 0) {
          this.allDataLoaded = true;
        } else {
          this.posts.push(...response);
          this.page++;
        }
        this.loading = false;
      });
  }

  addMoreData() {
    this.http
      .post(`http://localhost:3000/posts`, { addCount: 50 })
      .subscribe((response: any) => {
        console.log(response);
        this.loadPosts();
        this.allDataLoaded = false;
      });
  }

  deleteData() {
    this.http
      .delete(`http://localhost:3000/posts`)
      .subscribe((response: any) => {
        console.log(response);
        this.posts = [];
        this.page = 1;
        this.limit = 10;
      });
  }
}
