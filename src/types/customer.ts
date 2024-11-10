export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  company: string;
  lastContact: string;
  notes: string;
}