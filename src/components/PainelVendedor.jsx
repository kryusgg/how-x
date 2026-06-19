import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

function PainelVendedor() {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [descricao, setDescricao] = useState('')
  const [imagemFile, setImagemFile] = useState(null)
  const [carregando, setCarregando] = useState(false)

  const handleCadastrar = async (e) => {
    e.preventDefault()
    if (!imagemFile) {
      alert('Por favor, selecione uma imagem.')
      return
    }

    setCarregando(true)

    try {
      const formData = new FormData()
      formData.append('image', imagemFile)

      const response = await fetch('https://api.imgbb.com/1/upload?key=9481e5acecaabb8232eb2420285f7b2b', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      const urlGerada = data.data.url

      await addDoc(collection(db, 'produtos'), {
        nome,
        preco: parseFloat(preco),
        descricao,
        imagem: urlGerada
      })

      setNome('')
      setPreco('')
      setDescricao('')
      setImagemFile(null)
      e.target.reset()
      alert('Produto cadastrado com upload real! 🎉')
    } catch (error) {
      alert('Erro ao cadastrar produto.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#2a2a2a', borderRadius: '12px', border: '1px solid #333', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>Cadastrar Novo Produto</h2>
      
      <form onSubmit={handleCadastrar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ color: '#aaa', fontSize: '14px' }}>Nome do Produto</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#1e1e1e', color: '#fff' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ color: '#aaa', fontSize: '14px' }}>Preço</label>
          <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#1e1e1e', color: '#fff' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ color: '#aaa', fontSize: '14px' }}>Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#1e1e1e', color: '#fff', resize: 'vertical', minHeight: '80px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ color: '#aaa', fontSize: '14px' }}>Imagem do Produto (Upload Real)</label>
          <input type="file" accept="image/*" onChange={(e) => setImagemFile(e.target.files[0])} required style={{ color: '#ccc', padding: '5px 0' }} />
        </div>

        <button type="submit" disabled={carregando} style={{ backgroundColor: carregando ? '#555' : '#00adb5', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: carregando ? 'not-allowed' : 'pointer', fontSize: '14px', marginTop: '10px' }}>
          {carregando ? 'Enviando imagem...' : 'Salvar Produto na Nuvem'}
        </button>
      </form>
    </div>
  )
}

export default PainelVendedor