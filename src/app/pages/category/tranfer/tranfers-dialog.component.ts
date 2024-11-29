import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import Swal from "sweetalert2";
import {ProfileService} from "../../../core/services/profile.service";
@Component({
  selector: 'contract-dialog',
  templateUrl: './tranfers-dialog.component.html'
})
export class TranfersDialogComponent implements OnInit {
  inputData: any;
  title: string = '';
  listProfile:any;
  profile:any;
  action:any;
  dataForm: FormGroup = this.fb.group({
    id: [null], // Không cần xác thực
    profile_id:[null],
    gender:[null],
    nam_sinh:[null],
    chuc_vu:[null],
    ngay:[null],
    co_quan:[null],
    type:[null],
    codeAndName:[null],
    status:[null]
  });
  constructor(public modal: NgbActiveModal,
              private translateService: TranslateService,
              public profileService: ProfileService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    debugger;
    const body={};
    if(this.action==='detail'){
      this.dataForm.disable();
    }
    this.profileService.searchAll(body).subscribe(res=>{
      this.listProfile=res?.body?.body
    })
    this.dataForm.patchValue(this.inputData);
    this.dataForm.get("codeAndName").setValue(this.inputData?.code+"-"+this.inputData.fullname)
  }
  changeProfile(){
    debugger;
    var id = this.dataForm.get("profile_id").value;
    console.log("id is", id);
    this.profile = this.listProfile.find(item => item.id === Number(id));
    this.dataForm.get("gender").setValue(this.profile.gender);
    this.dataForm.get("nam_sinh").setValue(this.profile.nam_sinh);
    this.dataForm.get("chuc_vu").setValue(this.profile.chuc_vu);
  }
  changeType(){

  }
  save() {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      return
    }
    this.dataForm.get("type").setValue("01");
    const data = this.dataForm.value;
    this.profileService.create(data).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width: '20em',
        title: data.id ? this.translateService.instant('common.message.update-success') : this.translateService.instant('common.message.insert-success'),
        showConfirmButton: false,
        timer: 2500
      });
      this.modal.close({result: 'complete'});
    }, (error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        width: '20em',
        title: error.error.message,
        showConfirmButton: false,
        timer: 2500
      });
    })
  }

}

