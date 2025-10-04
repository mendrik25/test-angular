import { Component, inject, signal } from '@angular/core';
import { AuthenticationComponent } from '../../components/authentication/authentication.component';
import { Credentials } from '../../interfaces/credentials.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-root',
  imports: [AuthenticationComponent],
  templateUrl: './authentication-root.component.html',
  styleUrl: './authentication-root.component.scss',
})
export class AuthenticationRootComponent {
  private authService = inject(AuthenticationService);
  private route = inject(Router);
  errorMessage = signal<string | null>(null);

  onLogin(credentials: Credentials) {
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('access_token', response.data.token);
        this.route.navigate(['/exam']);
        this.errorMessage.set(null);
      },
      error: (error) => {
        this.errorMessage.set(error.error.message);
      },
    });
  }
}
