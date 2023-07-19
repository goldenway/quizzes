import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
  { path: 'quizzes', loadChildren: () => import('./quizzes/quizzes.module').then(mod => mod.QuizzesModule) },
  { path: 'stats', loadChildren: () => import('./stats/stats.module').then(mod => mod.StatsModule) },
  { path: '**', redirectTo: '/quizzes' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
