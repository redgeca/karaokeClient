import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators' ;
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myControl: FormControl = new FormControl();
  myName: FormControl = new FormControl();
  formCtrlSub: Subscription;
  errorMessage: String;
  successMessage: String;
  
  options = [ 
   ];

   constructor(private searchService: SearchService) {}

 ngOnInit() {
   this.myName.setValue(localStorage.getItem("singerName"));
    // debounce keystroke events
    this.formCtrlSub = this.myControl.valueChanges.pipe(
      debounceTime(300))
      .pipe(filter(term => !!term))
        .subscribe(newValue => {
          console.log("searching " + newValue);
          this.searchService.search(newValue).subscribe(response => {
            this.options = response;
            console.log(this.options);
          });
      });
  }

  send() {
    console.log(this.myControl.value + " for " + this.myName.value);

    let song = this.myControl.value;

    this.successMessage = "";
    this.errorMessage = ""; 
    this.searchService.request(this.myControl.value, this.myName.value, null).subscribe(
      response => {
      console.log('Tada!!!!!');
      console.log(response);
      this.successMessage = song + ' : ' + response.toString();
    }, error => {
      console.log(error.error)
      this.errorMessage = error.error;
    });
//    this.successMessage = this.myControl.value.length % 2 == 0 ? "YEAH" : "" ;
//    this.errorMessage = this.myControl.value.length % 2 == 1 ? "ZUT" : "";

//    console.log(this.successMessage);
//    console.log(this.errorMessage);

    this.myControl.setValue("");
    this.options = [];

    localStorage.setItem("singerName", this.myName.value);

  }
}
