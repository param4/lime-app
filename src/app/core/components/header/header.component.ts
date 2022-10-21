import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { concat } from 'rxjs';
import { CartService } from 'src/app/data/services/cart.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionService } from '../../services/session.service';
import { HeaderService } from '../../services/header.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartAmount: number = 0;

  isLoggedIn: boolean = false;
  showButtons: boolean = true;

  constructor(
    private session: SessionService,
    private snackBar: MatSnackBar,
    private cart: CartService,
    private header: HeaderService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    let loginStatus = this.session.isCustomerLoggedIn()
    if (loginStatus){
      this.isLoggedIn = true;
      this.session.setLoggedInStatus(true);
    }



    this.session.loggedInStatus$.subscribe(status => this.isLoggedIn = status);

    this.header.showHeaderButtons$.subscribe(visible => this.showButtons = visible);

    this.cart.cartValue.subscribe(cart => this.cartAmount = cart.itemCount);
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem("loggedInStatus")
    this.session.logout()
    // concat(
    //   this.auth.getClientSession()
    // ).subscribe(
    //   () => {
    //     this.snackBar.open('You have been logged out.', 'Close', { duration: 4000 });
    //     this.session.setLoggedInStatus(false);
    //   },
    //   err => this.snackBar.open('There was a problem logging you out.', 'Close', { duration: 4000 })
    // );
  }
}
