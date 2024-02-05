import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-slot',
  standalone: true,
  imports: [],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotComponent {
  @Input() slots: any;
}
