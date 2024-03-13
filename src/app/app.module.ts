import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SetDeviceComponent } from './set-device/set-device.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceFormComponent } from './devices/device-form/device-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
//import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup'
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StyleClassModule } from 'primeng/styleclass';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VacationComponent } from './vacation/vacation.component';
import { VacationFormComponent } from './vacation/vacation-form/vacation-form.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceFormComponent } from './attendance/attendance-form/attendance-form.component';
import { ClockComponent } from './clock/clock.component';
import { HomeComponent } from './home/home.component';
import { CheckDeviceComponent } from './check-device/check-device.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AttendanceRequestComponent } from './attendance-request/attendance-request.component';
import { AttendanceRequestFormComponent } from './attendance-request/attendance-request-form/attendance-request-form.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { FilterFormComponent } from './attendance-report/filter-form/filter-form.component';
import { ReportApprovalComponent } from './report-approval/report-approval.component';
import { ReportApprovalFormComponent } from './report-approval/report-approval-form/report-approval-form.component';
import { AttendanceExportComponent } from './attendance/attendance-export/attendance-export.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SetDeviceComponent,
    DevicesComponent,
    DeviceFormComponent,
    UsersComponent,
    UserFormComponent,
    VacationComponent,
    VacationFormComponent,
    AttendanceComponent,
    AttendanceFormComponent,
    ClockComponent,
    HomeComponent,
    CheckDeviceComponent,
    AccessDeniedComponent,
    AttendanceRequestComponent,
    AttendanceRequestFormComponent,
    UserStatusComponent,
    AttendanceReportComponent,
    FilterFormComponent,
    ReportApprovalComponent,
    ReportApprovalFormComponent,
    AttendanceExportComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,MenubarModule,ToolbarModule,ButtonModule,SplitButtonModule,TableModule,ToastModule,FileUploadModule,
    DialogModule,RadioButtonModule,InputNumberModule,ConfirmDialogModule,FormsModule, ReactiveFormsModule,TagModule,
    RouterModule,HttpClientModule,BrowserAnimationsModule,DropdownModule,AccordionModule,AutoCompleteModule,AvatarModule,
    ToggleButtonModule,TooltipModule,TriStateCheckboxModule,TreeModule,TreeSelectModule,TreeTableModule,
    CardModule,BlockUIModule,ProgressSpinnerModule,StyleClassModule,SkeletonModule,SlideMenuModule,
    SliderModule,SpeedDialModule,SpinnerModule,SplitterModule,StepsModule,TabMenuModule,TabViewModule,
    PanelModule,PanelMenuModule,PasswordModule,ProgressBarModule,RatingModule,
    ScrollerModule,ScrollPanelModule,ScrollTopModule,SelectButtonModule,SidebarModule,AvatarGroupModule,BadgeModule,BreadcrumbModule,CalendarModule,DividerModule,
    CarouselModule,CascadeSelectModule,CheckboxModule,ChipModule,VirtualScrollerModule,ChipsModule,ConfirmPopupModule,ColorPickerModule,ContextMenuModule,DataViewModule,
    DockModule,DynamicDialogModule,FieldsetModule,GalleriaModule,InplaceModule,InputMaskModule,InputSwitchModule,InputTextModule,
    InputTextareaModule,InputGroupAddonModule,InputGroupModule,ImageModule,KnobModule,ListboxModule,MegaMenuModule,MenuModule,MessageModule,MessagesModule,
    MultiSelectModule,OverlayPanelModule,PaginatorModule
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
