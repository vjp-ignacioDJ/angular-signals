import { Component, signal, OnInit, computed } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css'],
})
export class UserInfoPageComponent implements OnInit {


  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>(() => {
    if (!this.currentUser()) return 'usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  constructor(private readonly userSrv: UsersServiceService) {}
  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if (id <= 0) return;
    this.userId.set(id);
    this.currentUser.set(undefined);

    this.userSrv.getUserById(id).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error:(error)=>{
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      }
    });
  }
}
