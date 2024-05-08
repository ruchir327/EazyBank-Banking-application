import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = new User();

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService, private router: Router) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.user.authStatus = 'AUTH';
      this.user.name = this.userProfile.firstName || "";
      window.sessionStorage.setItem("userdetails", JSON.stringify(this.user));
      // this.router.navigate(['/dashboard']);
    }
  }

  public login() {
    this.keycloak.login();
  }
  public register() {
    this.keycloak.register();
  }
  public logout() {
    let redirectURI: string = "http://localhost:4200/home";
    this.keycloak.logout(redirectURI);
  }

}
