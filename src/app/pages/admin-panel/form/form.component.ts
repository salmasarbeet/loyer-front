
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { User } from '../../../models/User';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'admin-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  errors!: string;
  postDone: boolean = false;
  adminForm!: FormGroup;
  PostSucces: string = 'Utilisateur ajouté avec succés';
  SubmitForm: string = 'Ajouter';
  Role1: boolean = false
  Role2: boolean = false
  Role3: boolean = false


  @Input() userR !: any;
  userIsEmpty: boolean = true;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnChanges() {

    if ((this.userR != 'Ajouter') && (this.userR != null)) {
      this.fetchUser();
      this.userIsEmpty = false;
      this.SubmitForm = 'Modifier'
    }
    else {
      this.userIsEmpty = true;
      this.SubmitForm = 'Ajouter'
      this.Role1 = false;
      this.Role2 = false;
      this.Role3 = false;

    }
  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      Matricule: new FormControl('', []),
      Nom: new FormControl('', []),
      Prenom: new FormControl('', []),
      Roles: new FormArray([]),
      deleted: new FormControl('',)
    });
  }

  fetchUser() {
    // this.adminForm.reset();
    const control = <FormArray>this.adminForm.controls['Roles'];
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i)
    }

    this.Role1 = false;
    this.Role2 = false;
    this.Role3 = false;


    // Fetch Info 
    this.adminForm.patchValue({

      Matricule: this.userR.userMatricul,
      Nom: this.userR.nom,
      Prenom: this.userR.prenom,
      deleted: this.userR.deleted

    });

    // Fetch Roles
    this.userR.userRoles.forEach((Role: any) => {

      let Role_ = this.AddRole('Old');

      Role_.controls.roleName.setValue(Role.roleName)
      Role_.controls.deleted.setValue(Role.deleted)

      if (!Role.deleted) {
        switch (Role.roleName) {
          case "Département Comptable": this.Role1 = true;
            break;

          case "Direction Affaires Juridiques et Conformité": this.Role2 = true;
            break;

          case "Direction Moyens Généraux": this.Role3 = true;
            break;

        }

      }
      // make thes roles checked
    });
  }

  AddRole(NewOrOld: any) {
    const RoleData = new FormGroup({
      roleName: new FormControl('',),
      deleted: new FormControl('',),
      NewOrOld: new FormControl(NewOrOld,)
    });

    (<FormArray>this.adminForm.get('Roles')).push(
      <FormGroup>RoleData
    );
    
    console.log(RoleData);
    return <FormGroup>RoleData;

    
  }

  removeUser(index: number) {
    (<FormArray>this.adminForm.get('Roles')).removeAt(index)
  }

  CheckedRoles(name: any) {

    let element = document.getElementById(name) as HTMLInputElement

    // put all the role names into a table 
    let Tab: string[] = [];

    this.adminForm.get('Roles')?.value.forEach((Role: any, index: any) => {

      Tab[index] = Role.roleName;

    });

    if (element.checked) {
      if (Tab.includes(element.value)) {
        this.adminForm.get('Roles')?.value.forEach((Role: any) => {
          if (Role.roleName == element.value) {
            Role.deleted = false;
          }
        });
      }
      else {
        let Role_ = this.AddRole('New');
        Role_.controls.roleName.setValue(element.value)
        Role_.controls.deleted.setValue(false)
      }
    }
    else {
      if (!element.checked) {
        this.adminForm.get('Roles')?.value.forEach((Role: any, index: any) => {
          if (Role.roleName == element.value) {
            if (Role.NewOrOld == 'Old') {
              Role.deleted = true;
            }
            else {
              this.removeUser(index)
            }
          }
        });
      }
    }
  }

  listeRoles() {
    let roles = [];
    let rolesCH = document.getElementsByClassName('roles');

    for (let index = 0; index < rolesCH.length; index++) {
      if ((rolesCH[index] as HTMLInputElement).checked) {
        roles.push({
          roleName: (rolesCH[index] as HTMLInputElement).value
        });
      }
    }

    return roles;

  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  postUserRole() {

    let userData: User = {
      userMatricul: this.adminForm.get('Matricule')?.value,
      nom: this.adminForm.get('Nom')?.value,
      prenom: this.adminForm.get('Prenom')?.value,
      userRoles: this.adminForm.get('Roles')?.value,
      deleted: false
    };

    this.adminService.addUser(userData).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.adminForm.reset();
          this.clearCH();
          this.postDone = false;
          location.reload();
        }, 1000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 2000);
        this.hideErrorMessage();
      }
    );

  }

  updateUserRole() {
    let userData: User = {
      userMatricul: this.adminForm.get('Matricule')?.value,
      nom: this.adminForm.get('Nom')?.value,
      prenom: this.adminForm.get('Prenom')?.value,
      userRoles: this.adminForm.get('Roles')?.value,
      deleted: this.adminForm.get('deleted')?.value
    };

    this.adminService.updateUser(userData, this.userR._id).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.adminForm.reset();
          this.clearCH();
          this.postDone = false;
          location.reload();
        }, 1000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 2000);
        this.hideErrorMessage();
      }
    );
  }

  clearCH() {
    let rolesCH = document.getElementsByClassName('roles');
    for (let index = 0; index < rolesCH.length; index++) {
      if ((rolesCH[index] as HTMLInputElement).checked) {
        (rolesCH[index] as HTMLInputElement).checked = false;
      }
    }
  }
}
