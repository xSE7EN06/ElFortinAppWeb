import { Component } from '@angular/core';
import {User} from '../../../shared/models/user/user'
import { UsersService } from '../../../services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { DialogUserComponent } from '../../../shared/components/dialog-user/dialog-user.component';
import { Usuario } from '../../../shared/interfaces/usuario';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
  standalone: false
})
export class UsersPageComponent {
  displayedColumns: string[] = ['id', 'name','email','phone', 'user_type', 'actions'];
  Users: User[] = [];

  constructor(private usuarioService: UsersService, private dialog: MatDialog,private router: Router){}


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
  // Abre el diálogo con los datos del usuario seleccionado
  const dialogRef = this.dialog.open(DialogUserComponent, {
    width: '500px',
    data: user, // Pasa el usuario seleccionado al diálogo
  });

  // Cuando se cierra el diálogo
  dialogRef.afterClosed().subscribe((result: Usuario) => {
    if (result) {
      console.log('Usuario editado:', result);
      this.actualizarUsuario(result); // Llama al método para actualizar el usuario
    }
  });
  }

  // Método para actualizar el usuario
actualizarUsuario(usuario: Usuario): void {
  this.usuarioService.updateUsuario(usuario).subscribe({
    next: (response) => {
      this.mostrarDialog(
        'Usuario actualizado con éxito',
        `Se actualizó a ${usuario.nickname} satisfactoriamente`,
        null
      );
      this.getUsuarios(); // Actualiza la lista de usuarios
    },
    error: (error) => {
      this.mostrarDialog(
        'Error al actualizar el usuario',
        `Hubo un error al actualizar a ${usuario.nickname}`,
        null
      );
    },
  });
}

  add(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe((result: Usuario) => {
      if (result) {
        // Generar el ID único antes de agregar el usuario
        const nuevoUsuario: Usuario = {
          name: result.name,
          email: result.email,
          phone: result.phone,
          user_type: result.user_type || 'usuario', // Asigna un rol por defecto si no se proporciona
          nickname:result.nickname,
          password: result.password,
        };
  
        console.log('Usuario a agregar:', nuevoUsuario);
        this.agregarUsuario(nuevoUsuario); // Llama al método para agregar el usuario
      }
    });
  }

  agregarUsuario(usuario: Usuario): void {
    this.usuarioService.addUsuario(usuario).subscribe({
      next: (response) => {
        this.mostrarDialog(
          'Usuario agregado con éxito',
          `Se agregó a ${usuario.name} satisfactoriamente`,
          null
        );
        this.getUsuarios();
      },
      error: (error) => {
        this.mostrarDialog(
          'Error al agregar al usuario',
          `Hubo un error al agregar al usuario ${usuario.name} ${error}`,
          null
        );
      },
    });
  }


   // Método para eliminar un usuario
   delete(user: User) {
    // Mostrar el diálogo de confirmación
    this.mostrarDialog(
      '¿Estás seguro de borrar este usuario?',
      `Se eliminará a ${user.name} permanentemente.`,
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
