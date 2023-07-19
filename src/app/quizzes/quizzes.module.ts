import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { QuizListComponent } from "./quiz-list/quiz-list.component";
import { QuizItemComponent } from "./quiz-list/quiz-item/quiz-item.component";
import { QuizDetailComponent } from "./quiz-detail/quiz-detail.component";
import { QuizResultComponent } from "./quiz-result/quiz-result.component";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { QuizQuestionComponent } from './quiz-detail/quiz-question/quiz-question.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    QuizListComponent,
    QuizItemComponent,
    QuizDetailComponent,
    QuizResultComponent,
    QuizQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuizzesRoutingModule,
    SharedModule
  ]
})
export class QuizzesModule {}
