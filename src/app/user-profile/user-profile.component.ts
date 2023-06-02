import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form : FormGroup;
  submitted = false;
  phoneNumberPattern = "^[0-9]+$";
  url="../../assets/images/profile.png";
  private base64textString:String="";

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) {
    
    this.form = this.formBuilder.group(
      {
    profileImage: [null, {
      required: true,
      accept: ['image/jpeg', 'image/png']
    }],
     phoneNumber : [
      '' , 
      [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
       Validators.pattern(this. phoneNumberPattern)
      ],
      ],
     designation : ['' , Validators.required],
     modeOfWork : ['' , Validators.required],
     selectedDays: [[], Validators.compose([Validators.required, Validators.maxLength(4)])],
     city : ['' , Validators.required],
     floor : ['' , Validators.required],
     column : ['', Validators.required],
     seatNo : [ '', Validators.required],
     
   });
   }
  
   get f():{ [key: string]: AbstractControl }{
    return this.form.controls;
   }
  
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
 }

  onSelect(event){
  if(event.target.files){
  let reader = new FileReader();
  console.log(reader , typeof(reader));
  reader.readAsDataURL(event.target.files[0]);
  console.log(reader, typeof(reader));
  reader.onload = (event:any)=>{
    this.url = event.target.result;
  }
  console.log(reader, typeof(reader));
  }
  }

showSuccessToast() {
  this.toastr.success('Image uploaded successfully', 'Success');
}

ngOnInit(): void {
  this.form.controls['modeOfWork'].valueChanges.subscribe(value => {
     if(value === 'Work from home'){
      this.form.controls['city'].disable();
      this.form.controls['floor'].disable();
      this.form.controls['column'].disable();
      this.form.controls['seatNo'].disable();
    }
    else {
      this.form.controls['city'].enable();
      this.form.controls['floor'].enable();
      this.form.controls['column'].enable();
      this.form.controls['seatNo'].enable();
    }
  });
}
  }
  


   


