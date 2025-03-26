import { Component } from '@angular/core';
import { Promotion } from '../../../shared/models/promotion/promotion';
import { PromotionsService } from '../../../services/promotions/promotions.service';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrl: './promotion-page.component.css'
})
export class PromotionPageComponent {
  displayedColumns: string[] = ['id', 'code', 'description', 'start_date', 'end_date', 'actions'];
  promotions:Promotion[]=[];

    constructor(private promotionService:PromotionsService){}

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

  edit(promotion:Promotion){

  }

  delete(promotion:Promotion){

  }

  }
