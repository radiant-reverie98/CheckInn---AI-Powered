import React, { useState } from 'react'
import Navbar from '../components/general/Navbar'
import BookingsHero from '../components/my-bookings/BookingsHero'
import Footer from '../components/general/Footer'
import BookingsTabs from '../components/my-bookings/BookingsTabs'
import BookingsList from '../components/my-bookings/BookingsList'

function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div>
      <Navbar/>
      <BookingsHero/>
      <BookingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <BookingsList status={activeTab} />
      <Footer/>
    </div>
  )
}

export default MyBookingsPage