import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Input({ required: true }) user: User | null = null;
  @Output() login = new EventEmitter<void>();
  @Output() signUp = new EventEmitter<void>();
  @Output() searchTextChange = new EventEmitter<String>();
  searchText: string = '';
  onLogin() {
    this.login.emit();
  }
  onSignUp() {
    this.signUp.emit();
  }
  onSearchChange(value: string) {
    this.searchText = value;
    this.searchTextChange.emit(this.searchText);
  }
}
