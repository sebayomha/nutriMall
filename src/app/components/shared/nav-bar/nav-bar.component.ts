import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Response } from 'src/app/models/response';
import { Router } from '@angular/router';
import { AppSettings } from '../../../appConstants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  USER_ROLE;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.USER_ROLE = AppSettings.USER_ROLE;
  }

  logout(): void {
    this.authService.logout(this.authService.decodePayload().idUsuario).subscribe( (response: Response) => {
      if (response.code == 0) {
        this.router.navigate(['login']);
        localStorage.clear();
      }
    })
  }

  focusSideNav() {
    document.getElementById("sarasa").focus();
  }
}
