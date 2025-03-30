import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, action?: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  // Nuevos métodos para el diseño
  getTitleIcon(): string {
    if (!this.data.action) return 'info'; // Diálogo informativo
    return this.data.action.toLowerCase().includes('eliminar') ? 'warning' : 'help_outline';
  }

  getMessageIcon(): string {
    if (!this.data.action) return 'check_circle'; // Diálogo informativo
    return this.data.action.toLowerCase().includes('eliminar') ? 'warning' : 'help';
  }

  getActionColor(): string {
    if (!this.data.action) return 'primary'; // Diálogo informativo
    return this.data.action.toLowerCase().includes('eliminar') ? 'warn' : 'primary';
  }

  getActionIcon(): string {
    if (!this.data.action) return 'check_circle'; // Diálogo informativo
    return this.data.action.toLowerCase().includes('eliminar') ? 'delete_forever' : 'check_circle';
  }
}