import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
import { UrlService } from '../url.service';
import { Movie } from '../../assets/movie'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  movies: Movie[];
  tv_num: number = 0;
  movie_num: number = 0;

  constructor(private urlService: UrlService) { }

  ngOnInit() {
    this.urlService.httpGet("api/radies")
    .then(res=>{
      this.movies = res.data;
      this.movies.forEach(movie => {
        if (movie.type === "TV Show") {
          this.tv_num += 1;
        }
        else {
          this.movie_num += 1;
        }
      })
    });
    
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "TV Shows/Movies Count"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.tv_num, label: "TV Shows" },
          { y: this.movies, label: "Movies" }
        ]
      }]
    });
      
    chart.render();
  }

}
