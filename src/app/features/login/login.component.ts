import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { SHARED_MODULES } from '../../core/common/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Country {
  id: string;
  name: string;
  flag: string;
}
interface State {
  id: string;
  name: string;
  countryId: string;
}
interface City {
  id: string;
  name: string;
  stateId: string;
}
interface HotelProperty {
  id: string;
  name: string;
  cityId: string;
  rating: string;
  rooms: number;
}
interface Role {
  id: string;
  name: string;
  email: string;
  colorStart?: string;
  colorEnd?: string;
  icon?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword = false;
  error = '';

  // Mock data (kept from your React code)
  countries: Country[] = [
    { id: 'usa', name: 'United States', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'canada', name: 'Canada', flag: '🇨🇦' },
  ];

  states: State[] = [
    { id: 'ny', name: 'New York', countryId: 'usa' },
    { id: 'fl', name: 'Florida', countryId: 'usa' },
    { id: 'ca', name: 'California', countryId: 'usa' },
    { id: 'england', name: 'England', countryId: 'uk' },
    { id: 'scotland', name: 'Scotland', countryId: 'uk' },
    { id: 'ontario', name: 'Ontario', countryId: 'canada' },
    { id: 'quebec', name: 'Quebec', countryId: 'canada' },
  ];

  cities: City[] = [
    { id: 'nyc', name: 'New York City', stateId: 'ny' },
    { id: 'buffalo', name: 'Buffalo', stateId: 'ny' },
    { id: 'miami', name: 'Miami', stateId: 'fl' },
    { id: 'orlando', name: 'Orlando', stateId: 'fl' },
    { id: 'la', name: 'Los Angeles', stateId: 'ca' },
    { id: 'sf', name: 'San Francisco', stateId: 'ca' },
    { id: 'london', name: 'London', stateId: 'england' },
    { id: 'manchester', name: 'Manchester', stateId: 'england' },
    { id: 'edinburgh', name: 'Edinburgh', stateId: 'scotland' },
    { id: 'toronto', name: 'Toronto', stateId: 'ontario' },
    { id: 'ottawa', name: 'Ottawa', stateId: 'ontario' },
    { id: 'montreal', name: 'Montreal', stateId: 'quebec' },
  ];

  hotels: HotelProperty[] = [
    {
      id: 'grand-plaza-ny',
      name: 'Grand Plaza Hotel',
      cityId: 'nyc',
      rating: '5 Star',
      rooms: 120,
    },
    {
      id: 'manhattan-suite',
      name: 'Manhattan Suite Hotel',
      cityId: 'nyc',
      rating: '4 Star',
      rooms: 85,
    },
    {
      id: 'ocean-view-miami',
      name: 'Ocean View Resort',
      cityId: 'miami',
      rating: '5 Star',
      rooms: 200,
    },
    {
      id: 'beach-paradise',
      name: 'Beach Paradise Hotel',
      cityId: 'miami',
      rating: '4 Star',
      rooms: 150,
    },
    {
      id: 'royal-london',
      name: 'Royal London Hotel',
      cityId: 'london',
      rating: '5 Star',
      rooms: 180,
    },
    {
      id: 'thames-view',
      name: 'Thames View Inn',
      cityId: 'london',
      rating: '4 Star',
      rooms: 90,
    },
    {
      id: 'maple-toronto',
      name: 'Maple Leaf Grand Hotel',
      cityId: 'toronto',
      rating: '5 Star',
      rooms: 160,
    },
    {
      id: 'cn-tower-hotel',
      name: 'CN Tower Hotel',
      cityId: 'toronto',
      rating: '4 Star',
      rooms: 110,
    },
  ];

