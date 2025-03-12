import { Component } from '@angular/core';
import {User} from '../../../shared/models/user/user'
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
  standalone: false
})
export class UsersPageComponent {
  displayedColumns: string[] = ['id', 'name','email', 'role', 'actions'];
  Users: User[] = [];

  constructor(private usuarioService: UsersService){}

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

  delete(user: User) {
 
  }
}
