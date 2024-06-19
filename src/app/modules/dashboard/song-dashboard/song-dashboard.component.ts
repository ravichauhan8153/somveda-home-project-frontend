import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ErrorModel } from '../../../utils/models/error';
import { ResponseModel } from '../../../utils/models/response';
import * as Highcharts from 'highcharts';
import { saveAs } from 'file-saver';

//COMPONENT
import { AddReviewComponent } from 'src/app/shared/dialog/add-review/add-review.component';

// CHART DATA
import { acousticness, tempo, danceability } from '../../../utils/common-functions/dashboard-chart';

// SERVICES
import { DataProcessingService } from '../../../providers/data-processing/data-processing.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-song-dashboard',
  templateUrl: './song-dashboard.component.html',
  styleUrls: ['./song-dashboard.component.scss'],
})
export class SongDashboardComponent {
  // Dialog Option
  dialogRef: any;

  dataArray: any[] | undefined;
  pageLimit: number = 10;
  currentPage: number = 1;
  totalPage: number = 0;
  totalSong: number = 0;
  sortBy: any;
  searchText: any;
  isAscendingOrder: boolean = true;
  isDownload: boolean = false;

  constructor(
    private _dataProcessing: DataProcessingService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.renderScatterChart();
    this.renderBarChart();
    this.getPlaylist();
  }

  renderScatterChart() {
    let chart2 = Highcharts.chart({
      chart: {
        renderTo: 'chart-1',
        type: 'spline',
        height: 276,
      },

      title: {
        text: '',
      },

      credits: {
        enabled: false,
      },

      xAxis: {
        title: {
          text: 'Songs',
        },
      },
      yAxis: {
        title: {
          text: 'Danceability',
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
        }],
      },

      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.y:.2f}',
      },

      legend: {
        enabled: true,
      },

      exporting: {
        enabled: false,
      },

      series: [
        {
          type: 'line',
          name: 'Danceability',
          color: '#219653',
          data: Object.entries(danceability).map(([key, value]) => [parseInt(key), value]),
        },
      ],
    });
  }

  renderBarChart() {
    var chart3 = Highcharts.chart({
      chart: {
        renderTo: 'chart-2', // Specify the ID of the container where the chart should be rendered
        type: 'column',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: Object.keys(acousticness),
        title: {
          text: 'Songs',
        },
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      series: [{
        name: 'Acousticness',
        color: '#FB6514',
        type: 'column',
        data: Object.values(acousticness),
      }, {
        name: 'Tempo',
        color: '#FEB273',
        type: 'column',
        data: Object.values(tempo),
      }],
    });
  }

  addReviewdialog(id: any) {
    this.dialogRef = this._dialog.open(AddReviewComponent, {
      width: '500px',
      data: {},
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addReview(result, id);
      }
    });
  }

  addReview(review: any, id: any) {
    let param = {
      review: review,
      songId: id,
    };
    this._dataProcessing.addReview(param).subscribe(
      (response: ResponseModel) => {
        if (response.status == 200) {
          const item = _.find(this.dataArray, { id });
          if (item) {
            _.assign(item, { review: review });
          }
        }
      },
      (err: ErrorModel) => {
        if (err.error) {
          const error: ResponseModel = err.error;
          // this.toastr.error(error.message, '');
        } else {
          // this.toastr.error(MessageConstant.unknownError, '');
        }
      }
    );
  }

  getPlaylist() {
    let param = {};
    param = {
      page: this.currentPage,
      limit: this.pageLimit,
    };

    if (this.searchText) {
      param = {
        ...param,
        searchText: this.searchText,
      };
    }

    if (this.sortBy) {
      param = {
        ...param,
        sortBy: this.sortBy,
        sortMode: this.isAscendingOrder ? 1 : -1,
      };
    }

    this._dataProcessing.getPlaylist(param).subscribe(
      (response: ResponseModel) => {
        if (response.status == 200) {
          this.dataArray = response?.data?.playlistData;
          this.totalSong = response?.data?.totalSong;
          this.totalPage = Math.round(this.totalSong / this.pageLimit);
        }
      },
      (err: ErrorModel) => {
        if (err.error) {
          const error: ResponseModel = err.error;
          // this.toastr.error(error.message, '');
        } else {
          // this.toastr.error(MessageConstant.unknownError, '');
        }
      }
    );
  }
  selectPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getPlaylist();
  }

  selectNextPrevious(direction: boolean) {
    if (direction) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }
    this.getPlaylist();
  }

  serch(event: any) {
    this.searchText = event.target.value;
    this.currentPage = 1;
    this.totalPage = 0;
    this.getPlaylist();
  }

  short(filed: any) {
    this.sortBy = filed;
    this.currentPage = 1;
    this.totalPage = 0;
    this.isAscendingOrder = !this.isAscendingOrder;
    this.getPlaylist();
  }

  download() {
    let param = {
      page: 1,
      limit: this.totalSong,
    };
    this._dataProcessing.getPlaylist(param).subscribe(
      (response: ResponseModel) => {
        if (response.status == 200) {
          let listsDataCSV = response?.data?.playlistData;
          let fieldSequence = [
            {
              id: 'id',
              label: 'Id',
            },
            {
              id: 'title',
              label: 'Title',
            },
            {
              id: 'danceability',
              label: 'Danceability',
            },
            {
              id: 'energy',
              label: 'Energy',
            },
            {
              id: 'mode',
              label: 'Mode',
            },
            {
              id: 'acousticness',
              label: 'Acousticness',
            },
            {
              id: 'tempo',
              label: 'Tempo',
            },
            {
              id: 'duration_ms',
              label: 'Duration_ms',
            },
            {
              id: 'num_sections',
              label: 'Num Sections',
            },
            {
              id: 'num_segments',
              label: 'Num Segments',
            },
            {
              id: 'review',
              label: 'Review',
            },
          ];

          let finalHeader: any = [];
          let objectOrder: any = {};
          fieldSequence.forEach((value, index) => {
            finalHeader.push(value.label);
            objectOrder[value.id] = null;
          });
          let keys: any = [];
          let rearrangedData = [];
          let tempObj: any = {};
          keys = Object.keys(objectOrder);
          for (let i = 0; i < listsDataCSV.length; i++) {
            tempObj = {};

            for (let j = 0; j < keys.length; j++) {
              let dataVal = listsDataCSV[i][keys[j]];

              tempObj[keys[j]] = dataVal;

              rearrangedData.push(tempObj);
            }
          }
          keys = [...keys];
          const replacer = (key: any, value: null) =>
            value === null ? '' : value; // specify how you want to handle null values here
          let csv = rearrangedData.map((row) =>
            keys
              .map((fieldName: string | number) =>
                JSON.stringify(row[fieldName], replacer)
              )
              .join(',')
          );
          csv.unshift(finalHeader.join(','));
          let csvArray = csv.join('\r\n');

          var blob = new Blob([csvArray], { type: 'text/csv' });

          let d = new Date();
          let n = d.toLocaleTimeString();
          n = n.replace(/[:]/g, '');
          let exportFileName = 'Exported_Playlist_' + n + '.csv';
          saveAs(blob, exportFileName);
        }
      },
      (err: ErrorModel) => {
        if (err.error) {
          const error: ResponseModel = err.error;
          // this.toastr.error(error.message, '');
        } else {
          // this.toastr.error(MessageConstant.unknownError, '');
        }
      }
    );
  }
}
