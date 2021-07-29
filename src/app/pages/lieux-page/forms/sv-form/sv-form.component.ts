import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Lieu } from 'src/app/models/Lieu';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';

@Component({
  selector: 'sv-form',
  templateUrl: './sv-form.component.html',
  styleUrls: ['./sv-form.component.scss']
})
export class SvFormComponent implements OnInit {

  constructor(private svService: LieuxService , private lieuService: LieuxService ,private mainModalService: MainModalService) { }

  hasAmenagement: boolean = false;
  svForm!: FormGroup;
  errors!: any;
  postDone: boolean = false;
  PostSucces: string = 'Point de vente ajouté avec succés';
  UpdateDone: boolean = false;
  UpdateSucces: string = 'Point de vente modifié avec succés';

  @Input() update!: boolean;
  @Input() Lieu!: any;



  ngOnChanges() {
    if ( this.Lieu !== "") {
      setTimeout(() => {
        this.fetchSv();
      }, 100);
    }
  }



  ngOnInit(): void {
    this.svForm = new FormGroup({
      code_lieu: new FormControl(''),
      intitule_lieu: new FormControl(''),
      intitule_DR: new FormControl(''),
      adresse: new FormControl(''),
      ville: new FormControl(''),
      code_localite: new FormControl(''),
      desc_lieu_entrer: new FormControl(''),
      imgs_lieu_entrer: new FormControl(''),
      has_amenagements: new FormControl(''),
      etat_logement_fonction: new FormControl(''),
      etage: new FormControl(''),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      telephone: new FormControl(''),
      fax: new FormControl(''),
      superficie: new FormControl(''),

      //Aménagement
      amenagementForm: new FormArray([]),

    })
  }



  fetchSv() {

    this.removeAllAmenagement();

    // this.etatLogement = this.Lieu.etat_logement_fonction;

    console.log(this.Lieu.directeur_regional);
    

    if (this.Lieu.has_amenagements) {
      this.hasAmenagement = true;
      this.svForm.patchValue({
        code_lieu: this.Lieu.code_lieu,
        intitule_lieu: this.Lieu.intitule_lieu,
        intitule_DR: this.Lieu.intitule_DR,
        adresse: this.Lieu.adresse,
        ville: this.Lieu.ville,
        code_localite: this.Lieu.code_localite,
        desc_lieu_entrer: this.Lieu.desc_lieu_entrer,
        imgs_lieu_entrer: this.Lieu.imgs_lieu_entrer,
        has_amenagements: this.Lieu.has_amenagements,
        superficie: this.Lieu.superficie,
        telephone: this.Lieu.telephone,
        fax: this.Lieu.fax,
        etat_logement_fonction: this.Lieu.etat_logement_fonction,
        etage: this.Lieu.etage,
        type_lieu: this.Lieu.type_lieu,
        code_rattache_DR: this.Lieu.code_rattache_DR,
        code_rattache_SUP: this.Lieu.code_rattache_SUP,
        intitule_rattache_SUP_PV: this.Lieu.intitule_rattache_SUP_PV,
        centre_cout_siege: this.Lieu.centre_cout_siege,
        categorie_pointVente: this.Lieu.categorie_pointVente,
      });
      
      
      // Amenagement
      for (let LieuControl of this.Lieu.amenagements ) {

        let formGroupAmenagement = this.addAmenagement();

        formGroupAmenagement.controls.nature_amenagement.setValue(
          LieuControl.nature_amenagement
        );

        formGroupAmenagement.controls.montant_amenagement.setValue(
          LieuControl.montant_amenagement
        );

        formGroupAmenagement.controls.valeur_nature_chargeProprietaire.setValue(
          LieuControl.valeur_nature_chargeProprietaire
        );

        formGroupAmenagement.controls.valeur_nature_chargeFondation.setValue(
          LieuControl.valeur_nature_chargeFondation
        );

        formGroupAmenagement.controls.numero_facture.setValue(
          LieuControl.numero_facture
        );

        formGroupAmenagement.controls.numero_bon_commande.setValue(
          LieuControl.numero_bon_commande
        );

        formGroupAmenagement.controls.date_passation_commande.setValue(
          LieuControl.date_passation_commande
        );

        formGroupAmenagement.controls.evaluation_fournisseur.setValue(
          LieuControl.evaluation_fournisseur
        );

        formGroupAmenagement.controls.date_fin_travaux.setValue(
          LieuControl.date_fin_travaux
        );

        formGroupAmenagement.controls.date_livraison_local.setValue(
          LieuControl.date_livraison_local
        );

        
        
        if (LieuControl.fournisseurs.length !== 0) {
          for (let FourniseurControl of LieuControl.fournisseurs ) {

            // console.log(formGroupAmenagement);
            
            let formGroupFournisseur = new FormGroup({
              nom: new FormControl(''),
              prenom: new FormControl(''),
              amenagement_effectue: new FormControl(''),
            });
        
            (<FormArray>formGroupAmenagement.controls.fournisseur).push(<FormGroup>formGroupFournisseur)
    
            formGroupFournisseur.controls.nom.setValue(
              FourniseurControl.nom
            );
    
            formGroupFournisseur.controls.prenom.setValue(
              FourniseurControl.prenom
            );
    
            formGroupFournisseur.controls.amenagement_effectue.setValue(
              FourniseurControl.amenagement_effectue
            );
            
    
          }
        }
 
      }
    } else {
      this.hasAmenagement = false;
      this.svForm.patchValue({
        code_lieu: this.Lieu.code_lieu,
        intitule_lieu: this.Lieu.intitule_lieu,
        intitule_DR: this.Lieu.intitule_DR,
        adresse: this.Lieu.adresse,
        ville: this.Lieu.ville,
        code_localite: this.Lieu.code_localite,
        desc_lieu_entrer: this.Lieu.desc_lieu_entrer,
        imgs_lieu_entrer: this.Lieu.imgs_lieu_entrer,
        has_amenagements: this.Lieu.has_amenagements,
        superficie: this.Lieu.superficie,
        telephone: this.Lieu.telephone,
        fax: this.Lieu.fax,
        etat_logement_fonction: this.Lieu.etat_logement_fonction,
        etage: this.Lieu.etage,
        type_lieu: this.Lieu.type_lieu,
        code_rattache_DR: this.Lieu.code_rattache_DR,
        code_rattache_SUP: this.Lieu.code_rattache_SUP,
        intitule_rattache_SUP_PV: this.Lieu.intitule_rattache_SUP_PV,
        centre_cout_siege: this.Lieu.centre_cout_siege,
        categorie_pointVente: this.Lieu.categorie_pointVente,
        // amenagement inputs
        nature_amenagement: '',
        montant_amenagement: '',
        valeur_nature_chargeP: '',
        valeur_nature_chargeF: '',
        numero_facture: '',
        numero_bon_commande: '',
        date_passation_commande: '',
        evaluation_fournisseur: '',
        date_fin_travaux: '',
        date_livraison_local: '',
      });
    }
  }