  roles: Role[] = [
    {
      id: 'reception',
      name: 'Reception',
      email: 'reception@hotel.com',
      colorStart: '#3b82f6',
      colorEnd: '#1d4ed8',
      icon: 'bi bi-person-vcard', // Bootstrap icon
    },
    {
      id: 'housekeeping',
      name: 'Housekeeping',
      email: 'housekeeping@hotel.com',
      colorStart: '#22c55e',
      colorEnd: '#15803d',
      icon: 'bi bi-bucket',
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      email: 'maintenance@hotel.com',
      colorStart: '#f97316',
      colorEnd: '#c2410c',
      icon: 'bi bi-tools',
    },
    {
      id: 'manager',
      name: 'Manager',
      email: 'manager@hotel.com',
      colorStart: '#8b5cf6',
      colorEnd: '#6d28d9',
      icon: 'bi bi-person-gear',
    },
    {
      id: 'pos',
      name: 'POS / F&B',
      email: 'pos@hotel.com',
      colorStart: '#ef4444',
      colorEnd: '#b91c1c',
      icon: 'bi bi-shop',
    },
    {
      id: 'guest',
      name: 'Guest Portal',
      email: 'guest@hotel.com',
      colorStart: '#ec4899',
      colorEnd: '#be185d',
      icon: 'bi bi-door-open',
    },
  ];

  // filtered lists for selects
  availableStates: State[] = [];
  availableCities: City[] = [];
  availableHotels: HotelProperty[] = [];

  constructor(
    private fb: FormBuilder,
    // private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      hotel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // react to country/state/city changes to update availability
    this.loginForm
      .get('country')!
      .valueChanges.subscribe((countryId) => this.onCountryChange(countryId));
    this.loginForm
      .get('state')!
      .valueChanges.subscribe((stateId) => this.onStateChange(stateId));
    this.loginForm
      .get('city')!
      .valueChanges.subscribe((cityId) => this.onCityChange(cityId));
  }

  onCountryChange(countryId: string) {
    if (!countryId) {
      this.availableStates = [];
      this.loginForm.patchValue({ state: '', city: '', hotel: '' });
      this.availableCities = [];
      this.availableHotels = [];
      return;
    }

    this.availableStates = this.states.filter((s) => s.countryId === countryId);
    this.loginForm.patchValue({ state: '', city: '', hotel: '' });
    this.availableCities = [];
    this.availableHotels = [];
  }

  onStateChange(stateId: string) {
    if (!stateId) {
      this.availableCities = [];
      this.loginForm.patchValue({ city: '', hotel: '' });
      this.availableHotels = [];
      return;
    }

    this.availableCities = this.cities.filter((c) => c.stateId === stateId);
    this.loginForm.patchValue({ city: '', hotel: '' });
    this.availableHotels = [];
  }

  onCityChange(cityId: string) {
    if (!cityId) {
      this.availableHotels = [];
      this.loginForm.patchValue({ hotel: '' });
      return;
    }

    this.availableHotels = this.hotels.filter((h) => h.cityId === cityId);
    this.loginForm.patchValue({ hotel: '' });
  }

  selectRole(roleEmail: string) {
    // set email and prefill demo password
    this.loginForm.patchValue({ email: roleEmail, password: 'demo123' });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.error = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.error = 'Please fill required fields and select a hotel.';
      return;
    }

    const form = this.loginForm.value;
    const email = form.email;
    const password = form.password;
    const hotelId = form.hotel;

    const success = 'true';

    if (success) {
      const role = (email.split('@')[0] || '').toLowerCase();
      // navigate like your React mapping
      if (role === 'reception') this.router.navigate(['/reception']);
      else if (role === 'housekeeping') this.router.navigate(['/housekeeping']);
      else if (role === 'maintenance') this.router.navigate(['/maintenance']);
      else if (role === 'manager') this.router.navigate(['/manager']);
      else if (role === 'pos') this.router.navigate(['/pos']);
      else if (role === 'guest') this.router.navigate(['/guest']);
      else this.router.navigate(['/']);
    } else {
      this.error = 'Invalid credentials or hotel selection';
    }
  }
}
