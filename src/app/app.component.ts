import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AttendeeApp';
  showHeader:boolean = true;
  deviceInfo:any = null;
 
  constructor(private router: Router, private deviceService: DeviceDetectorService){
    this.epicFunction();

    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if(e.url.toLowerCase() =="/login"||e.url.toLowerCase() =="/setdevice") this.showHeader=false
        else this.showHeader=true
      }
     
    });
  }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }
}
