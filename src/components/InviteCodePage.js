import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function InviteCodePage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const verifyCode = async () => {
    try {
      await axios.get(`/api/verifyCode?code=${code}`)
      navigate('/connect-wallet')
    } catch (error) {
      setError(error.message || 'Invalid or expired invite code.')
    }
  }

  return (
    <div>
      <h1>Enter Invite Code</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Invite Code"
      />
      <button onClick={verifyCode}>Claim with Code</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default InviteCodePage
