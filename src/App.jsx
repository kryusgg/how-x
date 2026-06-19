import React from 'react'
import Vitrine from './components/Vitrine'

function App() {
  return (
    <div style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', padding: '20px 0', color: '#fff' }}>
      <div style={{ textAlign: 'center', padding: '10px 0', borderBottom: '1px solid #333', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', margin: '0', color: '#00adb5' }}>Conecta Itajaí 🚀</h1>
      </div>
      <Vitrine />
    </div>
  )
}

export default App