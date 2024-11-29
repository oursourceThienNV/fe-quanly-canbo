import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../core/models/page.model";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import * as fileSaver from 'file-saver';
import {UserProfileService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {ProfileService} from "../../../core/services/profile.service";
import {LeaveDialogComponent} from "./leave-dialog.component";
import {equals} from "@ngx-translate/core/lib/util";
import {TranfersDialogComponent} from "../tranfer/tranfers-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: '../leave/leave.component.html'
})
export class LeaveComponent implements OnInit {

  // breadCrumbItems = [{label: 'menu.sysMng'}, {label: 'users.title', active: true}];
  tables:any;
  searchForm: FormGroup = this.fb.group({
    code:[null],
    fullname:[null]
  });
  role:any;
  page = new Page();
  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private translateService: TranslateService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.setPage({offset: 0});
    this.role= localStorage.getItem("role");
  }

  search() {
    console.log("aaa",this.searchForm.get("username").value);
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    this.profileService.searchTranfers({
      pageNumber: '0',
      pageSize: 10,
      type:{equals:"00"},
      code:this.stringNullOrEmpty(this.searchForm.get("code").value)? {contains:this.searchForm.get("code").value}:null,
      fullname:this.stringNullOrEmpty(this.searchForm.get("fullname").value)? {contains:this.searchForm.get("fullname").value}:null,
    }).subscribe(res => this.onSuccess(res.body));
  }

  protected onSuccess(data: any | null): void {
    var jso = JSON.stringify(data.body.page.content);
    this.tables=data?.body?.page?.content;
    console.log(jso);

  }
  stringNullOrEmpty(value: any){
    if(value===""||value===null||value==undefined){
      return false;
    }else{
      return true;
    }
  }
  export() {
    // this.userProfileService.export(this.searchForm.value).subscribe(res => {
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     width: '20em',
    //     title: this.translateService.instant('alert.success-download'),
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    //   const name = res.headers.get('filename');
    //   const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //   this.saveFile(res.body, name, contentType);
    // });
  }
  saveFile(data: any, filename?: string, contentType?: string) {
    const blob = new Blob([data], {type: contentType});
    fileSaver.saveAs(blob, filename);
  }




  changePage(page) {
    if (page) {
      this.setPage({offset: page - 1})
    }
  }

  create() {
    const res = this.modalService.open(LeaveDialogComponent, {size: 'lg', centered: true});
    res.componentInstance.title = "Thêm mới nghỉ hưu/ thôi việc";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  edit(table) {
    const res = this.modalService.open(LeaveDialogComponent, {size: 'lg', centered: true});
    res.componentInstance.title = "Cập nhật nghỉ hưu/ thôi việc";
    res.componentInstance.inputData = table;
    res.componentInstance.action = "edit";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }


  delete(table:any) {
    // Hiển thị hộp thoại xác nhận
    const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");

    if (userConfirmed) {
      const body={
        id:table.id
      }
      this.profileService.deleteTranfer(body).subscribe(res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          width: '20em',
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(['/pages/category/leave']);
      }, (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          width: '20em',
          title: error.error.message,
          showConfirmButton: false,
          timer: 2500
        });
      })// Nếu người dùng chọn Yes, gọi API để xóa
    } else {
      // Nếu người dùng chọn No, thực hiện hành động nào đó (hoặc không làm gì)
      console.log("Hành động xóa đã bị hủy.");
    }
  }
  detail(table) {
    const res = this.modalService.open(TranfersDialogComponent, {size: 'lg', centered: true});
    res.componentInstance.title = "Chi tiết";
    res.componentInstance.inputData = table;
    res.componentInstance.action = "detail";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
}

