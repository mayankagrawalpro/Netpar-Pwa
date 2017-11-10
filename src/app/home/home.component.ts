import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppProvider } from '../providers/app';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExistingUserCheckComponent } from '../alerts/existing-user-check/existing-user-check.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog,private appProvider:AppProvider,private router: Router,private location: Location) { }

  ngOnInit() {
  }

  onBack(){
  	this.location.back();
  }

  onSignIn(){
    this.appProvider.current.fromPageFlag="login";
   	this.router.navigate(['/login'],{skipLocationChange:true});
  }

  onSignUp(){
    this.appProvider.current.fromPageFlag="signup";
  	this.router.navigate(['/registerationStepOne'],{skipLocationChange:true})
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ExistingUserCheckComponent, {
        width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         if(result=="SignIn"){
          this.appProvider.current.loginOrUpdateFlag="SignIn" ;
          this.router.navigate(['/login'],{skipLocationChange:true})
         }else if (result=="Update") {
           this.appProvider.current.loginOrUpdateFlag="Update";
           this.router.navigate(['/login'],{skipLocationChange:true})
         }
      }
    });
  }

}
