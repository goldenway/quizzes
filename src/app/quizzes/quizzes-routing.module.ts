import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { QuizListComponent } from "./quiz-list/quiz-list.component";
import { QuizDetailComponent } from "./quiz-detail/quiz-detail.component";
import { QuizResultComponent } from "./quiz-result/quiz-result.component";
import { QuizzesGuard } from "./quizzes.guard";

const routes: Routes = [
  { path: '', component: QuizListComponent },
  { path: ':id', component: QuizDetailComponent, canActivate: [ QuizzesGuard ] },
  { path: ':id/result', component: QuizResultComponent, canActivate: [ QuizzesGuard ] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class QuizzesRoutingModule {}
