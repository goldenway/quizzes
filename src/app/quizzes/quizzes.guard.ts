import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable } from "rxjs";

import { QuizzesService } from "./quizzes.service";

@Injectable({
  providedIn: 'root'
})
export class QuizzesGuard implements CanActivate {
  constructor(
    private quizzesService: QuizzesService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
  Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.quizzesService.isPlaying) {
      return true;
    } else {
      return this.router.createUrlTree(['/']);
    }
  }
}
