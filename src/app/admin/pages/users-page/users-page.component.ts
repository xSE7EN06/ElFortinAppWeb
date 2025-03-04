import { Component } from '@angular/core';

export interface UserData {
  id: string;
  name: string;
  role: string;
}

const ELEMENT_DATA: UserData[] = [
  {id: '1', name: 'John Doe', role: 'Administrator'},
  {id: '2', name: 'Jane Doe', role: 'User'},
  // más usuarios...
];


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
  standalone: false
})
export class UsersPageComponent {
  displayedColumns: string[] = ['id', 'name', 'role', 'actions'];
  dataSource = ELEMENT_DATA;


  edit(user: UserData) {
    // Aquí va la lógica para editar un usuario
    console.log('Edit user:', user);
    // Por ejemplo, abrir un modal de edición o redirigir a un formulario de edición
  }

  delete(user: UserData) {
    // Aquí va la lógica para eliminar un usuario
    console.log('Delete user:', user);
    // Implementa la eliminación de usuarios aquí
  }
}
