import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'

function Login({ aoLogar, aoVoltar }) {
  const [eLogin, setELogin] = useState(true)
  const [nomeLoja, setNomeLoja] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleAcao = async (e) => {
    e.preventDefault()
    setCarregando(true)

    try {
      if (eLogin) {
        // Lógica de Login real no Firestore
        const q = query(
          collection(db, 'vendedores'),
          where('email', '==', email.toLowerCase().trim()),
          where('senha', '==', senha)
        )
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          alert('Login realizado com sucesso! 🎉')
          aoLogar(email.toLowerCase().trim()) // ← Ajustado aqui para o isolamento de dados funcionar!
        } else {
          alert('E-mail ou senha incorretos.')
        }
      } else {
        // Lógica de Cadastro no Firestore
        if (!nomeLoja.trim()) {
          alert('Por favor, digite o nome da sua loja.')
          setCarregando(false)
          return
        }

        // Verificar se o e-mail já existe
        const checarEmail = query(collection(db, 'vendedores'), where('email', '==', email.toLowerCase().trim()))
        const resultadoChecagem = await getDocs(checarEmail)

        if (!resultadoChecagem.empty) {
          alert('Este e-mail já está cadastrado!')
          setCarregando(false)
          return
        }

        // Salvar novo vendedor
        await addDoc(collection(db, 'vendedores'), {
          nomeLoja: nomeLoja.trim(),
          email: email.toLowerCase().trim(),
          senha: senha
        })

        alert('Conta criada com sucesso! Agora você já pode entrar.')
        setELogin(true)
        setNomeLoja('')
        setSenha('')
      }
    } catch (error) {
      alert('Ocorreu um erro ao processar a solicitação.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={{ maxWidth: '420px', margin: '60px auto', padding: '30px', backgroundColor: '#252525', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.4)', border: '1px solid #333', fontFamily: 'sans-serif' }}>
      
      {/* Abas de Navegação (Tabs) */}
      <div style={{ display: 'flex', marginBottom: '25px', borderBottom: '2px solid #333' }}>
        <button type="button" onClick={() => { setELogin(true); setNomeLoja(''); }} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', color: eLogin ? '#00adb5' : '#888', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', borderBottom: eLogin ? '3px solid #00adb5' : 'none', marginBottom: '-2px', transition: 'all 0.2s' }}>
          Entrar
        </button>
        <button type="button" onClick={() => setELogin(false)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', color: !eLogin ? '#00adb5' : '#888', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', borderBottom: !eLogin ? '3px solid #00adb5' : 'none', marginBottom: '-2px', transition: 'all 0.2s' }}>
          Criar Conta
        </button>
      </div>

      <h3 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px', fontSize: '18px', fontWeight: 'normal' }}>
        {eLogin ? 'Acesse seu painel de vendas' : 'Cadastre sua marca no Conecta Itajaí'}
      </h3>

      <form onSubmit={handleAcao} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {!eLogin && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: '#bbb', fontSize: '14px' }}>Nome da Loja ou Doceira</label>
            <input type="text" value={nomeLoja} onChange={(e) => setNomeLoja(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '14px', outline: 'none' }} placeholder="Ex: Doces da Maria" />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: '#bbb', fontSize: '14px' }}>E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '14px', outline: 'none' }} placeholder="seuemail@exemplo.com" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: '#bbb', fontSize: '14px' }}>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '14px', outline: 'none' }} placeholder="Digite sua senha" />
        </div>

        <button type="submit" disabled={carregando} style={{ backgroundColor: carregando ? '#555' : '#00adb5', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: carregando ? 'not-allowed' : 'pointer', fontSize: '15px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0, 173, 181, 0.2)', transition: 'background-color 0.2s' }}>
          {carregando ? 'Processando...' : eLogin ? 'Entrar no Sistema' : 'Finalizar Cadastro'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button type="button" onClick={aoVoltar} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline', fontSize: '13px', transition: 'color 0.2s' }}>
          Voltar para a Vitrine de Doces
        </button>
      </div>

    </div>
  )
}

export default Login