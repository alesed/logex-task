
# Ukol

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## My extensions
  Project contain main task including dataset **"Out in Amsterdam"**.
  
  Application allows user to view data in tabular way and filter results by every seperate filter in Angular material component **mat-accordion**.

City filter is different by putting select input which contains every city that exists in dataset.

Because dataset has a big amount of data, table has more than 500 rows. I decided to do the application more intuitive for everyone and include **mat-paginator** which allows browsing **per page of default 10 elements** or from the option of 5 or 20.

Application offers dialog component named `DetailComponent`. Dialog is opened whenever user click on any selected row from table.
Offers detailed view of venue

 - Full name
 - Full address
 - Gallery of photos included in dataset (fullscreen mode enabled when clicked on photo)

## How to use

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/` and application autamtically redirect user to `/table` URL. 

## Further help

  

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).