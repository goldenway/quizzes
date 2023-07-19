import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { NgChartsModule } from 'ng2-charts';

import { StatsComponent } from "./stats.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: StatsComponent }
    ]),
    CommonModule,
    SharedModule,
    NgChartsModule
  ]
})
export class StatsModule {}
