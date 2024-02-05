import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Provider } from '../../interfaces';

@Component({
  selector: 'app-provider-filters',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './provider-filters.component.html',
  styleUrl: './provider-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderFiltersComponent {
  @Input() providers: Provider[] = [];

  @Input() selectedProvider: string = '';
  @Input() providerMenu: boolean = false;

  @Output() providerChange = new EventEmitter<string>();
  @Output() providerMenuChange = new EventEmitter<boolean>();

  onSeeMore() {
    this.providerMenuChange.emit(!this.providerMenu);
  }

  onClick(provider: string) {
    this.providerChange.emit(provider);
  }
}
