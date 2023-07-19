import { Component, OnInit } from '@angular/core';

import { ChartOptions } from 'chart.js';

import { StatsService } from './stats.service';
import { SharedService } from '../shared/shared.service';
import { IStats } from './stats.model';

@Component({
  selector: 'q-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  stats: IStats;
  averageTime: string = '';

  // chart
  chartDatasets = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {};

  constructor(
    private statsService: StatsService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.stats = this.statsService.getStats();

    const time = (this.stats.totalTime / this.stats.gamesCount) || 0;
    this.averageTime = this.sharedService.getFormattedTime(time);

    this.initChart();
  }

  initChart() {
    this.chartDatasets = [ {
      data: [
        this.stats.correctAnswers,
        this.stats.totalAnswers - this.stats.correctAnswers
      ],
      backgroundColor: [
        '#1FC31F',
        '#FF6666'
      ],
      borderColor: [
        '#009F00',
        '#C04D4D'
      ]
    } ];

    this.chartLabels = [
      'Correct Answers',
      'Wrong Answers'
    ];

    this.chartOptions = {
      responsive: true
    };
  }

  onClear() {
    this.statsService.clearStats();
    
    this.stats = {
      gamesCount: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      totalScore: 0,
      totalTime: 0
    };
    this.averageTime = '0 sec';
  }
}
