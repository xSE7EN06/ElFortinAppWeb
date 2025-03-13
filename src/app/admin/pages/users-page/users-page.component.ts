import { Component } from '@angular/core';
import {User} from '../../../shared/models/user/user'
import { UsersService } from '../../../services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
  standalone: false
})
export class UsersPageComponent {
  displayedColumns: string[] = ['id', 'name','email', 'role', 'actions'];
  Users: User[] = [];
  constructor(private usuarioService: UsersService, private dialog: MatDialog,){}


  ngOnInit(){
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios: User[]) => {
        this.Users = usuarios; 
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  edit(user: User) {
  
  }

   // Método para eliminar un usuario
   delete(user: User) {
    // Mostrar el diálogo de confirmación
    this.mostrarDialog(
      '¿Estás seguro de borrar este usuario?',
      `Se eliminará a ${user.nickname} permanentemente.`,
      'Eliminar'
    ).subscribe((result: boolean) => {
      if (result) {
        // Si el usuario confirma, llamar al servicio para eliminar
        this.usuarioService.deleteUsuario(user.id).subscribe({
          next: () => {
            this.mostrarDialog(
              'Usuario Eliminado',
              'El usuario fue eliminado satisfactoriamente',
              null
            );
            this.getUsuarios();
          },
          error: (err) => {
            this.mostrarDialog(
              'Error al eliminar el usuario',
              'Hubo un error al eliminar el usuario :(',
              null
            );
          }
        });
      } else {
        this.mostrarDialog(
          'Accion cancelada ',
          'Operación cancelada satisfactoriamente',
          null
        );
      }
    });
  }

  mostrarDialog(tittle:string,message:string,action:string | null){
   const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: tittle,
        message: message,
        action: action
      }
    });

    return dialogRef.afterClosed();
  }

}
