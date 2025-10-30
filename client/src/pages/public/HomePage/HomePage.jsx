import React from 'react'
import { Link } from 'react-router-dom'

// مكونات الصفحة الرئيسية
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import TestimonialsSection from './components/TestimonialsSection'
import TeamSection from './components/TeamSection'
import ContactSection from './components/ContactSection'
import CTASection from './components/CTASection'

const HomePage = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* <TestimonialsSection /> */}
      <TeamSection />
      <ContactSection />
      <CTASection />
    </div>
  )
}

export default HomePage