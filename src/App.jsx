import React, { useState, useEffect } from 'react'
import Vitrine from './components/Vitrine'
import PainelVendedor from './components/PainelVendedor'
import Login from './components/Login'

function App() {
  const [telaAtual, setTelaAtual] = useState('vitrine')
  const [logado, setLogado] = useState(false)
  const [emailLogado, setEmailLogado] = useState('')

  useEffect(() => {
    const emailSalvo = localStorage.getItem('conecta_vendedor_email')
    if (emailSalvo) {
      setLogado(true)
      setEmailLogado(emailSalvo)
    }
  }, [])

  const handleAcessarAreaVendedor = () => {
    if (logado) {
      setTelaAtual('painel')
    } else {
      setTelaAtual('login')
    }
  }

  const handleSucessoLogin = (email) => {
    localStorage.setItem('conecta_vendedor_email', email)
    setLogado(true)
    setEmailLogado(email)
    setTelaAtual('painel')
  }

  const handleLogout = () => {
    localStorage.removeItem('conecta_vendedor_email')
    setLogado(false)
    setEmailLogado('')
    setTelaAtual('vitrine')
  }

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      
      <header style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #2d2d2d', padding: '15px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <h1 style={{ fontSize: '22px', margin: '0', color: '#00adb5', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setTelaAtual('vitrine')}>
            Conecta Itajaí 🚀
          </h1>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {telaAtual === 'vitrine' && (
              <button onClick={handleAcessarAreaVendedor} style={{ backgroundColor: 'transparent', color: '#00adb5', border: '1px solid #00adb5', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                {logado ? 'Ir para o Painel' : 'Área do Vendedor'}
              </button>
            )}

            {telaAtual === 'login' && (
              <button onClick={() => setTelaAtual('vitrine')} style={{ backgroundColor: 'transparent', color: '#aaa', border: '1px solid #444', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
                Voltar para a Vitrine
              </button>
            )}

            {telaAtual === 'painel' && (
              <>
                <button onClick={() => setTelaAtual('vitrine')} style={{ backgroundColor: 'transparent', color: '#00adb5', border: '1px solid #00adb5', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                  Ver Vitrine
                </button>
                <button onClick={handleLogout} style={{ backgroundColor: '#ff4b4b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main style={{ padding: '20px 0' }}>
        {telaAtual === 'vitrine' && <Vitrine />}
        {telaAtual === 'login' && <Login aoLogar={handleSucessoLogin} aoVoltar={() => setTelaAtual('vitrine')} />}
        {telaAtual === 'painel' && <PainelVendedor emailLogado={emailLogado} />}
      </main>
    </div>
  )
}

export default App