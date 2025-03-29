import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://fortin.christba.com/api/Users';

  constructor(private http: HttpClient) {}

  //Metodo para obtener todos los Users
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  //Metodo para obtener un User mediante el id
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  } 

  addUser(User: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, User);
  }

  updateUser(user: User): Observable<User> {
    if (!user.id) throw Error('User ID is required');
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);

    console.log(user);
  }
  
}
