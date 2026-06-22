import React from 'react'
import Navbar from '../components/general/Navbar'
import SallyHero from '../components/sally-copilot/SallyHero'
import SallyChatInput from '../components/sally-copilot/SallyChatInput'
import ChatMessage from '../components/sally-copilot/ChatMessage'

function SallyCopilot() {
  return (
    <div>
      <Navbar/>
      <SallyHero/>
      <SallyChatInput/>
      {/* <ChatMessage/> */}
    </div>
  )
}

export default SallyCopilot
