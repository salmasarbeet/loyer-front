import { Lieu } from './../../../models/Lieu';
import { HelperService } from './../../../services/helpers/helper.service';
import { getLoading } from './../../../store/shared/shared.selector';
import { AppState } from './../../../store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationModalService } from '../../../services/confirmation-modal-service/confirmation-modal.service';
import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { Observable, timer, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getLieux } from '../lieux-store/lieux.selector';
import { getLieuxAction } from '../lieux-store/lieux.actions';

@Component({
  selector: 'app-list-lieux',
  templateUrl: './list-lieux.component.html',
  styleUrls: ['./list-lieux.component.scss'],
})
export class ListLieuxComponent implements OnInit, OnDestroy {
  lieux!: Lieu[];
  lieuEmpty: boolean = true;
  targetlieu: Lieu[] = [];
  targetlieuId: string = '';
  deletedLieu!: Lieu;
  loading: boolean = false;
  lieuxSubscription$!: Subscription;

  // Pagination options
  listLieuxPage: number = 1;
  count: number = 0;
  tableSize: number = 10;

  constructor(
    private lieuxService: LieuxService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // Throw get lieux from server function
    this.getAllLieux();

    // Check data loading status
    this.store.select(getLoading).subscribe((data) => {
      this.loading = data;
    });
  }

  getAllLieux() {
    // Select lieux from store
    this.lieuxSubscription$ = this.store.select(getLieux).subscribe((data) => {
      // Check if lieux data is empty then fetch it from server
      if (data.length === 0) {
        // Dispatch action to handle the NgRx get lieux from server effect
        this.store.dispatch(getLieuxAction());
      }
      this.lieux = data;
    });
  }

  openConfirmationModal(Lieu: any) {
    this.confirmationModalService.open(); // Open delete confirmation modal
    this.deletedLieu = Lieu;
  }

  openModalAndPushLieu(Lieu: any) {
    this.targetlieu = Lieu;
    this.mainModalService.open(); // Open delete confirmation modal
  }

  openModalAndPushLieuId(id: any) {
    // this.targetlieu = Lieu
    // setTimeout(() => {

    this.mainModalService.open(); // Open delete confirmation modal
    // }, 100);
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  checkAndPutText(value: any) {
    let text!: string;
    value ? (text = 'Oui') : (text = 'Non');
    return text;
  }

  // Refrtech the page
  refrechPage() {
    this.helperService.refrechPage();
  }

  ngOnDestroy() {
    this.lieuxSubscription$.unsubscribe();
  }

  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  deleteLieu() {
    this.lieuxService
      .deleteLieu(this.deletedLieu._id, { deleted: true })
      .subscribe(
        (_) => {
          // this.postDone = true;
          setTimeout(() => {
            // this.drForm.controls
            this.store.dispatch(getLieuxAction());
            this.confirmationModalService.close();
          }, 500);
        },
        (error) => {
          console.log(error.error.message);
          setTimeout(() => {
            this.showErrorMessage();
          }, 3000);
          this.hideErrorMessage();
        }
      );
  }
}
