'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import {
  Brain,
  Zap,
  Shield,
  TrendingUp,
  Users,
  MessageSquare,
  Star,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Info,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// X (Twitter) 图标组件
const XIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Toast通知组件
interface ToastProps {
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'info':
        return 'border-l-blue-500';
      case 'warning':
        return 'border-l-yellow-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed top-20 right-4 z-[60] w-96 max-w-[90vw] bg-card border-l-4 ${getBorderColor()} rounded-lg shadow-2xl backdrop-blur-md`}
        >
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 pt-0.5">{getIcon()}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const features = [
  {
    icon: Brain,
    title: 'Advanced AI Intelligence',
    description:
      'Cutting-edge machine learning algorithms that adapt to your financial patterns and provide personalized wealth management strategies.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Processing',
    description:
      'Real-time analysis and instant recommendations powered by our state-of-the-art infrastructure and optimized algorithms.',
  },
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description:
      'Your financial data is protected with military-grade encryption and multi-layer security protocols for complete peace of mind.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description:
      'Harness the power of AI to forecast market trends and identify profitable investment opportunities before they emerge.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Investment Manager',
    company: 'Goldman Sachs',
    content:
      'MetaWealth has revolutionized how I approach portfolio management. The AI insights are incredibly accurate and have helped me achieve 23% better returns.',
    rating: 5,
    avatar: '/api/placeholder/64/64',
  },
  {
    name: 'Michael Chen',
    role: 'Financial Advisor',
    company: 'Morgan Stanley',
    content:
      'The predictive analytics capabilities are unmatched. My clients have seen consistent growth thanks to MetaWealth&apos;s intelligent recommendations.',
    rating: 5,
    avatar: '/api/placeholder/64/64',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Wealth Manager',
    company: 'JP Morgan',
    content:
      'What impressed me most is how MetaWealth adapts to each client&apos;s unique financial situation. It&apos;s like having a personal AI financial genius.',
    rating: 5,
    avatar: '/api/placeholder/64/64',
  },
];

