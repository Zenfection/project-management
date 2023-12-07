import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TasksFacade } from '@client/core-state';
import { Plan } from '@client/shared/interfaces';
import { ApexOptions } from 'ng-apexcharts';

interface ChartDataTeamDistribution {
  members: string[]; //name of numbers
  series: {
    name: string;
    data: number[];
  }[];
}

@Component({
  selector: 'plan-details-tabs-overview',
  templateUrl: './plan-detail-tabs-overview.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailsTabsOverviewComponent
  implements OnInit, AfterContentInit
{
  @Input() plan: Plan;

  tasks$ = this._tasksFacade.tasks$;
  chartTeamDistribution: ApexOptions = {};
  dataChart: ChartDataTeamDistribution = {
    members: [],
    series: [
      {
        name: 'Team',
        data: [],
      },
    ],
  };

  constructor(private readonly _tasksFacade: TasksFacade) {}

  ngOnInit(): void {
    this.tasks$.subscribe((tasks) => {
      let totalTodo = 0;
      // Calculate the performance of members
      tasks.forEach((task) => {
        const assigneeName = task.assignee.info.name
          .split(' ')
          .slice(1)
          .join(' ');
        task.todos.forEach((todo) => {
          totalTodo++;
          const completed = todo.isDone;
          if (completed) {
            if (this.dataChart.members.includes(assigneeName)) {
              const index = this.dataChart.members.indexOf(assigneeName);
              this.dataChart.series[0].data[index]++;
            } else {
              this.dataChart.members.push(assigneeName);
              this.dataChart.series[0].data.push(1);
            }
          }
        });
      });

      // Calculate the percentage of each member
      this.dataChart.series[0].data = this.dataChart.series[0].data.map(
        (data) => {
          return Number(((data / totalTodo) * 100).toFixed(0));
        },
      );
    });
  }

  ngAfterContentInit(): void {
    this._prepareChartData();
  }

  private _prepareChartData(): void {
    this.chartTeamDistribution = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'radar',
        sparkline: {
          enabled: true,
        },
        toolbar: {
          show: true,
        },
      },
      colors: ['#818CF8'],
      dataLabels: {
        enabled: true,
        formatter: (val: number): string | number => `${val}%`,
        textAnchor: 'start',
        style: {
          fontSize: '13px',
          fontWeight: 500,
        },
        background: {
          borderWidth: 0,
          padding: 4,
        },
        offsetY: -15,
      },
      markers: {
        // strokeColors: '#818CF8',
        // strokeWidth: 4,
        size: 4,
        colors: ['#fff'],
        strokeColors: ['#818CF8'],
        strokeWidth: 2,
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: 'var(--fuse-border)',
            connectorColors: 'var(--fuse-border)',
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
        },
      },
      series: this.dataChart.series,
      stroke: {
        width: 2,
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val: number): string => `${val}%`,
        },
      },

      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            fontWeight: '500',
          },
        },
        categories: this.dataChart.members,
      },
      yaxis: {
        max: (max: number): number => parseInt((max + 10).toFixed(0), 10),
        tickAmount: 7,
      },
    };
  }
}
