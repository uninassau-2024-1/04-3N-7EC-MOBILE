import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() {
  }

  public cron: any;
  public millisecond: number = 0;
  public second: number = 0;
  public hour: number = 0;
  public minute: number = 0;

  start() {
    this.pause();
    this.cron = setInterval(() => {
      this.timer();
    }, 10)
  }

    reset() {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.millisecond = 0;
  }

  timer() {
    if((this.millisecond += 10) === 1000) {
      this.millisecond = 0;
      this.second++;
    }

    if(this.second == 60) {
      this.second = 0;
      this.minute++;
    }

    if(this.minute == 60) {
      this.minute = 0;
      this.hour++;
    }
  }

  pause() {
    clearInterval(this.cron);
  }

  returnData(input: any) {
    return input > 10 ? input : `0${input}`;
  }
}
