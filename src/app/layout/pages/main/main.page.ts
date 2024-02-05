import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BannerComponent } from '../../components/banner/banner.component';
import { CategoryFiltersComponent } from '../../components/category-filters/category-filters.component';
import { ProviderFiltersComponent } from '../../components/provider-filters/provider-filters.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SlotComponent } from '../../components/slot/slot.component';
import { Category } from '../../interfaces/category';
import { Game } from '../../interfaces/game';
import { Provider } from '../../interfaces/provider';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss',
  imports: [
    SidebarComponent,
    CategoryFiltersComponent,
    ProviderFiltersComponent,
    BannerComponent,
    SlotComponent,
    CommonModule,
  ],
})
export class MainComponent implements OnInit {
  service = inject(ApiService);
  slotCategories: WritableSignal<Category[]> = signal([]);
  slotProviders: WritableSignal<Provider[]> = signal([]);
  slots: WritableSignal<Game[]> = signal([]);
  providerMenu = signal<boolean>(false);

  selectedProvider = signal<string>('');
  selectedCategory = signal<string>('');

  constructor(private route: ActivatedRoute, private router: Router) {}
  async ngOnInit(): Promise<void> {
    await this.loadCategories();

    this.route.queryParams.subscribe(async (params) => {
      const provider = params['provider'];
      const category = params['category'];
      const providerMenu = params['providerMenu'];

      // control provider menu visibility
      this.providerMenu.set(providerMenu ? true : false);

      if (!provider && category) {
        this.filterCategoryGames(category);
        this.selectedCategory.set(category);
      }

      if (params['provider']) {
        this.selectedProvider.set(provider);
        await this.loadProviderGames(provider);
      }

      this.loadProviders();
    });
  }

  async loadCategories() {
    const slotCategories = await lastValueFrom(this.service.slotCategories());

    this.slotCategories.set(slotCategories);
    this.slots.set(slotCategories[0].games);
  }

  onProviderChange(event: string) {
    this.router.navigate(['/'], {
      queryParams: { provider: event, category: null },
      queryParamsHandling: 'merge',
    });
    this.selectedCategory.set('');
  }

  onProviderMenuChange(event: boolean) {
    this.router.navigate(['/'], {
      queryParams: { providerMenu: event ? true : null },
      queryParamsHandling: 'merge',
    });
  }

  async loadProviders(): Promise<void> {
    const providers = await lastValueFrom(this.service.slotProviders());

    this.slotProviders.set(providers);
  }

  async loadProviderGames(provider: string): Promise<void> {
    const providerGames = await lastValueFrom(
      this.service.providerGames(provider)
    );

    this.slots.set(providerGames.games);
  }

  onCategoryChange(event: Category) {
    this.router.navigate(['/'], {
      queryParams: { category: event.category },
    });

    this.selectedProvider.set('');
  }

  filterCategoryGames(category: any) {
    const slots = this.slotCategories().filter((c) => {
      return c.category === category;
    });

    this.slots.set(slots[0].games);
  }
}
