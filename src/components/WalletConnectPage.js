import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function WalletConnectPage() {
  const [walletAddress, setWalletAddress] = useState('')
  const navigate = useNavigate()

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      alert('No crypto wallet extension detected.')
      return
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setWalletAddress(accounts[0])
    navigate('/enter-email')
  }

  return (
    <div>
      <h1>Connect Your Wallet</h1>
      <button onClick={handleConnectWallet}>Connect Wallet</button>
      {walletAddress && <p>Wallet Connected: {walletAddress}</p>}
    </div>
  )
}

export default WalletConnectPage
