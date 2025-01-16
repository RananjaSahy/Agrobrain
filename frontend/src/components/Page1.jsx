import React from 'react'
import Navbar from './Nav'
import Hero from './Hero'
import Capabilities from './Cardpart'
import Services from './Services'
import Team from './team'
import News from './News'
import FeedbackForm from './Feedback'
import Footer from './Footer'
const Page1 = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Capabilities/>
      <Services/>
      <Team/>
      <News/>
      <FeedbackForm/>
      <Footer/>
    </div>
  )
}

export default Page1
