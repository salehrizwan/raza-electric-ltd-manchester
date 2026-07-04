export interface TrustBadge {
  id: string;
  label: string;
  icon: string;
  value?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Font Awesome class or Lucide equivalent
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WorkStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  rating: number;
  text: string;
  author: string;
  location: string;
}