const stats = [
  { number: '10M+', label: 'Users Worldwide' },
  { number: '$50B+', label: 'Assets Managed' },
  { number: '99.9%', label: 'Uptime Guarantee' },
  { number: '24/7', label: 'AI Support' },
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Toast状态管理
  const [toast, setToast] = useState({
    isVisible: false,
    type: 'info' as 'success' | 'info' | 'warning',
    title: '',
    message: '',
  });

  const showToast = (
    type: 'success' | 'info' | 'warning',
    title: string,
    message: string
  ) => {
    setToast({
      isVisible: true,
      type,
      title,
      message,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [contactRef, contactInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    showToast(
      'success',
      'Message Sent!',
      `Thanks for your message, ${formData.name}! We'll get back to you within 24 hours.`
    );
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Toast通知 */}
      <Toast
        type={toast.type}
        title={toast.title}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.jpg"
                alt="MetaWealth Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-primary">
                MetaWealth
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={() =>
                  showToast(
                    'info',
                    'Coming Soon!',
                    'The demo feature will be available shortly. Stay tuned for updates!'
                  )
                }
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-4 py-2 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary"
              >
                Contact
              </button>
              <div className="px-3 py-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    showToast(
                      'info',
                      'Coming Soon!',
                      'The demo feature will be available shortly. Stay tuned for updates!'
                    );
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="pt-16 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                The Future of
                <span className="text-primary block">Wealth Management</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Harness the power of artificial intelligence to optimize your
                financial portfolio, predict market trends, and achieve
                unprecedented wealth growth with MetaWealth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6"
                  onClick={() =>
                    showToast(
                      'success',
                      'Welcome to MetaWealth!',
                      'Your AI-powered financial journey is about to begin. Let us revolutionize your wealth management strategy.'
                    )
                  }
                >
                  Start Your AI Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                  onClick={() => scrollToSection('features')}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative z-10 gradient-card rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={heroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="text-center p-4 bg-background/50 rounded-xl"
                    >
                      <div className="text-2xl font-bold text-primary">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium">
                      AI Systems Online
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl transform scale-105"></div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our cutting-edge artificial intelligence platform provides you
              with the tools and insights needed to make smarter financial
              decisions and build lasting wealth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full gradient-card border-border/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 mx-auto">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Revolutionizing Finance with AI
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                MetaWealth combines decades of financial expertise with
                cutting-edge artificial intelligence to deliver personalized
                wealth management solutions that adapt to your unique financial
                goals and market conditions.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform analyzes millions of data points in real-time,
                providing you with actionable insights and automated strategies
                that traditional financial advisors simply cannot match.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-card rounded-xl border">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">10M+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Users
                  </div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">127%</div>
                  <div className="text-sm text-muted-foreground">
                    Avg. Growth
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 gradient-card rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        AI-Driven Insights
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Real-time market analysis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Secure & Reliable
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Bank-grade security
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Lightning Fast
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Instant recommendations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-xl transform scale-105"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by Financial Experts
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what industry professionals are saying about MetaWealth's
              AI-powered platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full gradient-card border-border/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {testimonial.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Wealth?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join millions of users who trust MetaWealth to manage and grow
              their financial portfolio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  <CardDescription>
                    Have questions? We'd love to hear from you. Send us a
                    message and we'll respond as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                      <MessageSquare className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">
                        contact@metawealth.ai
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Address</h4>
                      <p className="text-muted-foreground">
                        123 AI Street, Tech Valley, CA 94000
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gradient-card p-6 rounded-xl">
                <h4 className="font-semibold text-foreground mb-4">
                  Why Choose MetaWealth?
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>24/7 AI-powered support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Enterprise-grade security</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Personalized AI strategies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Real-time market analysis</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/logo.jpg"
                  alt="MetaWealth Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold text-primary">
                  MetaWealth
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The future of wealth management powered by artificial
                intelligence. Join millions of users building their financial
                future with MetaWealth.
              </p>

              {/* 社交媒体图标 */}
              <div className="flex items-center space-x-4 mb-6">
                <h4 className="text-sm font-semibold text-foreground">
                  Follow Us:
                </h4>
                <div className="flex space-x-3">
                  <button className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group">
                    <a href="https://x.com/MetaWealth_RWA" target="_blank">
                      <XIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    showToast(
                      'info',
                      'Legal Documents',
                      'Privacy Policy and Terms of Service are currently being finalized. Please check back soon.'
                    )
                  }
                >
                  Privacy Policy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    showToast(
                      'info',
                      'Legal Documents',
                      'Privacy Policy and Terms of Service are currently being finalized. Please check back soon.'
                    )
                  }
                >
                  Terms of Service
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button
                    className="hover:text-primary transition-colors"
                    onClick={() =>
                      showToast(
                        'info',
                        'Feature Updates',
                        'New features are being developed! Stay tuned for exciting updates to our platform.'
                      )
                    }
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary transition-colors"
                    onClick={() =>
                      showToast(
                        'info',
                        'Pricing Plans',
                        'Flexible pricing plans are coming soon. Join our waitlist to get early access and special discounts.'
                      )
                    }
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary transition-colors"
                    onClick={() =>
                      showToast(
                        'info',
                        'Developer API',
                        'Our comprehensive API documentation is under development. Contact us for early access opportunities.'
                      )
                    }
                  >
                    API
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary transition-colors"
                    onClick={() =>
                      showToast(
                        'info',
                        'Documentation',
                        'Detailed documentation and guides are being prepared to help you get the most out of MetaWealth.'
                      )
                    }
                  >
                    Documentation
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button
                    className="hover:text-primary transition-colors"
                    onClick={() =>
                      showToast(
                        'info',
                        'About MetaWealth',
                        'Learn more about our mission to democratize AI-powered wealth management for everyone.'
                      )
                    }
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary transition-colors"
                    onClick={() =>
                      showToast(
                        'info',
                        'Join Our Team',
                        "We're always looking for talented individuals to join our mission. Check our careers page for open positions."
                      )
                    }
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary transition-colors"
                    onClick={() =>
                      showToast(
                        'info',
                        'MetaWealth Blog',
                        'Our blog featuring insights on AI, finance, and wealth management strategies is launching soon.'
                      )
                    }
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary transition-colors"
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 MetaWealth. All rights reserved. Powered by advanced AI
              technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
