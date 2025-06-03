import { writable, derived } from 'svelte/store';
import type { Product, ProductFilters } from '../types/Product';

export function createProductFilters(initialProducts: Product[] = []) {
  const products = writable<Product[]>(initialProducts);
  const filters = writable<ProductFilters>({
    searchTerm: '',
    selectedCategory: 'all',
    sortBy: 'name'
  });

  const categories = derived(products, ($products) => 
    [...new Set($products.map(p => p.category).filter(Boolean))]
  );

  const filteredProducts = derived(
    [products, filters],
    ([$products, $filters]) => {
      return $products
        .filter(product => {
          const matchesSearch = !$filters.searchTerm ||
            product.name.toLowerCase().includes($filters.searchTerm.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes($filters.searchTerm.toLowerCase()));
          const matchesCategory = $filters.selectedCategory === 'all' || product.category === $filters.selectedCategory;
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          switch ($filters.sortBy) {
            case 'name':
              return a.name.localeCompare(b.name);
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'rating':
              return (b.rating || 0) - (a.rating || 0);
            default:
              return 0;
          }
        });
    }
  );

  return {
    products,
    filters,
    categories,
    filteredProducts,
    updateProducts: (newProducts: Product[]) => products.set(newProducts),
    updateFilters: (newFilters: Partial<ProductFilters>) => 
      filters.update(current => ({ ...current, ...newFilters })),
    resetFilters: () => filters.set({
      searchTerm: '',
      selectedCategory: 'all',
      sortBy: 'name'
    })
  };
}