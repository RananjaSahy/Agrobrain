import React from 'react'
import Navbar from './Nav'
import Hero from './Hero'
import Capabilities from './Cardpart'
import Services from './Services'
import Team from './team'
const Page1 = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Capabilities/>
      <Services/>
      <Team/>
    </div>
  )
}

export default Page1
