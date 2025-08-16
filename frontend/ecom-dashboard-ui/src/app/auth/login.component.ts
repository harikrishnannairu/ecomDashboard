import { Component, inject } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { TokenService } from "../core/services/token.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone:true,
    imports:[CommonModule, FormsModule],
    template: `

      <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-8">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign in</h1>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input name="email" ngModel required type="email"
                 class="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input name="password" ngModel required type="password"
                 class="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <button [disabled]="f.invalid || loading"
                class="w-full rounded-xl bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-500 disabled:opacity-60">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="text-xs text-gray-500 mt-6 text-center">
        Use your registered credentials. Contact admin if you don’t have access.
      </p>
    </div>
  </div>
    `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private token = inject(TokenService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  loading = false;

  onSubmit(f: NgForm) {
    if (f.invalid) return;
    this.loading = true;

    this.auth.login(f.value).subscribe({
      next: (res) => {
        this.token.setToken(res.token);
        const role = this.token.getRole();
        this.toast.success('Logged in successfully');

        // Redirect based on role
        if (role === 'ADMIN') {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl('/products');
        }
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Invalid credentials');
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }
}