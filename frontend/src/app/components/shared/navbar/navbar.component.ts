import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin = false;
  showMenu = false;
  constructor(private loginService: LoginService) {
    this.showMenu = this.loginService.isLoged();

   }

  ngOnInit(): void {
    this.loginService.isLoged$.subscribe( res => this.showMenu = res );
    this.loginService.userRole$.subscribe( role => {
      if(role == "Administrador"){
        this.isAdmin = true;
      }
    } )
  }

  logout(){
    this.loginService.logOut()
  }

}
