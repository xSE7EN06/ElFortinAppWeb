import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {
  usuarioForm: FormGroup;
  isEditMode: boolean = false;
  showPasswordFields: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogUserComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.id;
    
    this.usuarioForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      user_type: ['', Validators.required],
      nickname: ['', Validators.required],
      password: [''],
      confirm_password: ['']
    }, { validator: this.passwordMatchValidator });

    if (!this.isEditMode) {
      this.setPasswordValidators(true);
    }
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.usuarioForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        email: this.data.email,
        phone: this.data.phone,
        user_type: this.data.user_type,
        nickname: this.data.nickname
      });
      
      // Ocultar campos de contraseña inicialmente
      this.showPasswordFields = false;
    }

    this.setupPasswordValidation();
  }

  private setPasswordValidators(required: boolean): void {
    const validators = required ? [Validators.required, Validators.minLength(8)] : [];
    this.usuarioForm.get('password')?.setValidators(validators);
    this.usuarioForm.get('confirm_password')?.setValidators(required ? [Validators.required] : []);
    this.usuarioForm.updateValueAndValidity();
  }

  private setupPasswordValidation(): void {
    this.usuarioForm.get('password')?.valueChanges.subscribe(() => {
      this.usuarioForm.get('confirm_password')?.updateValueAndValidity();
    });

    this.usuarioForm.get('confirm_password')?.valueChanges.subscribe(() => {
      this.usuarioForm.updateValueAndValidity();
    });
  }

  passwordMatchValidator = (g: FormGroup) => {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirm_password')?.value;

    // Validar solo si al menos un campo tiene valor
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        return { mismatch: true };
      }
    }
    return null;
  }

  onConfirm(): void {
    if (this.usuarioForm.invalid) {
      if (this.usuarioForm.hasError('mismatch')) {
        this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
      }
      return;
    }

    const formData = this.usuarioForm.value;
    
    // Si es edición y no se modificó la contraseña, mantener la original
    if (this.isEditMode && !formData.password) {
      formData.password = this.data.password;
      formData.confirm_password = this.data.password;
    }

    this.dialogRef.close(formData);
  }

  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
    this.setPasswordValidators(this.showPasswordFields);
  }

  sanitizePhoneInput(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}