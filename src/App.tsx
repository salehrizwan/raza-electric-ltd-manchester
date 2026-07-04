import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Shield, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Check, 
  MessageSquare, 
  Menu, 
  ArrowRight,
  Info
} from "lucide-react";

import { 
  COMPANY_DETAILS, 
  TRUST_BADGES, 
  ABOUT_US_CONTENT, 
  SERVICES, 
  WHY_CHOOSE_US, 
  HOW_WE_WORK_STEPS, 
  FEATURED_PROJECTS, 
  TESTIMONIALS, 
  SERVICE_AREAS 
} from "./data";
import { ProjectItem } from "./types";

export default function App() {
  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Service filter states
  const [activeCategory, setActiveCategory] = useState<"all" | "installation" | "repair" | "safety">("all");

  // Project Lightbox state
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Testimonial Carousel state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Postcode Checker state
  const [postcode, setPostcode] = useState("");
  const [checkerResult, setCheckerResult] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  // Contact Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    postcode: "",
    serviceType: "General Electrical",
    details: "",
    urgent: false,
  });

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial Auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => 
        prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filter services helper
  const filteredServices = SERVICES.filter(service => {
    if (activeCategory === "all") return true;
    if (activeCategory === "installation") {
      return service.id.includes("install") || service.id.includes("upgrades") || service.id.includes("rewiring") || service.id.includes("ev") || service.id.includes("sockets");
    }
    if (activeCategory === "repair") {
      return service.id.includes("repair") || service.id.includes("fault") || service.id.includes("emergency");
    }
    if (activeCategory === "safety") {
      return service.id.includes("eicr") || service.id.includes("inspection") || service.id.includes("consumer") || service.id.includes("fuse") || service.id.includes("commercial");
    }
    return true;
  });

  // Postcode verification logic
  const handlePostcodeCheck = (e: FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) {
      setCheckerResult({
        status: "error",
        message: "Please enter a valid postcode."
      });
      return;
    }

    const cleanPostcode = postcode.trim().toUpperCase().replace(/\s+/g, "");
    
    // Greater Manchester postcodes typically start with M, OL, SK, WN, BL, WA, FY, etc.
    const isManchesterArea = 
      cleanPostcode.startsWith("M") || 
      cleanPostcode.startsWith("SK") || 
      cleanPostcode.startsWith("WA") || 
      cleanPostcode.startsWith("WN") || 
      cleanPostcode.startsWith("BL") || 
      cleanPostcode.startsWith("OL");

    if (isManchesterArea) {
      setCheckerResult({
        status: "success",
        message: `Excellent! ${postcode.toUpperCase()} is within our standard rapid-response electrical service area. No travel surcharge applies.`
      });
    } else {
      setCheckerResult({
        status: "success", // Still we serve, but note
        message: `Postcode ${postcode.toUpperCase()} is outside our default area, but we do extend services to surrounding areas for select projects. Let's discuss!`
      });
    }
  };

  // Submit Request Quote
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your name and phone number so we can contact you.");
      return;
    }
    setFormSubmitted(true);
  };

  const handleTestimonialPrev = () => {
    setCurrentTestimonialIndex(prev => prev === 0 ? TESTIMONIALS.length - 1 : prev - 1);
  };

  const handleTestimonialNext = () => {
    setCurrentTestimonialIndex(prev => prev === TESTIMONIALS.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="min-h-screen bg-bg-cream selection:bg-accent-beige selection:text-primary-charcoal">
      
      {/* 1. STICKY HEADER & GLASSMORPHISM NAVIGATION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-bg-cream/95 backdrop-blur-md border-b border-accent-beige/20 py-4 shadow-sm" 
            : "bg-transparent py-6"
        }`}
        id="site-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#home" className="flex items-center space-x-3 group" id="logo-link">
            <div className="w-10 h-10 rounded-full border-2 border-accent-beige flex items-center justify-center bg-primary-charcoal text-accent-beige group-hover:bg-accent-beige group-hover:text-primary-charcoal transition-all duration-300">
              <span className="font-serif font-bold text-lg">R</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-none text-primary-charcoal tracking-wide">
                RAZA ELECTRIC
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent-beige-dark font-semibold">
                LTD MANCHESTER
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" id="desktop-nav">
            <a href="#home" className="text-sm font-medium hover:text-accent-beige transition-colors text-primary-charcoal">Home</a>
            <a href="#about" className="text-sm font-medium hover:text-accent-beige transition-colors text-primary-charcoal">About Us</a>
            <a href="#services" className="text-sm font-medium hover:text-accent-beige transition-colors text-primary-charcoal">Services</a>
            <a href="#why-choose-us" className="text-sm font-medium hover:text-accent-beige transition-colors text-primary-charcoal">Why Choose Us</a>
            <a href="#projects" className="text-sm font-medium hover:text-accent-beige transition-colors text-primary-charcoal">Featured Projects</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-accent-beige transition-colors text-primary-charcoal">Testimonials</a>
            <a href="#contact" className="text-sm font-medium hover:text-accent-beige transition-colors text-primary-charcoal">Contact</a>
          </nav>

          {/* Quick Contact & Action */}
          <div className="hidden sm:flex items-center space-x-6">
            <a 
              href={`tel:${COMPANY_DETAILS.phone}`}
              className="flex items-center space-x-2 text-primary-charcoal hover:text-accent-beige transition-colors"
              id="header-phone-cta"
            >
              <Phone className="w-4 h-4 text-accent-beige" />
              <span className="font-mono text-sm font-bold tracking-tight">{COMPANY_DETAILS.phone}</span>
            </a>
            <a 
              href="#contact"
              className="bg-primary-charcoal hover:bg-accent-beige hover:text-primary-charcoal text-secondary-white px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all duration-300 border border-primary-charcoal hover:border-accent-beige shadow-sm"
              id="header-quote-button"
            >
              Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary-charcoal hover:text-accent-beige p-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-beige"
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-bg-cream/98 backdrop-blur-lg border-b border-accent-beige/20 shadow-lg px-6 py-8 flex flex-col space-y-5 lg:hidden"
            id="mobile-drawer"
          >
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-medium text-primary-charcoal hover:text-accent-beige border-b border-accent-beige/10 pb-2"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-medium text-primary-charcoal hover:text-accent-beige border-b border-accent-beige/10 pb-2"
            >
              About Us
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-medium text-primary-charcoal hover:text-accent-beige border-b border-accent-beige/10 pb-2"
            >
              Services
            </a>
            <a 
              href="#why-choose-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-medium text-primary-charcoal hover:text-accent-beige border-b border-accent-beige/10 pb-2"
            >
              Why Choose Us
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-medium text-primary-charcoal hover:text-accent-beige border-b border-accent-beige/10 pb-2"
            >
              Featured Projects
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-medium text-primary-charcoal hover:text-accent-beige border-b border-accent-beige/10 pb-2"
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-medium text-primary-charcoal hover:text-accent-beige border-b border-accent-beige/10 pb-2"
            >
              Contact
            </a>
            
            <div className="pt-4 flex flex-col space-y-4">
              <a 
                href={`tel:${COMPANY_DETAILS.phone}`}
                className="flex items-center space-x-3 text-primary-charcoal"
              >
                <div className="w-9 h-9 rounded-full bg-accent-beige/15 flex items-center justify-center text-accent-beige">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-mono text-sm font-bold">{COMPANY_DETAILS.phone}</span>
              </a>
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary-charcoal text-center text-secondary-white py-3.5 rounded-lg text-sm uppercase tracking-wider font-semibold transition-colors duration-300 hover:bg-accent-beige hover:text-primary-charcoal block border border-primary-charcoal"
              >
                Request a Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 2. HERO SECTION */}
      <section 
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex items-center" 
        id="home"
      >
        {/* Abstract structural overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full border-[1.5px] border-primary-charcoal" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full border-[1.5px] border-accent-beige" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Text Information */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center self-start space-x-2 bg-secondary-white px-3.5 py-1.5 rounded-full border border-accent-beige/30 shadow-xs">
                <Star className="w-3.5 h-3.5 text-accent-beige fill-accent-beige" />
                <span className="font-sans text-xs font-semibold tracking-wide text-primary-charcoal uppercase">
                  5.0 Google Rating · 19+ Customer Reviews
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary-charcoal leading-[1.1] tracking-tight font-medium" id="hero-title">
                Trusted Electrical Services for <span className="italic text-accent-beige-dark font-normal">Homes</span> & <span className="italic text-accent-beige-dark font-normal">Businesses</span>
              </h1>

              {/* Subheadline */}
              <p className="font-sans text-base sm:text-lg text-text-darkgray max-w-xl leading-relaxed font-light" id="hero-subtitle">
                {COMPANY_DETAILS.tagline}. Providing reliable electrical installations, repairs, lighting solutions, rewiring and EV charger installations across Manchester with professional workmanship and exceptional customer service.
              </p>

              {/* Action Buttons & Phone */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <a 
                  href="#contact" 
                  className="bg-primary-charcoal hover:bg-accent-beige text-secondary-white hover:text-primary-charcoal text-center px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 border border-primary-charcoal hover:border-accent-beige shadow-md"
                  id="hero-primary-cta"
                >
                  Request a Free Quote
                </a>
                <a 
                  href={`tel:${COMPANY_DETAILS.phone}`}
                  className="bg-secondary-white hover:bg-primary-charcoal text-primary-charcoal hover:text-secondary-white text-center px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 border border-accent-beige/40 hover:border-primary-charcoal shadow-sm"
                  id="hero-secondary-cta"
                >
                  Call Now
                </a>
              </div>

              {/* Prominent Phone display & Mini Trust Badges */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-accent-beige/25">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent-beige/10 flex items-center justify-center text-accent-beige">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-accent-beige-dark font-bold">Direct Line (Call 24/7)</p>
                    <a href={`tel:${COMPANY_DETAILS.phone}`} className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-primary-charcoal hover:text-accent-beige transition-colors">
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Hero Image Block */}
            <div className="lg:col-span-5 relative" id="hero-image-block">
              {/* Premium geometric layout */}
              <div className="absolute -inset-4 border border-accent-beige/40 rounded-2xl pointer-events-none transform translate-x-2 translate-y-2 z-0" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 lg:aspect-3/4 bg-primary-charcoal group border border-accent-beige/25 z-10">
                <img 
                 src={heroImage}
                  alt="Premium residential light installation by Raza Electric electrician" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle soft dark gradient overlay for visual luxury */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-charcoal/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Trust Tag over Image */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-secondary-white border border-accent-beige/40 p-4 rounded-xl shadow-lg flex items-center space-x-3 z-20 max-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-accent-beige/15 flex items-center justify-center text-accent-beige">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm text-primary-charcoal leading-none">Fully Certified</p>
                  <p className="text-[10px] text-text-darkgray font-light mt-1">18th Edition BS7671 Qualified Electricians</p>
                </div>
              </div>
            </div>

          </div>

          {/* Trust Badges Bar */}
          <div className="mt-20 pt-8 border-t border-accent-beige/20" id="trust-badges-bar">
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent-beige-dark text-center font-bold mb-6">
              Recognized Standards & Verified Trust
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4">
              {TRUST_BADGES.map((badge) => (
                <div 
                  key={badge.id}
                  className="flex flex-col items-center justify-center p-3 text-center bg-secondary-white/40 border border-accent-beige/10 hover:border-accent-beige/30 hover:bg-secondary-white/70 rounded-xl transition-all duration-300 shadow-2xs"
                >
                  <i className={`${badge.icon} text-lg text-accent-beige mb-2`} />
                  <span className="font-sans text-xs font-semibold text-primary-charcoal">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 3. ABOUT US SECTION */}
      <section 
        className="py-20 md:py-32 bg-secondary-white relative border-y border-accent-beige/10" 
        id="about"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column 1: Left Intro & Large Quote */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-beige-dark font-extrabold">
                Established Manchester Electrical Contractor
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary-charcoal font-medium leading-tight">
                {ABOUT_US_CONTENT.title}
              </h2>
              <div className="w-16 h-[2px] bg-accent-beige" />
              
              {/* Premium Stats Box */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-bg-cream/40 rounded-xl border border-accent-beige/10">
                  <span className="block font-serif text-2xl font-bold text-primary-charcoal">100%</span>
                  <span className="text-[9px] uppercase tracking-wider text-text-darkgray font-medium">Safety Record</span>
                </div>
                <div className="text-center p-4 bg-bg-cream/40 rounded-xl border border-accent-beige/10">
                  <span className="block font-serif text-2xl font-bold text-primary-charcoal">19+</span>
                  <span className="text-[9px] uppercase tracking-wider text-text-darkgray font-medium">5-Star Reviews</span>
                </div>
                <div className="text-center p-4 bg-bg-cream/40 rounded-xl border border-accent-beige/10">
                  <span className="block font-serif text-2xl font-bold text-primary-charcoal">24/7</span>
                  <span className="text-[9px] uppercase tracking-wider text-text-darkgray font-medium">Emergency Care</span>
                </div>
              </div>
            </div>

            {/* Column 2: Content Text */}
            <div className="lg:col-span-7 flex flex-col space-y-6 lg:pl-6 text-text-darkgray">
              {ABOUT_US_CONTENT.paragraphs.map((p, index) => (
                <p key={index} className="font-sans text-base leading-relaxed font-light">
                  {p}
                </p>
              ))}
              
              <div className="p-6 bg-bg-cream/30 rounded-xl border-l-4 border-accent-beige italic font-serif text-sm leading-relaxed text-primary-charcoal">
                "Our vision is straightforward: providing Manchester property owners with flawless electrical design, ultimate functional safety, and a straightforward service that respects their home and schedule."
                <span className="block font-sans text-[11px] uppercase tracking-widest text-accent-beige-dark font-bold not-italic mt-3">— Raza, Managing Director</span>
              </div>

              <div className="pt-4 flex items-center space-x-6">
                <a href="#services" className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary-charcoal hover:text-accent-beige transition-colors">
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 4. OUR SERVICES */}
      <section 
        className="py-20 md:py-32 bg-bg-cream relative" 
        id="services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-beige-dark font-extrabold">
              What We Do
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-charcoal font-medium">
              Bespoke Electrical Solutions
            </h2>
            <div className="w-12 h-[2px] bg-accent-beige my-1" />
            <p className="font-sans text-sm text-text-darkgray font-light max-w-2xl">
              From detailed domestic socket additions to massive commercial distributions and smart EV charging installations, our work is safe, fully insured, and safety-tested.
            </p>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6" id="service-filters">
              {[
                { id: "all", label: "All Services" },
                { id: "installation", label: "Installations" },
                { id: "repair", label: "Repairs & Diagnostics" },
                { id: "safety", label: "Safety & Testing" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-primary-charcoal text-secondary-white shadow-xs"
                      : "bg-secondary-white/60 text-primary-charcoal border border-accent-beige/10 hover:border-accent-beige/40 hover:bg-secondary-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Cards with Staggered Entrance feel */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            id="services-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={service.id}
                  className="bg-secondary-white border border-accent-beige/15 p-8 rounded-xl shadow-xs hover:shadow-md hover:border-accent-beige/40 group transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex flex-col space-y-4">
                    {/* Premium Circle Icon */}
                    <div className="w-12 h-12 rounded-full bg-bg-cream flex items-center justify-center text-primary-charcoal group-hover:bg-primary-charcoal group-hover:text-accent-beige transition-all duration-300 border border-accent-beige/25">
                      <i className={`${service.icon} text-lg`} />
                    </div>
                    <h3 className="font-serif font-medium text-lg text-primary-charcoal tracking-tight group-hover:text-accent-beige-dark transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-text-darkgray font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Subtle Link indicator */}
                  <div className="mt-6 pt-4 border-t border-accent-beige/10 flex items-center justify-between text-[11px] uppercase tracking-widest font-semibold text-accent-beige-dark group-hover:text-primary-charcoal transition-colors">
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom callout */}
          <div className="mt-16 text-center">
            <p className="text-xs text-text-darkgray">
              Don't see your specific requirement? We accommodate all bespoke requests.{" "}
              <a href="#contact" className="font-bold underline hover:text-accent-beige text-primary-charcoal">
                Contact our technician directly
              </a>
            </p>
          </div>

        </div>
      </section>


      {/* 5. WHY CHOOSE US */}
      <section 
        className="py-20 md:py-32 bg-secondary-white relative border-y border-accent-beige/10" 
        id="why-choose-us"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-beige-dark font-extrabold block mb-3">
                Uncompromising Quality
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary-charcoal font-medium leading-tight">
                Premium Electrical Workmanship, Safety & Absolute Transparency
              </h2>
              <div className="w-16 h-[2px] bg-accent-beige mt-4" />
            </div>
            <div className="lg:col-span-6">
              <p className="font-sans text-sm text-text-darkgray leading-relaxed font-light">
                We believe that every electrical wire connected, every downlight aligned, and every conversation held is an opportunity to prove our expertise. We serve Manchester with integrity, tidy execution, and fair, flat-rate pricing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" id="why-choose-us-grid">
            {WHY_CHOOSE_US.map((item) => (
              <div 
                key={item.id}
                className="p-8 rounded-xl border border-accent-beige/15 bg-bg-cream/30 hover:bg-secondary-white hover:shadow-md hover:border-accent-beige/40 transition-all duration-300 flex items-start space-x-5"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-beige/10 flex items-center justify-center text-accent-beige shrink-0">
                  <i className={`${item.icon} text-lg`} />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="font-serif font-medium text-base text-primary-charcoal">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-text-darkgray font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. HOW WE WORK (Step-by-step process) */}
      <section 
        className="py-20 md:py-32 bg-bg-cream relative overflow-hidden" 
        id="how-we-work"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-beige-dark font-extrabold">
              Our Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-charcoal font-medium">
              How We Work
            </h2>
            <div className="w-12 h-[2px] bg-accent-beige my-1" />
            <p className="font-sans text-sm text-text-darkgray font-light max-w-2xl">
              From your initial inquiry to final compliance testing, we ensure a seamless and completely transparent experience.
            </p>
          </div>

          {/* Stepper Steps with layout connections */}
          <div className="relative" id="process-steps">
            
            {/* Connecting horizontal line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-1/8 right-1/8 h-[1px] bg-accent-beige/35 -translate-y-12 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {HOW_WE_WORK_STEPS.map((step) => (
                <div 
                  key={step.step}
                  className="bg-secondary-white border border-accent-beige/10 p-8 rounded-xl shadow-2xs hover:shadow-sm hover:border-accent-beige/30 transition-all duration-300 relative group text-center flex flex-col items-center"
                >
                  {/* Step Badge */}
                  <div className="absolute -top-4 bg-primary-charcoal text-accent-beige font-serif italic font-bold text-xs w-8 h-8 rounded-full border border-accent-beige flex items-center justify-center">
                    0{step.step}
                  </div>

                  <div className="w-14 h-14 rounded-full bg-bg-cream/80 text-accent-beige-dark group-hover:text-primary-charcoal group-hover:bg-accent-beige/15 transition-all duration-300 flex items-center justify-center mb-6 border border-accent-beige/20">
                    <i className={`${step.icon} text-xl`} />
                  </div>

                  <h3 className="font-serif font-medium text-base text-primary-charcoal mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-text-darkgray font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* 7. FEATURED PROJECTS */}
      <section 
        className="py-20 md:py-32 bg-secondary-white relative" 
        id="projects"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-beige-dark font-extrabold">
              Our Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-charcoal font-medium">
              Featured Projects
            </h2>
            <div className="w-12 h-[2px] bg-accent-beige my-1" />
            <p className="font-sans text-sm text-text-darkgray font-light max-w-2xl">
              Take a look at some of our recent high-spec residential and commercial electrical projects completed across the Manchester area.
            </p>
          </div>

          {/* Six Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">
            {FEATURED_PROJECTS.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-bg-cream/20 border border-accent-beige/15 rounded-xl overflow-hidden group hover:border-accent-beige/55 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Image Container with Zoom effect */}
                <div className="aspect-4/3 overflow-hidden bg-primary-charcoal relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glassmorphic Category Tag */}
                  <div className="absolute top-4 left-4 bg-primary-charcoal/85 backdrop-blur-xs text-accent-beige border border-accent-beige/30 text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-md">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col space-y-2">
                  <h3 className="font-serif font-medium text-base text-primary-charcoal group-hover:text-accent-beige-dark transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-text-darkgray font-light line-clamp-2">
                    {project.description}
                  </p>
                  <div className="pt-2 flex items-center space-x-1.5 text-[10px] uppercase tracking-wider font-bold text-accent-beige-dark group-hover:text-primary-charcoal transition-colors">
                    <span>View Project Case</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Project case-study Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-charcoal/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-bg-cream max-w-3xl w-full rounded-2xl overflow-hidden border border-accent-beige/40 shadow-2xl relative"
                id="project-lightbox"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-primary-charcoal text-secondary-white hover:bg-accent-beige hover:text-primary-charcoal w-9 h-9 rounded-full flex items-center justify-center transition-colors z-10 border border-accent-beige/20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-full aspect-4/3 md:aspect-auto">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between space-y-6">
                    <div className="flex flex-col space-y-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent-beige-dark font-bold">
                        {selectedProject.category}
                      </span>
                      <h3 className="font-serif text-2xl font-medium text-primary-charcoal leading-tight">
                        {selectedProject.title}
                      </h3>
                      <div className="w-10 h-[2px] bg-accent-beige" />
                      <p className="font-sans text-xs text-text-darkgray font-light leading-relaxed">
                        {selectedProject.description}
                      </p>
                      
                      <div className="bg-secondary-white/50 border border-accent-beige/10 p-4 rounded-lg space-y-2 mt-2">
                        <p className="text-[10px] text-text-darkgray">
                          <strong className="text-primary-charcoal">Location:</strong> Manchester District, UK
                        </p>
                        <p className="text-[10px] text-text-darkgray">
                          <strong className="text-primary-charcoal">Compliance:</strong> 18th Edition BS7671 certified
                        </p>
                        <p className="text-[10px] text-text-darkgray">
                          <strong className="text-primary-charcoal">Rating:</strong> ★★★★★ verified standard
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <a 
                        href="#contact" 
                        onClick={() => setSelectedProject(null)}
                        className="bg-primary-charcoal hover:bg-accent-beige text-secondary-white hover:text-primary-charcoal text-center px-5 py-3 rounded-lg text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 border border-primary-charcoal grow"
                      >
                        Request Similar Service
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </section>


      {/* 8. CUSTOMER TESTIMONIALS */}
      <section 
        className="py-20 md:py-32 bg-bg-cream relative border-t border-accent-beige/10" 
        id="testimonials"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-beige-dark font-extrabold">
              Client Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-charcoal font-medium">
              Customer Testimonials
            </h2>
            <div className="w-12 h-[2px] bg-accent-beige my-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Google review summary side card */}
            <div className="lg:col-span-4 bg-secondary-white border border-accent-beige/20 p-8 rounded-xl shadow-xs text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-bg-cream flex items-center justify-center text-accent-beige border border-accent-beige/10 text-2xl">
                <i className="fa-brands fa-google" />
              </div>
              <p className="font-serif font-bold text-3xl text-primary-charcoal leading-none">
                {COMPANY_DETAILS.googleRating}
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent-beige fill-accent-beige" />
                ))}
              </div>
              <p className="font-sans text-xs text-primary-charcoal font-semibold">
                Google Customer Satisfaction
              </p>
              <div className="w-16 h-[1px] bg-accent-beige/30" />
              <p className="font-sans text-[11px] text-text-darkgray font-light">
                {COMPANY_DETAILS.reviewsCount} Active 5-Star reviews across Greater Manchester.
              </p>
            </div>

            {/* Testimonial slider */}
            <div className="lg:col-span-8 relative">
              <div className="bg-secondary-white border border-accent-beige/15 p-8 sm:p-12 rounded-xl shadow-xs relative min-h-[280px] flex flex-col justify-between">
                
                {/* Large elegant quotes symbol */}
                <span className="absolute top-6 right-8 font-serif text-7xl text-accent-beige/20 select-none pointer-events-none">
                  “
                </span>

                <div className="space-y-6">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    {[...Array(TESTIMONIALS[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent-beige fill-accent-beige" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-serif text-lg sm:text-xl italic leading-relaxed text-primary-charcoal">
                    "{TESTIMONIALS[currentTestimonialIndex].text}"
                  </p>
                </div>

                {/* Author Details & Carousel Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-accent-beige/10">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-primary-charcoal">
                      {TESTIMONIALS[currentTestimonialIndex].author}
                    </h4>
                    <p className="text-[10px] text-accent-beige-dark uppercase tracking-wider font-semibold">
                      {TESTIMONIALS[currentTestimonialIndex].location}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={handleTestimonialPrev}
                      className="w-9 h-9 rounded-full border border-accent-beige/25 hover:border-primary-charcoal hover:bg-primary-charcoal hover:text-secondary-white flex items-center justify-center transition-all duration-300 text-primary-charcoal shrink-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex space-x-1.5 px-1.5">
                      {TESTIMONIALS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentTestimonialIndex(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            currentTestimonialIndex === i ? "w-4 bg-primary-charcoal" : "bg-accent-beige/40"
                          }`}
                        />
                      ))}
                    </div>
                    <button 
                      onClick={handleTestimonialNext}
                      className="w-9 h-9 rounded-full border border-accent-beige/25 hover:border-primary-charcoal hover:bg-primary-charcoal hover:text-secondary-white flex items-center justify-center transition-all duration-300 text-primary-charcoal shrink-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 9. SERVICE AREA (Featuring dynamic checker & stylized grayscale map) */}
      <section 
        className="py-20 bg-secondary-white relative" 
        id="service-area"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Postcode Checker */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-beige-dark font-extrabold">
                Local Coverage Check
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary-charcoal font-medium leading-tight">
                Serving Manchester & Surrounding Areas
              </h2>
              <div className="w-16 h-[2px] bg-accent-beige" />
              
              <p className="font-sans text-sm text-text-darkgray leading-relaxed font-light">
                Providing professional electrical services throughout Manchester for homeowners, landlords and commercial clients. Check if your postcode is in our standard travel-free coverage zone below:
              </p>

              {/* Checker Form */}
              <form onSubmit={handlePostcodeCheck} className="flex flex-col space-y-3 pt-2">
                <label className="text-[10px] uppercase tracking-wider text-text-darkgray font-bold">
                  Enter Your Postcode (e.g. M20, SK8, WA15)
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="M1 1AD"
                    className="bg-bg-cream/40 border border-accent-beige/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-charcoal placeholder-accent-beige/60 uppercase grow font-mono font-bold"
                  />
                  <button 
                    type="submit"
                    className="bg-primary-charcoal hover:bg-accent-beige text-secondary-white hover:text-primary-charcoal px-6 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all duration-300 shrink-0 border border-primary-charcoal"
                  >
                    Check
                  </button>
                </div>
              </form>

              {/* Checker Results */}
              <AnimatePresence mode="wait">
                {checkerResult.status !== "idle" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-lg text-xs flex items-start space-x-3 border ${
                      checkerResult.status === "success" 
                        ? "bg-bg-cream border-accent-beige text-primary-charcoal" 
                        : "bg-red-50/10 border-accent-beige text-text-darkgray"
                    }`}
                  >
                    <Info className="w-4 h-4 text-accent-beige shrink-0 mt-0.5" />
                    <span>{checkerResult.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick bullet area list */}
              <div className="pt-4">
                <p className="text-[10px] uppercase tracking-wider text-accent-beige-dark font-extrabold mb-3">Principal Covered Districts</p>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICE_AREAS.slice(0, 8).map((area, index) => (
                    <span 
                      key={index}
                      className="bg-bg-cream/50 text-text-darkgray border border-accent-beige/10 px-2.5 py-1 rounded-md text-[10px] font-medium"
                    >
                      {area}
                    </span>
                  ))}
                  <span className="bg-bg-cream/50 text-text-darkgray border border-accent-beige/10 px-2.5 py-1 rounded-md text-[10px] font-medium italic">
                    & more
                  </span>
                </div>
              </div>
            </div>

            {/* Right side: Beautiful Stylized Map Section */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-accent-beige/35 p-2 bg-secondary-white">
                <div className="absolute top-4 left-4 z-10 bg-primary-charcoal/90 text-accent-beige border border-accent-beige/20 px-3.5 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-semibold flex items-center space-x-2 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-accent-beige" />
                  <span>Manchester Coverage Grid</span>
                </div>

                {/* Styled Iframe Map centered on Manchester */}
                <div className="w-full h-80 sm:h-[400px] bg-bg-cream rounded-xl overflow-hidden relative">
                  <iframe 
                    title="Raza Electric LTD Manchester Coverage Area Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152115.11195655787!2d-2.364402633095394!3d53.47222495632766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0x14134fef2da0c6e1!2sManchester%2C%20UK!5e0!3m2!1sen!2suae!4v1700000000000!5m2!1sen!2suae" 
                    width="100%" 
                    height="100%" 
                    style={{ 
                      border: 0,
                      // Sleek grayscale / sepia luxury developer styling overlay on default maps
                      filter: "grayscale(1) contrast(1.1) brightness(0.95) sepia(0.35)",
                    }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0"
                  />
                  {/* Subtle decorative framing */}
                  <div className="absolute inset-0 pointer-events-none border border-accent-beige/30 rounded-xl" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 10. CONTACT SECTION & FREE QUOTE REQUEST */}
      <section 
        className="py-20 md:py-32 bg-bg-cream relative" 
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              
              <div className="flex flex-col space-y-5">
                <span className="text-xs uppercase tracking-[0.25em] text-accent-beige-dark font-extrabold">
                  Get in Touch
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary-charcoal font-medium leading-tight">
                  Request a Free Quote or Booking
                </h2>
                <div className="w-16 h-[2px] bg-accent-beige" />
                <p className="font-sans text-sm text-text-darkgray leading-relaxed font-light">
                  Have an emergency, scheduling an inspection, or seeking lighting advice? Fill out the quote form, and our electrical supervisor will respond with honest, upfront guidance and flat-rate pricing.
                </p>
              </div>

              {/* Direct Info Links */}
              <div className="flex flex-col space-y-6 pt-4 border-t border-accent-beige/20">
                
                {/* Phone Card */}
                <a 
                  href={`tel:${COMPANY_DETAILS.phone}`}
                  className="flex items-start space-x-4 p-4 rounded-xl border border-accent-beige/10 hover:border-accent-beige/40 bg-secondary-white/50 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary-charcoal text-accent-beige flex items-center justify-center group-hover:bg-accent-beige group-hover:text-primary-charcoal transition-all duration-300 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-primary-charcoal">Call Direct / WhatsApp</h4>
                    <p className="font-mono text-base font-bold tracking-tight text-primary-charcoal mt-1">{COMPANY_DETAILS.phone}</p>
                    <p className="text-[10px] text-text-darkgray font-light mt-0.5">Available 24/7 for urgent emergency response</p>
                  </div>
                </a>

                {/* Work Hours Card */}
                <div className="flex items-start space-x-4 p-4 rounded-xl border border-accent-beige/10 bg-secondary-white/50">
                  <div className="w-11 h-11 rounded-lg bg-accent-beige/15 text-accent-beige-dark flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-primary-charcoal">Trading Standards & Hours</h4>
                    <p className="font-sans text-xs text-primary-charcoal mt-1 font-medium">Mon - Sat: 8:00 AM - 6:00 PM</p>
                    <p className="text-[10px] text-text-darkgray font-light mt-0.5">Emergency Services: 24h Responsive coverage</p>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex items-start space-x-4 p-4 rounded-xl border border-accent-beige/10 bg-secondary-white/50">
                  <div className="w-11 h-11 rounded-lg bg-accent-beige/15 text-accent-beige-dark flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-primary-charcoal">HQ Location</h4>
                    <p className="font-sans text-xs text-primary-charcoal mt-1 font-medium">{COMPANY_DETAILS.address}</p>
                    <p className="text-[10px] text-text-darkgray font-light mt-0.5">Greater Manchester local base of operations</p>
                  </div>
                </div>

              </div>

              <div className="text-[11px] text-text-darkgray font-light pt-4 border-t border-accent-beige/10">
                Registered in the UK. Raza Electric LTD Manchester. All engineers hold comprehensive public liability insurance (£5m+) and complete continuous professional testing.
              </div>

            </div>

            {/* Quote Request Form Column */}
            <div className="lg:col-span-7" id="quote-form-column">
              <div className="bg-secondary-white border border-accent-beige/15 p-8 sm:p-10 rounded-2xl shadow-sm relative">
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="quote-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-wider text-text-darkgray font-bold">Your Name *</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="John Doe" 
                            className="bg-bg-cream/40 border border-accent-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-charcoal transition-all"
                          />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-wider text-text-darkgray font-bold">Phone Number *</label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="+44 7723 522948" 
                            className="bg-bg-cream/40 border border-accent-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-charcoal transition-all font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-wider text-text-darkgray font-bold">Email Address (Optional)</label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com" 
                            className="bg-bg-cream/40 border border-accent-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-charcoal transition-all"
                          />
                        </div>

                        {/* Postcode */}
                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-wider text-text-darkgray font-bold">Job Postcode</label>
                          <input 
                            type="text" 
                            value={formData.postcode}
                            onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                            placeholder="M20 1AD" 
                            className="bg-bg-cream/40 border border-accent-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-charcoal transition-all uppercase font-mono"
                          />
                        </div>
                      </div>

                      {/* Service Selector */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-text-darkgray font-bold">Required Electrical Service</label>
                        <select 
                          value={formData.serviceType}
                          onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                          className="bg-bg-cream/40 border border-accent-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-charcoal transition-all appearance-none cursor-pointer"
                        >
                          <option>General Electrical Installation</option>
                          <option>Complete/Partial House Rewiring</option>
                          <option>Consumer Unit & Fuseboard Upgrades</option>
                          <option>EV Smart Charger Installation</option>
                          <option>Aesthetic LED Lighting Setup</option>
                          <option>EICR Safety Certificate / Landlord Testing</option>
                          <option>Commercial Fit-out & Distribution</option>
                          <option>Emergency Electrical Diagnostics</option>
                        </select>
                      </div>

                      {/* Project description */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-text-darkgray font-bold">Describe Your Requirements</label>
                        <textarea 
                          rows={4}
                          value={formData.details}
                          onChange={(e) => setFormData({...formData, details: e.target.value})}
                          placeholder="Please provide details about the job, scheduling requirements, or any specific query." 
                          className="bg-bg-cream/40 border border-accent-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-charcoal transition-all resize-none"
                        />
                      </div>

                      {/* Urgency checkbox */}
                      <div className="flex items-center space-x-3 p-4 bg-bg-cream/30 border border-accent-beige/10 rounded-lg">
                        <input 
                          type="checkbox" 
                          id="urgent-check"
                          checked={formData.urgent}
                          onChange={(e) => setFormData({...formData, urgent: e.target.checked})}
                          className="w-4 h-4 rounded text-primary-charcoal border-accent-beige focus:ring-primary-charcoal cursor-pointer accent-primary-charcoal"
                        />
                        <label htmlFor="urgent-check" className="text-xs text-primary-charcoal font-semibold cursor-pointer flex flex-col">
                          <span>This is an urgent response request</span>
                          <span className="font-sans font-light text-[10px] text-text-darkgray mt-0.5">Check this if you have an active power blackout, smoking circuit, or high priority safety hazard.</span>
                        </label>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-primary-charcoal hover:bg-accent-beige text-secondary-white hover:text-primary-charcoal py-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 border border-primary-charcoal hover:border-accent-beige shadow-md"
                      >
                        Submit Quote Request
                      </button>

                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-receipt"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 flex flex-col items-center justify-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-accent-beige/15 flex items-center justify-center text-primary-charcoal border-2 border-accent-beige">
                        <Check className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-serif text-2xl font-medium text-primary-charcoal">
                          Thank You, {formData.name}!
                        </h3>
                        <p className="font-sans text-xs text-text-darkgray max-w-md mx-auto leading-relaxed">
                          Your request for <span className="font-semibold text-primary-charcoal">{formData.serviceType}</span> has been received successfully.
                        </p>
                      </div>

                      <div className="w-full max-w-sm bg-bg-cream/40 border border-accent-beige/15 p-6 rounded-xl text-left text-xs space-y-3">
                        <h4 className="font-serif font-bold text-xs text-primary-charcoal pb-2 border-b border-accent-beige/10 uppercase tracking-wider">
                          Summary of your request
                        </h4>
                        <p className="text-text-darkgray">
                          <strong className="text-primary-charcoal">Reference Status:</strong> {formData.urgent ? "🚨 High Priority Action" : "📅 Scheduled Review"}
                        </p>
                        <p className="text-text-darkgray">
                          <strong className="text-primary-charcoal">Primary Phone:</strong> {formData.phone}
                        </p>
                        <p className="text-text-darkgray">
                          <strong className="text-primary-charcoal">Target Postcode:</strong> {formData.postcode ? formData.postcode.toUpperCase() : "Manchester Grid"}
                        </p>
                        <p className="text-[10px] text-accent-beige-dark italic pt-1">
                          Our supervisor will contact you shortly by telephone to review details.
                        </p>
                      </div>

                      <button 
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            postcode: "",
                            serviceType: "General Electrical",
                            details: "",
                            urgent: false,
                          });
                        }}
                        className="text-xs uppercase tracking-wider font-semibold text-primary-charcoal hover:text-accent-beige underline transition-all"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 11. FOOTER */}
      <footer className="bg-primary-charcoal text-secondary-white pt-16 pb-12 border-t border-accent-beige/20 relative overflow-hidden">
        
        {/* Background micro accents */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent-beige" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-accent-beige/10">
            
            {/* Column 1: Brand details */}
            <div className="lg:col-span-4 flex flex-col space-y-5">
              <a href="#home" className="flex items-center space-x-3 group self-start">
                <div className="w-10 h-10 rounded-full border border-accent-beige flex items-center justify-center bg-secondary-white text-primary-charcoal group-hover:bg-accent-beige group-hover:text-primary-charcoal transition-all">
                  <span className="font-serif font-bold text-lg">R</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg leading-none text-secondary-white tracking-wide">
                    RAZA ELECTRIC
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent-beige font-semibold">
                    LTD MANCHESTER
                  </span>
                </div>
              </a>
              <p className="font-sans text-xs text-accent-beige/80 max-w-sm leading-relaxed">
                Professional Electrical Services Across Manchester. Over 19 years of verified local trade and high-end residential workmanship. Available 24/7 for emergency electrical response.
              </p>
              <div className="flex space-x-3 pt-2">
                <a href="#" className="w-8 h-8 rounded-full border border-accent-beige/25 hover:border-accent-beige hover:bg-secondary-white hover:text-primary-charcoal flex items-center justify-center transition-all text-xs" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-accent-beige/25 hover:border-accent-beige hover:bg-secondary-white hover:text-primary-charcoal flex items-center justify-center transition-all text-xs" aria-label="Instagram">
                  <i className="fa-brands fa-instagram" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-accent-beige/25 hover:border-accent-beige hover:bg-secondary-white hover:text-primary-charcoal flex items-center justify-center transition-all text-xs" aria-label="Google Maps">
                  <i className="fa-solid fa-map-location" />
                </a>
              </div>
            </div>

            {/* Column 2: Key Services */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <h4 className="font-serif font-bold text-sm text-secondary-white uppercase tracking-wider">
                Our Services
              </h4>
              <div className="w-8 h-[1px] bg-accent-beige" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a href="#services" className="text-accent-beige/85 hover:text-secondary-white transition-colors">Electrical Installations</a>
                <a href="#services" className="text-accent-beige/85 hover:text-secondary-white transition-colors">House Rewiring</a>
                <a href="#services" className="text-accent-beige/85 hover:text-secondary-white transition-colors">Lighting Solutions</a>
                <a href="#services" className="text-accent-beige/85 hover:text-secondary-white transition-colors">Consumer Unit Upgrades</a>
                <a href="#services" className="text-accent-beige/85 hover:text-secondary-white transition-colors">EV Charger Installation</a>
                <a href="#services" className="text-accent-beige/85 hover:text-secondary-white transition-colors">Electrical Testing (EICR)</a>
              </div>
            </div>

            {/* Column 3: Contact quick Info */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <h4 className="font-serif font-bold text-sm text-secondary-white uppercase tracking-wider">
                Support & Inquiries
              </h4>
              <div className="w-8 h-[1px] bg-accent-beige" />
              <ul className="space-y-3 text-xs text-accent-beige/85">
                <li className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-accent-beige" />
                  <a href={`tel:${COMPANY_DETAILS.phone}`} className="font-mono hover:text-secondary-white transition-colors">
                    {COMPANY_DETAILS.phone}
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-accent-beige" />
                  <span>{COMPANY_DETAILS.address}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-accent-beige" />
                  <span>Mon - Sat: 8am - 6pm / Emergency 24/7</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-accent-beige/65 gap-4">
            <p>
              Copyright © 2026 {COMPANY_DETAILS.name}. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#about" className="hover:text-secondary-white transition-colors">Privacy Policy</a>
              <a href="#services" className="hover:text-secondary-white transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-secondary-white transition-colors">Sitemap</a>
            </div>
          </div>

        </div>
      </footer>


      {/* 12. FLOATING PLATFORM ACTION BUTTONS (CALL & WHATSAPP CHAT IN BRAND THEME) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3" id="floating-actions">
        
        {/* Sleek brand-matching WhatsApp Floating Button (Charcoal background, beige borders) */}
        <a 
          href={`https://wa.me/447723522948?text=Hello%20Raza%20Electric,%20I'm%20visiting%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20electrical%20services.`}
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 bg-primary-charcoal hover:bg-accent-beige text-secondary-white hover:text-primary-charcoal border border-accent-beige rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105 group relative"
          id="whatsapp-floating-cta"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute right-14 bg-primary-charcoal text-secondary-white border border-accent-beige/30 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            WhatsApp Raza
          </span>
        </a>

        {/* Sleek phone floating button */}
        <a 
          href={`tel:${COMPANY_DETAILS.phone}`}
          className="w-12 h-12 bg-accent-beige hover:bg-primary-charcoal text-primary-charcoal hover:text-secondary-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105 group relative border border-secondary-white"
          id="phone-floating-cta"
          aria-label="Call Raza Electric Now"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 bg-primary-charcoal text-secondary-white border border-accent-beige/30 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Call Operator
          </span>
        </a>
      </div>

    </div>
  );
}
