import { Component } from '@angular/core';
import { ErrorModel } from '../../../utils/models/error';
import { ResponseModel } from '../../../utils/models/response';

// SERVICES
import { DataProcessingService } from '../../../providers/data-processing/data-processing.service';

@Component({
  selector: 'app-data-processing',
  templateUrl: './data-processing.component.html',
  styleUrls: ['./data-processing.component.scss'],
})
export class DataProcessingComponent {
  dataArray: any[] | undefined;
  pageLimit: number = 10;
  currentPage: number = 1;
  totalPage: number = 0;
  sortBy: any;
  searchText: any;
  isAscendingOrder: boolean = true;
  constructor(private _dataProcessing: DataProcessingService) {}

  ngOnInit(): void {
    this.getPlaylist();
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
          let totalRecord = response?.data?.totalSong;
          this.totalPage = Math.round(totalRecord / this.pageLimit);
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

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file && file.type === 'application/json') {
      const formData = new FormData();
      formData.append('file', file, file.name);
      this._dataProcessing.uploadFile(formData).subscribe(
        (response: ResponseModel) => {
          if (response.status == 200) {
            this.getPlaylist();
          }
        },
        (err: ErrorModel) => {
          if (err.error) {
            const error: ResponseModel = err.error;
          }
        }
      );
    } else {
      // this.toastr.error(MessageConstant.unknownError, '');
    }
  }
}