  // Amenagement
  addAmenagement() {
    const amenagementData = new FormGroup({
      nature_amenagement: new FormControl(''),
      montant_amenagement: new FormControl(''),
      valeur_nature_chargeProprietaire: new FormControl(''),
      valeur_nature_chargeFondation: new FormControl(''),
      numero_facture: new FormControl(''),
      numero_bon_commande: new FormControl(''),
      date_passation_commande: new FormControl(''),
      evaluation_fournisseur: new FormControl(''),
      date_fin_travaux: new FormControl(''),
      date_livraison_local: new FormControl(''),
      fournisseur: new FormArray([]),
      images_local_apres_amenagement: new FormControl(''),
      croquis_amenagement_via_imagerie: new FormControl(''),
    });

    (<FormArray>this.svForm.get('amenagementForm')).push(<FormGroup>amenagementData)

    return (<FormGroup>amenagementData)

  }



  removeAmenagement(index: number) {
    (<FormArray>this.svForm.get('amenagementForm')).removeAt(index)
  }



  removeAllAmenagement() {
    (<FormArray>this.svForm.get('amenagementForm')).clear();
  }



  // FournisseurData
  addFournisseur(amenagementForm: any, index: number) {
    let fournisseurData = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      amenagement_effectue: new FormControl(''),
    });

    (<FormArray>amenagementForm.controls[index].controls.fournisseur).push(<FormGroup>fournisseurData)
  }



  removeFournisseur(amenagementForm: any, index: number) {
    (<FormArray>amenagementForm.controls[index].controls.fournisseur).removeAt(index)
  }



  getFournisseur(amenagementForm: any, i: number) {
    return (amenagementForm.controls[i].controls.fournisseur).controls
  }



   // Afficher le message d'erreur de serveur
   showErrorMessage() {
    $('.error-alert').addClass('active');
  }



  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }


  
  onAddSv() {
    let svData: Lieu = {
      code_lieu: this.svForm.get('code_lieu')?.value,
      intitule_lieu: this.svForm.get('intitule_lieu')?.value,
      intitule_DR: this.svForm.get('intitule_DR')?.value,
      adresse: this.svForm.get('adresse')?.value,
      ville: this.svForm.get('ville')?.value,
      code_localite: this.svForm.get('code_localite')?.value,
      desc_lieu_entrer: this.svForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.svForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.svForm.get('has_amenagements')?.value,
      superficie: this.svForm.get('superficie')?.value,
      telephone: this.svForm.get('telephone')?.value,
      fax: this.svForm.get('fax')?.value,
      etat_logement_fonction: this.svForm.get('etat_logement_fonction')?.value,
      etage: this.svForm.get('etage')?.value,
      type_lieu: this.svForm.get('type_lieu')?.value,
      code_rattache_DR: this.svForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.svForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.svForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.svForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.svForm.get('categorie_pointVente')?.value,
    
      //Aménagement
        amenagement: this.svForm.get('amenagementForm')?.value,
    }

  
      this.svService.addLieu(svData).subscribe(
        (_) => {
          this.postDone = true;
          setTimeout(() => {
            this.svForm.reset();
            this.postDone = false;
          }, 2000); 
        },
        (error) => {
          this.errors = error.error.message;
          setTimeout(() => {
            this.showErrorMessage();
          }, 3000);
          this.hideErrorMessage();
        }
      );

  }



  updateSv() {
    let idlf = this.Lieu._id;
    let lfData: Lieu = {
      code_lieu: this.svForm.get('code_lieu')?.value,
      intitule_lieu: this.svForm.get('intitule_lieu')?.value,
      intitule_DR: this.svForm.get('intitule_DR')?.value,
      adresse: this.svForm.get('adresse')?.value,
      ville: this.svForm.get('ville')?.value,
      code_localite: this.svForm.get('code_localite')?.value,
      desc_lieu_entrer: this.svForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.svForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.svForm.get('has_amenagements')?.value,
      superficie: this.svForm.get('superficie')?.value,
      telephone: this.svForm.get('telephone')?.value,
      fax: this.svForm.get('fax')?.value,
      etat_logement_fonction: this.svForm.get('etat_logement_fonction')?.value,
      etage: this.svForm.get('etage')?.value,
      type_lieu: this.svForm.get('type_lieu')?.value,
      code_rattache_DR: this.svForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.svForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.svForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.svForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.svForm.get('categorie_pointVente')?.value,

      // Amenagement
      amenagement: this.svForm.get('amenagementForm')?.value,
    }

    this.lieuService.updateLieux(idlf , lfData).subscribe(
      (_) => {
        this.UpdateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.svForm.reset();
          this.UpdateDone = false;
          location.reload();
        }, 2000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
        this.hideErrorMessage();
      }
    )
  }



  get code_lieu(){
    return this.svForm.get('code_lieu');
  }

  get intitule_lieu(){
    return this.svForm.get('intitule_lieu');
  }

  get intitule_DR(){
    return this.svForm.get('intitule_DR');
  }

  get adresse(){
    return this.svForm.get('adresse');
  }

  get ville(){
    return this.svForm.get('ville');
  }

  get code_localite(){
    return this.svForm.get('code_localite');
  }

  get desc_lieu_entrer(){
    return this.svForm.get('desc_lieu_entrer');
  }

  get imgs_lieu_entrer(){
    return this.svForm.get('imgs_lieu_entrer');
  }

  get has_amenagements(){
    return this.svForm.get('has_amenagements');
  }

  get amenagements(){
    return this.svForm.get('amenagements');
  }

  get etat_logement_fonction(){
    return this.svForm.get('etat_logement_fonction');
  }

  get etage(){
    return this.svForm.get('etage');
  }

  get telephone(){
    return this.svForm.get('telephone');
  }

  get fax(){
    return this.svForm.get('fax');
  }

  get superficie(){
    return this.svForm.get('superficie');
  }

  get type_lieu(){
    return this.svForm.get('type_lieu');
  }

  get code_rattache_DR(){
    return this.svForm.get('code_rattache_DR');
  }

  get code_rattache_SUP(){
    return this.svForm.get('code_rattache_SUP');
  }

  get intitule_rattache_SUP_PV(){
    return this.svForm.get('intitule_rattache_SUP_PV');
  }

  get centre_cout_siege(){
    return this.svForm.get('centre_cout_siege');
  }

  get categorie_pointVente(){
    return this.svForm.get('categorie_pointVente');
  }

  get amenagementForm(): FormArray {
    return (<FormArray>this.svForm.get('amenagementForm'));
  }
}
