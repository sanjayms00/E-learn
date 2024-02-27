import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { graphDataInterface } from '../../interface/admin.interface';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html'
})
export class GraphComponent implements OnInit, OnChanges {
  data: any;
  options: any;
  @Input() graphData!: graphDataInterface[] | undefined

  ngOnInit(): void {
    this.menuConfig()
  }

  ngOnChanges(): void {
    this.menuConfig()
  }

  //menu config data
  menuConfig() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.getLabels(),
      datasets: [
        {
          type: 'line',
          label: 'progress',
          borderColor: documentStyle.getPropertyValue('--green-600'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: this.getData()
        },
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  getLabels() {
    return this.graphData?.map(item => item._id)
  }

  getData() {
    return this.graphData?.map(item => item.count)
  }

}
