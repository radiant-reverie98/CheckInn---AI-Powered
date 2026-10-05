import React, { useState } from 'react'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import HotelSearchBar from '../components/filter-hotels/SearchBar'
import FiltersSidebar from '../components/filter-hotels/FiltersSidebar'
import HotelResults from '../components/filter-hotels/HotelResults'

function FilterHotels() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [search, setSearch] = useState({ city: '', guests: 2 })

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <Navbar />
      <HotelSearchBar onSearch={(values) => setSearch(values)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7 items-start">
          <div className={`fixed inset-0 z-40 bg-black/30 lg:hidden transition-opacity ${mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileFiltersOpen(false)} />
          <div className={`fixed lg:static top-0 left-0 h-full lg:h-auto z-50 w-80 lg:w-auto bg-[#F8FAFC] p-4 lg:p-0 overflow-y-auto transition-transform ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <FiltersSidebar />
          </div>
          <HotelResults
            city={search.city}
            guests={search.guests}
            onToggleMobileFilters={() => setMobileFiltersOpen(true)}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default FilterHotels
