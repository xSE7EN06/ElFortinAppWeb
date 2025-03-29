import { Component } from '@angular/core';
import { Promotion } from '../../../shared/models/promotion/promotion';
import { PromotionsService } from '../../../services/promotions/promotions.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogPromotionComponent } from '../../../shared/components/dialog-promotion/dialog-promotion.component';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrl: './promotion-page.component.css'
})
export class PromotionPageComponent {
  displayedColumns: string[] = ['id', 'code', 'description', 'start_date', 'end_date', 'actions'];
  promotions:Promotion[]=[];
  totalItems: number = 0;       // Total de elementos
  pageSize: number = 10;        // Elementos por página
  pageSizeOptions: number[] = [5, 10, 25, 100];  // Opciones de tamaño de página
  
    constructor(private promotionService:PromotionsService, private dialog: MatDialog){}

  ngOnInit(){
    this.getPromotions();
  }

  getPromotions(){
     this.promotionService.getPromotions().subscribe(
            (promotios: Promotion[]) => {
              this.promotions = promotios; 
            },
            (error) => {
              console.error('Error al obtener las promociones:', error);
            }
          );
  }
  
  // Método para eliminar un proveedor
      delete(promotion: Promotion) {
        
        // Mostrar el diálogo de confirmación
        this.showDialog(
          '¿Estás seguro de borrar esta promoción?',
          `Se eliminará permanentemente.`,
          'Eliminar'
        ).subscribe((result: boolean) => {
          if (result) {
            // Si el usuario confirma, llamar al servicio para eliminar
            this.promotionService.deletePromotion(promotion.id).subscribe({
              next: () => {
                this.showDialog(
                  'Promoción Eliminada',
                  'La promoción fue eliminado satisfactoriamente',
                  null
                );
                this.getPromotions();
              },
              error: (err) => {
                this.showDialog(
                  'Error al borrar la promoción',
                  'Hubo un error al eliminar la promocion :(',
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

  edit(promotion:Promotion) {
    // Abre el diálogo con los datos del proveedor seleccionado
    const dialogRef = this.dialog.open(DialogPromotionComponent, {
      width: '500px',
      data: promotion, // Pasa el producto seleccionado al diálogo
    });
  
    // Cuando se cierra el diálogo
    dialogRef.afterClosed().subscribe((result: Promotion) => {
      if (result) {
        console.log('promocion editada:', result);
        this.actualizarPromocion(result); // Llama al método para actualizar el proveedor
      }
    });
    }
  
    // Método para actualizar el proveedor
    actualizarPromocion(promotion:Promotion): void {
      this.promotionService.updatePromotion(promotion).subscribe({
        next: (response) => {
          this.showDialog(
            'Promocion actualizado con éxito',
            `Se actualizó satisfactoriamente`,
            null
          );
          this.getPromotions(); // Actualiza la lista 
        },
        error: (error) => {
          this.showDialog(
            'Error al actualizar la promoción',
            `Hubo un error al actualizar `,
            null
          );
          console.log(error)
        },
      });
    }

 add(): void {
        const dialogRef = this.dialog.open(DialogPromotionComponent, {
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe((result: Promotion) => {
          if (result) {
            const nuevaPromocion: Promotion = {
              id: "",
              code: result.code,
              description: result.description,
              discount_type: result.discount_type,
              value: result.value,
              start_date: result.start_date,
              end_date: result.end_date,
              active:result.active
            };
    
            console.log('Promocion a agregar:', nuevaPromocion);
            this.agregarPromocion(nuevaPromocion); 
          }
        });
    }
  
      agregarPromocion(promotion: Promotion): void {
        console.log(promotion);
        this.promotionService.addPromotion(promotion).subscribe({
          next: (response) => {
            this.showDialog(
              'Promocion agregada con éxito',
              `Se agregó  satisfactoriamente`,
              null
            );
            this.getPromotions();
          },
          error: (error) => {
            this.showDialog(
              'Error al agregar el proveedor',
              `Hubo un error al agregar `,
              null
            ); console.log(error);
          },
        });
      }
    

      // Métodos auxiliares para el template
isActive(promotion: any): boolean {
  const today = new Date();
  const endDate = new Date(promotion.end_date);
  return endDate >= today;
}

isExpired(endDate: string): boolean {
  return new Date(endDate) < new Date();
}

isExpiringSoon(endDate: string): boolean {
  const expirationDate = new Date(endDate);
  const today = new Date();
  const diffTime = expirationDate.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 7 && diffDays >= 0;
}
  

  }
