import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../core/models/page.model";
import {TranslateService} from "@ngx-translate/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import * as fileSaver from 'file-saver';
import {UserProfileService} from "../../../core/services/user.service";
import {ProfileService} from "../../../core/services/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
interface QuaTrinh {
  value_1:string;
  value_2:string;
  value_3:string;
  value_4:string;
  value_5:string;
  value_6:string;
  value_7:string;
  value_8:string;
  loai_qt:string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile-add.component.html'
})
export class ProfileAddComponent implements OnInit {
  ngOnInit(): void {
    const currentYear = new Date().getFullYear(); // Gets the current year dynamically

    for (let i = 1920; i <= currentYear; i++) {
      this.listNamSinh.push(i);
    }
    debugger;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const body2={
      id:this.id
    }
    this.profileServices.getAll(body2).subscribe(res=>{
      const response=res?.body?.body;
      this.dataForm.patchValue(response);
      this.danh_sach_qt=response.danh_sach_qt;
    })
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private profileServices:ProfileService,private router: Router,
              private translateService: TranslateService,) {
  };
  id:any;
  listNamSinh: number[] = [];
  quatrinh:any;
  danh_sach_qt:QuaTrinh[]=[];
  dataForm: FormGroup = this.fb.group({
    id: [null],
    code: [null],
    province: [null],
    subsidiary_unit: [null],
    basic_unit: [null],
    fullname:[null],
    gender:[null],
    other_name:[null],
    cap_uy_hien_tai:[null],
    cap_uy_kiem:[null],
    chuc_vu:[null],
    phu_cap_chuc_vu:[null],
    nam_sinh:[null],
    noi_sinh:[null],
    que_quan:[null],
    quan_huyen:[null],
    tinh_tp:[null],
    noi_o_hien_nay:[null],
    so_dien_thoai:[null],
    dan_toc:[null],
    ton_giao:[null],
    thanh_phan_gia_dinh:[null],
    nghe_nghiep_truoc_td:[null],
    ngay_tuyen_dung:[null],
    vao_co_quan:[null],
    ngay_vao_co_quan:[null],
    ngay_tham_gia_cm:[null],
    ngay_vao_dang:[null],
    ngay_chinh_thuc:[null],
    ngay_tham_gia_tc:[null],
    ngay_nhap_ngu:[null],
    ngay_xuat_ngu:[null],
    quan_ham:[null],
    giao_duc_pt:[null],
    hoc_ham_hoc_vi:[null],
    ly_luan_chinh_tri:[null],
    ngoai_ngu:[null],
    cong_tac_chinh:[null],
    ngach:[null],
    ma_so:[null],
    bac_luong:[null],
    he_so:[null],
    tu_thang:[null],
    danh_hieu_duoc_phong:[null],
    so_truong_cong_tac:[null],
    cong_viec_lau_nam:[null],
    khen_thuong:[null],
    ky_luat:[null],
    suc_khoe:[null],
    cao:[null],
    can_nang:[null],
    nhom_mau:[null],
    so_cmnd:[null],
    thuong_binh:[null],
    liet_sy:[null],
    danh_sach_qt:this.danh_sach_qt,
  });
  form_qua_trinh_ct: FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    loai_qt:"CONG_TAC"
  });
  form_qua_trinh_luong: FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    loai_qt:"LUONG"
  });
  form_qua_trinh_bien_che: FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    loai_qt:"BIEN_CHE"
  });
  form_qua_trinh_dao_tao: FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    loai_qt:"DAO_TAO"
  });
  form_qua_trinh_khen_thuong:FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    value_6:[null],
    value_7:[null],
    loai_qt:"KHEN_THUONG"
  });
  form_qua_trinh_ky_luat:FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    value_6:[null],
    value_7:[null],
    loai_qt:"KY_LUAT"
  });
  form_qua_trinh_bao_hiem:FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    loai_qt:"BAO_HIEM"
  });
  form_qua_trinh_cong_tac_dang:FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    loai_qt:"CONG_TAC_DANG"
  });
  form_qua_trinh_nang_luong:FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    value_6:[null],
    value_7:[null],
    value_8:[null],
    loai_qt:"NANG_LUONG"
  });
  form_qua_trinh_bo_nhiem_lai:FormGroup=this.fb.group({
    value_1:[null],
    value_2:[null],
    value_3:[null],
    value_4:[null],
    value_5:[null],
    loai_qt:"BO_NHIEM_LAI"
  });
  addQuatrinh(type:string){
    this.quatrinh={"thoi_gian_qt":null,mo_ta_qt:null,loai_qt:null};
    if(type==='CONG_TAC'){
      this.form_qua_trinh_ct.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_ct.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_ct.reset();
    }
    if(type==='LUONG'){
      this.form_qua_trinh_luong.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_luong.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_luong.reset();
    }
    if(type==='BIEN_CHE'){
      this.form_qua_trinh_bien_che.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_bien_che.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_bien_che.reset();
    }
    if(type==='DAO_TAO'){
      this.form_qua_trinh_dao_tao.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_dao_tao.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_dao_tao.reset();
    }
    if(type==='KHEN_THUONG'){
      this.form_qua_trinh_khen_thuong.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_khen_thuong.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_khen_thuong.reset();
    }
    if(type==='KY_LUAT'){
      this.form_qua_trinh_ky_luat.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_ky_luat.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_ky_luat.reset();
    }
    if(type==='BAO_HIEM'){
      this.form_qua_trinh_bao_hiem.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_bao_hiem.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_bao_hiem.reset();
    }
    if(type==='CONG_TAC_DANG'){
      this.form_qua_trinh_cong_tac_dang.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_cong_tac_dang.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_cong_tac_dang.reset();
    }
    if(type==='NANG_LUONG'){
      this.form_qua_trinh_nang_luong.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_nang_luong.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_nang_luong.reset();
    }
    if(type==='BO_NHIEM_LAI'){
      this.form_qua_trinh_bo_nhiem_lai.get('loai_qt').setValue(type);
      this.quatrinh = this.form_qua_trinh_bo_nhiem_lai.value;
      this.quatrinh// Lấy toàn bộ giá trị từ FormGroup
      this.danh_sach_qt.push(this.quatrinh);
      this.form_qua_trinh_bo_nhiem_lai.reset();
    }

  }
  delete(quatrinh:any){
    this.danh_sach_qt = this.danh_sach_qt.filter(p => p !== quatrinh);
  }
  save(){
    debugger;
      this.dataForm.get('danh_sach_qt').setValue(this.danh_sach_qt);
    const data = this.dataForm.value;
    this.profileServices.insertOrUpdate(data).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width: '20em',
        title: data.id ? this.translateService.instant('common.message.update-success') : this.translateService.instant('common.message.insert-success'),
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
    })
  }
}

