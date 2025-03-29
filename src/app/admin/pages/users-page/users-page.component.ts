import { Component } from '@angular/core';
import {User} from '../../../shared/models/user/user'
import { UsersService } from '../../../services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { DialogUserComponent } from '../../../shared/components/dialog-user/dialog-user.component';
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
    this.usuarioService.getUsers().subscribe(
      (usuarios: User[]) => {
        this.Users = usuarios; 
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }


   // Método para eliminar un usuario
   delete(user: User) {
    
    // Mostrar el diálogo de confirmación
    this.showDialog(
      '¿Estás seguro de borrar este usuario?',
      `Se eliminará a ${user.nickname} permanentemente.`,
      'Eliminar'
    ).subscribe((result: boolean) => {
      if (result) {
        // Si el usuario confirma, llamar al servicio para eliminar
        this.usuarioService.deleteUser(user.id).subscribe({
          next: () => {
            this.showDialog(
              'Usuario Eliminado',
              'El usuario fue eliminado satisfactoriamente',
              null
            );
            this.getUsuarios();
          },
          error: (err) => {
            this.showDialog(
              'Error al eliminar el usuario',
              'Hubo un error al eliminar el usuario :(',
              null
            );
          }
        });
      } else {
        this.showDialog(
          'Accion cancelada ',
          'Operación cancelada satisfactoriamente',
          null
        );
      }
    });
  }

  showDialog(tittle:string,message:string,action:string | null){
   const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: tittle,
        message: message,
        action: action
      }
    });

    return dialogRef.afterClosed();
  }

    edit(user: User) {
  // Abre el diálogo con los datos del usuario seleccionado
  const dialogRef = this.dialog.open(DialogUserComponent, {
    width: '500px',
    data: user, // Pasa el usuario seleccionado al diálogo
  });

  // Cuando se cierra el diálogo
  dialogRef.afterClosed().subscribe((result: User) => {
    if (result) {
      console.log('Usuario editado:', result);
      this.actualizarUsuario(result); // Llama al método para actualizar el usuario
    }
  });
  }

  // Método para actualizar el usuario
actualizarUsuario(usuario: User): void {
  this.usuarioService.updateUser(usuario).subscribe({
    next: (response) => {
      this.showDialog(
        'Usuario actualizado con éxito',
        `Se actualizó a ${usuario.nickname} satisfactoriamente`,
        null
      );
      this.getUsuarios(); // Actualiza la lista de usuarios
    },
    error: (error) => {
      this.showDialog(
        'Error al actualizar el usuario',
        `Hubo un error al actualizar a ${usuario.nickname} `,
        null
      );
      console.log(error)
    },
  });
}

  agregarUsuario(usuario: User): void {
    this.usuarioService.addUser(usuario).subscribe({
      next: (response) => {
        this.showDialog(
          'Usuario agregado con éxito',
          `Se agregó a ${usuario.name} satisfactoriamente`,
          null
        );
        this.getUsuarios();
      },
      error: (error) => {
        this.showDialog(
          'Error al agregar al usuario',
          `Hubo un error al agregar al usuario ${usuario.name}`,
          null
        );
      },
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        const nuevoUsuario: User = {
          id: "",
          name: result.name,
          email: result.email,
          phone: result.phone,
          user_type: result.user_type || 'usuario', 
          nickname: result.nickname,
          password: result.password, // Se enviará al backend, que lo cifrará
        };

        console.log('Usuario a agregar:', nuevoUsuario);
        this.agregarUsuario(nuevoUsuario); 
      }
    });
}



}
