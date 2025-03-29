import { Component } from '@angular/core';
import { Provider } from '../../../shared/models/provider/provider';
import { ProvidersService } from '../../../services/providers/providers.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogProviderComponent } from '../../../shared/components/dialog-provider/dialog-provider.component';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrl: './provider-page.component.css'
})
export class ProviderPageComponent {
  displayedColumns: string[] = ['id', 'name', 'contact_info', 'actions'];
  providers : Provider[]=[];
 
 constructor(private providerService:ProvidersService, private dialog: MatDialog){}

  ngOnInit(){
    this.getProviders();
  }

  getProviders(){
    this.providerService.getProviders().subscribe(
      (providers:Provider[])=>{
        this.providers = providers;
      },
      (error)=>{
        console.error('Error al procesar los proveedores',error);
      }
    )
  }

  // Método para eliminar un proveedor
    delete(provider: Provider) {
      
      // Mostrar el diálogo de confirmación
      this.showDialog(
        '¿Estás seguro de borrar este proveedor?',
        `Se eliminará ${provider.name} permanentemente.`,
        'Eliminar'
      ).subscribe((result: boolean) => {
        if (result) {
          // Si el usuario confirma, llamar al servicio para eliminar
          this.providerService.deleteProvider(provider.id).subscribe({
            next: () => {
              this.showDialog(
                'Proveedor Eliminado',
                'El proveedor fue eliminado satisfactoriamente',
                null
              );
              this.getProviders();
            },
            error: (err) => {
              this.showDialog(
                'Error al borrar al proveedor',
                'Hubo un error al eliminar el provedor :(',
                null
              );
            }
          });
        } else {
          this.showDialog(
            'Accion cancelada ',
            'Operación cancelada satisfactoriamente',
            null
          );
        }
      });
    }

  edit(provider:Provider) {
  // Abre el diálogo con los datos del proveedor seleccionado
  const dialogRef = this.dialog.open(DialogProviderComponent, {
    width: '500px',
    data: provider, // Pasa el producto seleccionado al diálogo
  });

  // Cuando se cierra el diálogo
  dialogRef.afterClosed().subscribe((result: Provider) => {
    if (result) {
      console.log('proveedor editado:', result);
      this.actualizarProveedor(result); // Llama al método para actualizar el proveedor
    }
  });
  }

  // Método para actualizar el proveedor
  actualizarProveedor(provider: Provider): void {
    this.providerService.updateProvider(provider).subscribe({
      next: (response) => {
        this.showDialog(
          'Producto actualizado con éxito',
          `Se actualizó ${provider.name} satisfactoriamente`,
          null
        );
        this.getProviders(); // Actualiza la lista 
      },
      error: (error) => {
        this.showDialog(
          'Error al actualizar el producto',
          `Hubo un error al actualizar ${provider.name} `,
          null
        );
        console.log(error)
      },
    });
  }
    
    private showDialog(title: string, message: string, action: string | null) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: title,
          message: message,
          action: action
        }
      });
      return dialogRef.afterClosed();
    }

   add(): void {
        const dialogRef = this.dialog.open(DialogProviderComponent, {
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe((result: Provider) => {
          if (result) {
            const nuevoProveedor: Provider = {
              id: "",
              name: result.name,
              contact_info: result.contact_info,
              
            };
    
            console.log('Producto a agregar:', nuevoProveedor);
            this.agregarProveedor(nuevoProveedor); 
          }
        });
    }
  
      agregarProveedor(provider: Provider): void {
        console.log(provider);
        this.providerService.addProvider(provider).subscribe({
          next: (response) => {
            this.showDialog(
              'Proveedor agregado con éxito',
              `Se agregó ${provider.name} satisfactoriamente`,
              null
            );
            this.getProviders();
          },
          error: (error) => {
            this.showDialog(
              'Error al agregar el proveedor',
              `Hubo un error al agregar ${provider.name}`,
              null
            ); console.log(error);
          },
        });
      }

}
