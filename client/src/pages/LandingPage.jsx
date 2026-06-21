import React from 'react'
import Navbar from '../components/general/Navbar'
import HeroSection from '../components/landing-page/HeroSection'
import Testimonials from '../components/landing-page/Testimonials'
import PopularDestinations from '../components/landing-page/PopularDestinations'
import FeaturedStays from '../components/landing-page/FeaturedStays'
import FinalCTA from '../components/landing-page/FinalCTA'
import Footer from '../components/general/Footer'
import SallyCopilot from '../components/general/SallyCopilot'

function LandingPage() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Testimonials/>
      <PopularDestinations/>
      <FeaturedStays/>
      <FinalCTA/>
      <SallyCopilot/>
      <Footer/>
    </div>
  )
}

export default LandingPage
