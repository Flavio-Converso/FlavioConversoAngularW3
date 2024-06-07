import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUsers } from '../../models/iusers';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: iUsers | null;
  users: iUsers[] = [];
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user: iUsers | null) => {
      this.user = user;
    });
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
