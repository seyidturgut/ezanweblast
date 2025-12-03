
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';

export interface HikmetPost {
  id: number;
  title: string;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class HikmetService {
  private http = inject(HttpClient);
  private apiUrl = 'https://hikmetname.com/wp-json/wp/v2/posts?_embed&per_page=100';

  getPosts(): Observable<HikmetPost[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(posts => this.transformPosts(posts)),
      catchError(error => {
        console.warn('Direct Hikmet API failed (likely CORS), attempting proxy fallback...', error);
        
        // Fallback to CORS proxy
        // Using allorigins.win as a reliable JSON proxy
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(this.apiUrl)}`;
        
        return this.http.get<any[]>(proxyUrl).pipe(
          map(posts => this.transformPosts(posts)),
          catchError(proxyError => {
             console.error('Hikmet API Proxy failed', proxyError);
             return of([]); // Return empty array to prevent app crash
          })
        );
      })
    );
  }

  private transformPosts(posts: any[]): HikmetPost[] {
    if (!Array.isArray(posts)) return [];

    return posts.map(post => {
      // Extract featured media URL safely
      const featuredMedia = post._embedded?.['wp:featuredmedia'];
      const imageUrl = featuredMedia && featuredMedia[0] ? featuredMedia[0].source_url : null;

      // Filter out posts without images
      if (!imageUrl) return null;

      // Return clean JSON format as requested
      return {
        id: post.id,
        title: post.title && post.title.rendered ? post.title.rendered : 'Hikmet',
        image_url: imageUrl
      } as HikmetPost;
    })
    // Remove null entries
    .filter((item): item is HikmetPost => item !== null);
  }
}
