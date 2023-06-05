import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder,FormGroup,Validators,FormsModule} from '@angular/forms';
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

   
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) {
    
    this.form = this.formBuilder.group(
      {
        profileImage:[''],
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
     days:['',Validators.required,Validators.maxLength(4)],
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

  // onSelect(event){
  // if(event.target.files){
  // let reader = new FileReader();
  // console.log(reader , typeof(reader));
  // reader.readAsDataURL(event.target.files[0]);
  // console.log(reader, typeof(reader));
  // reader.onload = (event:any)=>{
  //   this.url = event.target.result;
  // }
  // console.log(reader, typeof(reader));
  // }
  // }
  onSelect(event) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileSizeMB = file.size / (1024 * 1024); // Size in MB
      if (fileSizeMB <= 2) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader);
        reader.onload = (event) => {
          // this.url = event.target.result;
          this.url = event.target.result as string;
          console.log(reader);
        };
      } else {
        // alert('File size exceeds the maximum limit of 2MB');
        this.toastr.error('File size exceeds the maximum limit of 2MB');
      }
    }
  }
ngOnInit(): void {
  if (!this.form.controls['modeOfWork'].value) {
    this.form.controls['city'].disable();
    this.form.controls['floor'].disable();
    this.form.controls['column'].disable();
    this.form.controls['seatNo'].disable();
    this.form.controls['days'].disable();
  }
  this.form.controls['modeOfWork'].valueChanges.subscribe(value => {
   if(value === 'Work from home'){
      this.form.controls['city'].disable();
      this.form.controls['floor'].disable();
      this.form.controls['column'].disable();
      this.form.controls['seatNo'].disable();
      this.form.controls['days'].disable(); 
    }
    else if (value === 'Hybrid') {
  this.form.controls['city'].enable();
  this.form.controls['floor'].enable();
  this.form.controls['column'].enable();
  this.form.controls['seatNo'].enable();
  this.form.controls['days'].enable(); 
  }
    else {
      this.form.controls['city'].enable();
      this.form.controls['floor'].enable();
      this.form.controls['column'].enable();
      this.form.controls['seatNo'].enable();
      this.form.controls['days'].disable(); 
    }
  });
}
}


   


