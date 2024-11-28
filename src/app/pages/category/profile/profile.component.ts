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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  // breadCrumbItems = [{label: 'menu.sysMng'}, {label: 'users.title', active: true}];

  searchForm: FormGroup = this.fb.group({
    code:[null],
    fullname:[null],
    gender:[null],
    dantoc:null,
  });
  lstProductType: any = [];
  lstGroup: any = [];
  lstDepts = [];
  lstStatus: any = [];
  tables: any = [];
  selectedAll: boolean = false;
  page = new Page();
  searchModel: any;
  userSearch:any;
  role: any;
  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private translateService: TranslateService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.role=localStorage.getItem("role");
    this.page.size = 10;
    this.setPage({offset: 0});
  }

  search() {
    console.log("aaa",this.searchForm.get("username").value);
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    this.profileService.search({
      pageNumber: '0',
      pageSize: 10,
      dantoc:this.stringNullOrEmpty(this.searchForm.get("dantoc").value)? {contains:this.searchForm.get("dantoc").value}:null,
      gender:this.stringNullOrEmpty(this.searchForm.get("gender").value)? {contains:this.searchForm.get("gender").value}:null,
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

  selectAllChange() {
    this.tables = this.tables.map(e => {
      e['selected'] = this.selectedAll;
      return e
    })
  }
  deleteCheck(tables: any) {
    if (tables.filter(e => e.selected === true).length === 0) {
      return true
    } else return false
  }

  changePage(page) {
    if (page) {
      this.setPage({offset: page - 1})
    }
  }

  create() {
    this.router.navigate(['/pages/category/profile/add']);
    // const res = this.modalService.open(UsersDialogComponent, {size: 'lg', centered: true});
    // res.componentInstance.title = this.translateService.instant('users.create_title');
    // res.closed.subscribe(temp => {
    //   this.setPage({offset: 0})
    // })
  }
  delete(table: any) {
    // Hiển thị hộp thoại xác nhận
    const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");

    if (userConfirmed) {
      const body={
        id:table.id
      }
      this.profileService.delete(body).subscribe(res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          width: '20em',
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(['/pages/category/profile']);
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




}

