import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../core/models/page.model";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ProfileService} from "../../../core/services/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {

  // breadCrumbItems = [{label: 'menu.sysMng'}, {label: 'users.title', active: true}];
  tables:any;
  searchForm: FormGroup = this.fb.group({
    nam_sinh_to:[null],
    nam_sinh_from:[null]
  });
  page = new Page();
  sotuoi:any;
  tuoitu:any;
  tuoiden:any;
  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private translateService: TranslateService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.sotuoi=0;
    const body={
      startYear:1900,
      endYear:2999
    }
    this.profileService.thongKe(body).subscribe(res=>{
      this.tables=res?.body?.body;
    })
  }
  search(){
    this.sotuoi=0;
    this.tuoitu=this.searchForm.get("nam_sinh_from").value;
    this.tuoiden=this.searchForm.get("nam_sinh_to").value;
    if(this.tuoiden===null||this.tuoitu===null){
      alert("Bạn phải nhập độ tuổi");
      return;
    }else {
      this.sotuoi=0;
      const body={
        startYear:new Date().getFullYear()-this.tuoitu,
        endYear:new Date().getFullYear()-this.tuoiden
      }
      this.profileService.thongKe(body).subscribe(res=>{
        this.tables=res?.body?.body;
      })
    }
  }

}

