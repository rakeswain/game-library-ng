import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Game } from '../models/game';
import { ApiResponse } from '../models/apiResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string;
  public games: Array<Game>;
  public gameSub : Subscription;
  public routeSub : Subscription;

  constructor(private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sort = "-rating";
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames(this.sort, params['game-search']);
      } else {
        this.searchGames(this.sort);
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService.getGamesList(sort, search)
      .subscribe((gameList: ApiResponse<Game>) => {
        this.games = gameList.results;
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy() {
    if(this.gameSub) {
      this.gameSub.unsubscribe();
    } 

    if(this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
