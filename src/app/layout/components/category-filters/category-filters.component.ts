import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../interfaces';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.scss',
})
export class CategoryFiltersComponent {
  @Input() categories: Category[] = [];

  @Input() selectedCategory: string = '';

  @Output() categoryChange = new EventEmitter<Category>();

  onClick(category: Category) {
    this.categoryChange.emit(category);
  }
}
