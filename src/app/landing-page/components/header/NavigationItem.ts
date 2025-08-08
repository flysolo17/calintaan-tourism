export interface NavigationItem {
  route: string;
  label: string;
  icon: string; // Material icons name
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    route: '/landing-page/home',
    label: 'Home',
    icon: 'home',
  },
  {
    route: '/landing-page/about',
    label: 'About',
    icon: 'info',
  },
  {
    route: '/landing-page/tourist-spot',
    label: 'Tourist Spot',
    icon: 'place',
  },
  {
    route: '/landing-page/products',
    label: 'Products',
    icon: 'shopping_bag',
  },
];
