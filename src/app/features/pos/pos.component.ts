import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss',
})
export class PosComponent {
  selectedCategory = 'all';
  cart: CartItem[] = [];
  searchQuery = '';
  roomNumber = '';
  showCheckout = false;

  categories = ['all', 'breakfast', 'lunch', 'dinner', 'beverages', 'desserts'];

  menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Pancakes',
      category: 'breakfast',
      price: 12.99,
      image: '🥞',
    },
    {
      id: '2',
      name: 'Eggs Benedict',
      category: 'breakfast',
      price: 14.99,
      image: '🍳',
    },
    {
      id: '3',
      name: 'French Toast',
      category: 'breakfast',
      price: 11.99,
      image: '🍞',
    },
    {
      id: '4',
      name: 'Club Sandwich',
      category: 'lunch',
      price: 15.99,
      image: '🥪',
    },
    {
      id: '5',
      name: 'Caesar Salad',
      category: 'lunch',
      price: 13.99,
      image: '🥗',
    },
    {
      id: '6',
      name: 'Grilled Chicken',
      category: 'lunch',
      price: 18.99,
      image: '🍗',
    },
    { id: '7', name: 'Steak', category: 'dinner', price: 29.99, image: '🥩' },
    { id: '8', name: 'Salmon', category: 'dinner', price: 26.99, image: '🐟' },
    {
      id: '9',
      name: 'Pasta Carbonara',
      category: 'dinner',
      price: 19.99,
      image: '🍝',
    },
    {
      id: '10',
      name: 'Coffee',
      category: 'beverages',
      price: 4.99,
      image: '☕',
    },
    {
      id: '11',
      name: 'Fresh Juice',
      category: 'beverages',
      price: 6.99,
      image: '🥤',
    },
    {
      id: '12',
      name: 'Wine',
      category: 'beverages',
      price: 12.99,
      image: '🍷',
    },
    {
      id: '13',
      name: 'Chocolate Cake',
      category: 'desserts',
      price: 8.99,
      image: '🍰',
    },
    {
      id: '14',
      name: 'Ice Cream',
      category: 'desserts',
      price: 6.99,
      image: '🍨',
    },
    {
      id: '15',
      name: 'Tiramisu',
      category: 'desserts',
      price: 9.99,
      image: '🍮',
    },
  ];

  get filteredItems() {
    return this.menuItems.filter(
      (item) =>
        (this.selectedCategory === 'all' ||
          item.category === this.selectedCategory) &&
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addToCart(item: MenuItem) {
    const existing = this.cart.find((ci) => ci.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
  }

  updateQuantity(itemId: string, delta: number) {
    this.cart = this.cart
      .map((item) => {
        if (item.id === itemId) {
          const qty = item.quantity + delta;
          return qty > 0 ? { ...item, quantity: qty } : null;
        }
        return item;
      })
      .filter((item) => item) as CartItem[];
  }

  removeFromCart(itemId: string) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
  }

  get subtotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  get tax() {
    return this.subtotal * 0.1;
  }
  get total() {
    return this.subtotal + this.tax;
  }

  stats = [
    {
      label: "Today's Orders",
      value: '48',
      icon: 'bi-receipt',
      color: 'stat-blue',
    },
    {
      label: "Today's Revenue",
      value: '$1,245',
      icon: 'bi-currency-dollar',
      color: 'stat-green',
    },
    {
      label: 'Avg Order Value',
      value: '$25.94',
      icon: 'bi-cart3',
      color: 'stat-purple',
    },
  ];

  clearOrder() {
    this.cart = [];
    this.roomNumber = '';
    this.showCheckout = false;
  }
}
