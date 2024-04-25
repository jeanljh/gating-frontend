import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { Web3Provider } from '@ethersproject/providers'

function InputEmailPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const { code, walletAddress } = location.state || {}

  const isEmailValid = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  };

  const verifyAndReserve = async () => {
    setError('')
    if (!isEmailValid(email)) {
      setError('Invalid email format.')
      return
    }

    try {
      await axios.get(`/api/isEmailUsed?email=${email}`)
      const provider = new Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const signature = await signer.signMessage("Confirm my reservation.")

      await axios.post('/api/reserve', { code, email, wallet: walletAddress, signature }).then(() => {
        setSuccessMessage('Reservation successful!')
        setTimeout(() => {
          setSuccessMessage('')
          navigate('/')
        }, 3000)
      })
    } catch (error) {
      setError(error.message || 'Failed to make a reservation.')
    }
  }

  return (
    <div>
      <h1>Enter Your Email</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      />
      <button onClick={verifyAndReserve}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  )
}

export default InputEmailPage
