import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service'
import { TranslateService } from '@ngx-translate/core';
import { Directionality } from '@angular/cdk/bidi';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {


  IsAdmin: any;
  IsUser: any;
  show: boolean;
  direction = 'ltr';
  role: string
  getimage: string;
  empId: number;
  imgName: string;

  textDir: string = "ltr";
  selectedlang: string = '';


  constructor(private empService: EmployeeService, private AuthService: AuthService, public translate: TranslateService, public dir: Directionality, private route: Router,
  ) {
    this.show = true;
    translate.addLangs(['English', 'العربية']);
    this.selectedlang = 'English';
    localStorage.setItem("lang", "English");
    translate.setDefaultLang('English');
  }
  userName = localStorage.getItem("userName")
  ngOnInit(): void {
    this.getimage = environment.getImageByName
    this.role = localStorage.getItem("roles");
    this.empId = Number(localStorage.getItem('id'))
    this.empService.GetEmployee(this.empId).subscribe(w => {
      console.log(w)
      this.imgName = w.photo
    })
  }


  switchLang(lang: string) {
    this.textDir = "";
    console.log("lang", lang)

    if (lang == "English") {
      this.textDir = "ltr";
      localStorage.setItem("lang", lang);
    }
    else if (lang == "العربية") {
      this.textDir = "rtl";
      localStorage.setItem("lang", lang);
    }

    this.selectedlang = lang;
    this.translate.setDefaultLang(lang);
  }
  goToProfile() {
    this.route.navigate(['/Profile']);

  }
  logout() {
    this.AuthService.logout();
  }
  isAdmin() {
    this.show == this.show;
    return this.AuthService.IsAdmin();
  }
  isUser() {
    this.show != this.show;
    return this.AuthService.IsUser();

  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  //   changeDir($event) {
  //     //debugger;
  //     //console.log($event.target.value);
  //     // this.translate.use($event.target.value);
  //     sessionStorage.setItem("lang", $event.target.value);


  //     if ($event.target.value === 'English') {
  //       localStorage.setItem('dir', 'ltr');
  //     }
  //     if ($event.target.value === 'العربية') {
  //       localStorage.setItem('dir', 'rtl');
  //     }

  // console.log("test",this.dir)
  //   }
}
