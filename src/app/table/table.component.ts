import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { DetailComponent } from '../dialogs/detail/detail.component.js';
import { MatDialog } from '@angular/material/dialog';

import * as establishmentData from '../../assets/establishment-data.json'


@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {

  citiesList: string[];

  nameFilter = new FormControl('');
  cityFilter = new FormControl('');
  postcodeFilter = new FormControl('');
  yearFilter = new FormControl('');
  dataSource = new MatTableDataSource();

  columnsToDisplay: string[] = ["name", "city", "postcode", "address", "start_year"];
  filterValues = {
    name: '',
    city: '',
    postcode: '',
    address: '',
    start_year: ''
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {
    // Put JSON data from import to table
    this.dataSource.data = establishmentData['default'];
    // Create custom filter predicate which allows filtering per input
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    // Get unique cities for filter
    this.citiesList = [...new Set(this.dataSource.data.map(item => item['location']['city']))];

    // Initialise paginator for table
    this.dataSource.paginator = this.paginator;

    // After value change, set dataSource filters
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.cityFilter.valueChanges
      .subscribe(
        city => {
          this.filterValues.city = city;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.postcodeFilter.valueChanges
      .subscribe(
        postcode => {
          this.filterValues.postcode = postcode;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.yearFilter.valueChanges
      .subscribe(
        start_year => {
          this.filterValues.start_year = start_year;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  // After clicking row in table open dialog with data of selected row
  getRecord(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      minWidth: '500px',
      data: { one: row }
    });
  }

  // Decide which rows will be showed after filters have changed values
  createFilter(): (data: any, filter: string) => boolean {
    // Special empty year filter handler
    let filterStartYear = function (filter: string): boolean {
      if (filter.length > 0)
        return false;
      else
        return true;
    }
    // Check filter and every row
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);

      return data.title.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1
        && data.location.city.toLowerCase().indexOf(searchTerms.city.toLowerCase()) !== -1
        && data.location.zipcode.toLowerCase().indexOf(searchTerms.postcode.toLowerCase()) !== -1
        && (data.dates.startdate ?
          data.dates.startdate.toLowerCase().indexOf(searchTerms.start_year.toLowerCase()) !== -1
          : filterStartYear(searchTerms.start_year));
    }
    return filterFunction;
  }

}
