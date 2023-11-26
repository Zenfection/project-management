import { Component, OnInit } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'rate-widget',
  templateUrl: './rate-widget.component.html',
  standalone: true,
  imports: [NgApexchartsModule],
})
export class RateWidgetComponent implements OnInit {
  chartBudgetDistribution: ApexOptions = {};
  data: any;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Budget distribution
  //   this.chartBudgetDistribution = {
  //     chart      : {
  //         fontFamily: 'inherit',
  //         foreColor : 'inherit',
  //         height    : '100%',
  //         type      : 'radar',
  //         sparkline : {
  //             enabled: true,
  //         },
  //     },
  //     colors     : ['#818CF8'],
  //     dataLabels : {
  //         enabled   : true,
  //         formatter : (val: number): string | number => `${val}%`,
  //         textAnchor: 'start',
  //         style     : {
  //             fontSize  : '13px',
  //             fontWeight: 500,
  //         },
  //         background: {
  //             borderWidth: 0,
  //             padding    : 4,
  //         },
  //         offsetY   : -15,
  //     },
  //     markers    : {
  //         strokeColors: '#818CF8',
  //         strokeWidth : 4,
  //     },
  //     plotOptions: {
  //         radar: {
  //             polygons: {
  //                 strokeColors   : 'var(--fuse-border)',
  //                 connectorColors: 'var(--fuse-border)',
  //             },
  //         },
  //     },
  //     series     : this.data.budgetDistribution.series,
  //     stroke     : {
  //         width: 2,
  //     },
  //     tooltip    : {
  //         theme: 'dark',
  //         y    : {
  //             formatter: (val: number): string => `${val}%`,
  //         },
  //     },
  //     xaxis      : {
  //         labels    : {
  //             show : true,
  //             style: {
  //                 fontSize  : '12px',
  //                 fontWeight: '500',
  //             },
  //         },
  //         categories: this.data.budgetDistribution.categories,
  //     },
  //     yaxis      : {
  //         max       : (max: number): number => parseInt((max + 10).toFixed(0), 10),
  //         tickAmount: 7,
  //     },
  // };
}
