import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import InviteCodePage from './components/InviteCodePage'
import WalletConnectPage from './components/WalletConnectPage'
import InputEmailPage from './components/InputEmailPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InviteCodePage />} index />
        <Route path="/connect-wallet" element={<WalletConnectPage />} />
        <Route path="/enter-email" element={<InputEmailPage />} />
      </Routes>
    </Router>
  )
}

export default App
