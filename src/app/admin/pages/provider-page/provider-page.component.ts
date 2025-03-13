import { Component } from '@angular/core';
import { Provider } from '@angular/core';
import { ProvidersService } from '../../../services/providers/providers.service';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrl: './provider-page.component.css'
})
export class ProviderPageComponent {
  displayedColumns: string[] = ['id', 'name', 'contact_info', 'actions'];
  providers : Provider[]=[];
 
 constructor(private providerService:ProvidersService){}

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

  edit(provider:Provider){

  }

  delete(provider:Provider){

  }

}
