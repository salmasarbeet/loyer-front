import { HelperService } from './../../services/helpers/helper.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MainModalService } from './../../services/main-modal/main-modal.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})

export class AccessDeniedComponent implements OnInit {

  id: string;
  role!: string

  constructor(
    private actRoute: ActivatedRoute,
    private mainModalService: MainModalService,
    private authService: AuthService,
    private router: Router,
    private HelperService: HelperService,
  ) { 
    this.id = 'access-denied'
  }

  ngOnInit(): void {
    this.mainModalService.open(this.id);
    this.role = this.actRoute.snapshot.paramMap.get('role') || ''
  }

  logout() {
    this.authService.logOut()
  }

  backToHome() {
    this.router.navigate([''])
  }
}
