import { Component, ViewChild } from '@angular/core';
import { User } from '../../../shared/models/user/user';
import { UsersService } from '../../../services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { DialogUserComponent } from '../../../shared/components/dialog-user/dialog-user.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  Users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.Users);
  searchValue = '';
  totalItems = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usuarioService: UsersService, 
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsers().subscribe(
      (usuarios: User[]) => {
        this.Users = usuarios;
        this.dataSource.data = usuarios;
        this.totalItems = usuarios.length;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // Función para aplicar filtro de búsqueda
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.searchValue;
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Función para limpiar búsqueda
  clearSearch() {
    this.searchValue = '';
    this.dataSource.filter = '';
  }

  // Método para eliminar un usuario
  delete(user: User) {
    this.showDialog(
      '¿Estás seguro de borrar este usuario?',
      `Se eliminará a ${user.name} permanentemente.`,
      'Eliminar'
    ).subscribe((result: boolean) => {
      if (result) {
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
          'Accion cancelada',
          'Operación cancelada satisfactoriamente',
          null
        );
      }
    });
  }

  showDialog(title: string, message: string, action: string | null) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
        action: action
      }
    });
    return dialogRef.afterClosed();
  }

  edit(user: User) {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '500px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.actualizarUsuario(result);
      }
    });
  }

  actualizarUsuario(usuario: User): void {
    this.usuarioService.updateUser(usuario).subscribe({
      next: (response) => {
        this.showDialog(
          'Usuario actualizado con éxito',
          `Se actualizó a ${usuario.nickname} satisfactoriamente`,
          null
        );
        this.getUsuarios();
      },
      error: (error) => {
        this.showDialog(
          'Error al actualizar el usuario',
          `Hubo un error al actualizar a ${usuario.nickname}`,
          null
        );
        console.log(error);
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
          password: result.password,
        };
        this.agregarUsuario(nuevoUsuario);
      }
    });
  }
}