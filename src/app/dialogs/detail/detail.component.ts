import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  imageObject: Array<object> = [];

  ngOnInit(): void {
    for (let one of this.data['one']['media']) {
      this.imageObject.push({
        image: one.url,
        thumbImage: one.url
      })
    }
  }

}
