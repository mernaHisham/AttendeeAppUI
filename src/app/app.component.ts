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
  showHeader: boolean = true;
  deviceInfo: any = null;
  urlVal: string = "";
  user: any = localStorage.getItem("user");
  accessToken: any = localStorage.getItem("accessToken");
  ConfirmationCode: any = localStorage.getItem("ConfirmationCode");

  constructor(private router: Router, private deviceService: DeviceDetectorService) {
    this.epicFunction();

    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.urlVal = e.url.toLowerCase();

        if (this.urlVal == "/login" || this.urlVal == "/setdevice"||this.urlVal =="/checkdevice") this.showHeader = false
        else this.showHeader = true
      }

    });
  }
  ngOnInit() {
    if (this.ConfirmationCode == null||this.ConfirmationCode == "")
      this.router.navigate(['/checkdevice']);
    else if (this.accessToken == null||this.accessToken == "")
      this.router.navigate(['/login']);

  }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
  }
}
