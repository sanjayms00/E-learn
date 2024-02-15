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
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--green-600'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: this.getData()
        },
        // {
        //   type: 'bar',
        //   label: 'Dataset 2',
        //   backgroundColor: documentStyle.getPropertyValue('--red-300'),
        //   data: [21, 84, 24, 75, 37, 65, 34],
        //   borderColor: 'white',
        //   borderWidth: 2
        // },
        // {
        //   type: 'bar',
        //   label: 'Dataset 3',
        //   backgroundColor: documentStyle.getPropertyValue('--pink-300'),
        //   data: [41, 52, 24, 74, 23, 21, 32]
        // }
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

    console.log(this.graphData)

    return this.graphData?.map(item => item.count)
  }





}
