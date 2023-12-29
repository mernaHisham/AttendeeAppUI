import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent {
    /*  clock */
     hours:HTMLCollection = document.getElementsByClassName('hours');
     minutes:HTMLCollection = document.getElementsByClassName('minutes');
     seconds:HTMLCollection = document.getElementsByClassName('seconds');
  ngOnInit() {
    this.clock();
  }
  hRotationValue:number=0;
  mRotationValue:number=0;
  sRotationValue:number=0;
clock = () => {
  let today = new Date();
  let h = (today.getHours() % 12) + today.getMinutes() / 59; // 22 % 12 = 10pm
  let m = today.getMinutes(); // 0 - 59
  let s = today.getSeconds(); // 0 - 59

  h *= 30; // 12 * 30 = 360deg
  m *= 6;
  s *= 6; // 60 * 6 = 360deg
 
  this.hourRotation(h);
  this.minuteRotation(m);
  this.secondRotation(s);

  

  // call every second
  setTimeout(this.clock, 500);
}

hourRotation = (val:number) => this.hRotationValue = val;
minuteRotation = (val:number) => this.mRotationValue = val;
secondRotation = (val:number) => this.sRotationValue = val;





}
