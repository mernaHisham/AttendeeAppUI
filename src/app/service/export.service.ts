import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
enum FileType {
  PDF = 1
}

@Injectable({
  providedIn: 'root'
})

export class ExportService {
  blob!: Blob;
  constructor(private _http: HttpClient,
  ) {  }
  exportingCall(apiUrl: string, model: any, blob: any): Observable<any> {
    return this._http.post(
      apiUrl,
      model, blob

    );
  }
  export(apiUrl: string, reportFilter: any, fileType: number, reportName: string) {

    this.exportingCall(apiUrl, reportFilter, { responseType: 'blob' })
      .subscribe((resp) => {
        if (fileType === 1) {
          this.blob = new Blob([resp], { type: 'application/pdf' });
          reportName = reportName + '.pdf';
        } else if (fileType === 3) {
          this.blob = new Blob([resp], { type: 'application/vnd.ms-excel' });
          reportName = reportName + '.xlsx';
        } else if (fileType === 2) {
          this.blob = new Blob([resp], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
          reportName = reportName + '.docx';
        }

        if (this.blob) { // Check if blob is defined
          if (this.blob.size == 0) {
            // will show error message
            // this.toastrService.error("file is empty");

          } else {
            var downloadURL = window.URL.createObjectURL(this.blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = reportName;
            link.click();
          }
        } else {
          // Handle the scenario when blob is not defined (fileType didn't match)
          console.error('Invalid file type');
        }
      });
  }

}