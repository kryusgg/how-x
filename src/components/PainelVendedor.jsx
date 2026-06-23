import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, where } from 'firebase/firestore'

function PainelVendedor({ emailLogado }) {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('') // ← Agora armazena o texto formatado (ex: "15,00")
  const [descricao, setDescricao] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [categoria, setCategoria] = useState('bolo')
  const [imagemFile, setImagemFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'produtos'), where('emailVendedor', '==', emailLogado))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const produtosArray = []
      querySnapshot.forEach((doc) => {
        produtosArray.push({ ...doc.data(), id: doc.id })
      })
      setProdutos(produtosArray)
    })
    return () => unsubscribe()
  }, [emailLogado])

  // FUNÇÃO MÁSCARA: Formata o preço em tempo real enquanto o usuário digita
  const handlePrecoChange = (e) => {
    let valor = e.target.value
    
    // Remove tudo que não for número puro
    valor = valor.replace(/\D/g, '')

    if (valor === '') {
      setPreco('')
      return
    }

    // Transforma os números em centavos e aplica a formatação brasileira (R$)
    const valorNum = parseFloat(valor) / 100
    const valorFormatado = valorNum.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    setPreco(valorFormatado)
  }

  const handleTrocarImagem = (e) => {
    const arquivo = e.target.files[0]
    if (arquivo) {
      setImagemFile(arquivo)
      setPreviewUrl(URL.createObjectURL(arquivo))
    }
  }

  const handleCadastrar = async (e) => {
    e.preventDefault()
    if (!imagemFile) {
      alert('Por favor, selecione uma imagem para o produto.')
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

      const numeroLimpo = whatsapp.replace(/\D/g, '')
      const numeroCompleto = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}`

      // CONVERSÃO REVERSA: Remove os pontos e troca a vírgula por ponto para o Firebase salvar como número real
      const precoLimpo = parseFloat(preco.replace(/\./g, '').replace(',', '.'))

      await addDoc(collection(db, 'produtos'), {
        nome,
        preco: precoLimpo, // ← Salva como número decimal perfeito no Firestore
        descricao,
        whatsapp: numeroCompleto,
        imagem: urlGerada,
        emailVendedor: emailLogado,
        categoria: categoria
      })

      setNome('')
      setPreco('')
      setDescricao('')
      setWhatsapp('')
      setCategoria('bolo')
      setImagemFile(null)
      setPreviewUrl('')
      alert('Produto cadastrado com sucesso! 🎉')
    } catch (error) {
      alert('Erro ao cadastrar produto.')
    } finally {
      setCarregando(false)
    }
  }

  const handleRemover = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este produto da sua vitrine?')) {
      try {
        await deleteDoc(doc(db, 'produtos', id))
        alert('Produto removido!')
      } catch (error) {
        alert('Erro ao remover o produto.')
      }
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ backgroundColor: '#222', padding: '25px', borderRadius: '16px', border: '1px solid #333', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
        <h2 style={{ color: '#fff', margin: '0 0 5px 0', fontSize: '18px', textAlign: 'center' }}>Cadastrar Novo Doce</h2>
        <p style={{ color: '#666', fontSize: '12px', textAlign: 'center', margin: '0 0 20px 0' }}>Conectado como: {emailLogado}</p>
        
        <form onSubmit={handleCadastrar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
            <label style={{ width: '120px', height: '120px', borderRadius: '12px', border: '2px dashed #00adb5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backgroundColor: '#1a1a1a', overflow: 'hidden', position: 'relative' }}>
              <input type="file" accept="image/*" onChange={handleTrocarImagem} style={{ display: 'none' }} />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#00adb5', fontSize: '13px', textAlign: 'center', padding: '10px' }}>+ Adicionar Foto</span>
              )}
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#aaa', fontSize: '13px' }}>Nome do Produto</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', outline: 'none' }} placeholder="Ex: Bolo de Pote de Morango" />
          </div>

          {/* CAMPO DE PREÇO ATUALIZADO PARA COMPORTAR A MÁSCARA AUTOMÁTICA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#aaa', fontSize: '13px' }}>Preço (R$)</label>
            <input type="text" inputMode="numeric" value={preco} onChange={handlePrecoChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', outline: 'none' }} placeholder="0,00" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#aaa', fontSize: '13px' }}>Categoria na Vitrine</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', outline: 'none', cursor: 'pointer' }}>
              <option value="bolo">🍰 Bolos e Tortas</option>
              <option value="doce">🍬 Doces e Brigadeiros</option>
              <option value="copo">🍨 Copos da Felicidade</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#aaa', fontSize: '13px' }}>Seu WhatsApp com DDD (Apenas números)</label>
            <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', outline: 'none' }} placeholder="Ex: 47992434348" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#aaa', fontSize: '13px' }}>Descrição / Detalhes</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', resize: 'vertical', minHeight: '60px', outline: 'none' }} placeholder="Ex: Massa de chocolate com recheio cremoso..." />
          </div>

          <button type="submit" disabled={carregando} style={{ backgroundColor: carregando ? '#555' : '#00adb5', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: carregando ? 'not-allowed' : 'pointer', fontSize: '14px', marginTop: '5px' }}>
            {carregando ? 'Publicando...' : 'Colocar na Vitrine'}
          </button>
        </form>
      </div>

      <div style={{ backgroundColor: '#1a1a1a', padding: '10px 0' }}>
        <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Seus Produtos Cadastrados</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {produtos.map((produto) => (
            <div key={produto.id} style={{ backgroundColor: '#222', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={produto.imagem} alt={produto.nome} style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ color: '#fff', margin: '0', fontSize: '14px' }}>{produto.nome}</h4>
                  <span style={{ color: '#4caf50', fontSize: '13px', fontWeight: 'bold' }}>R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <button onClick={() => handleRemover(produto.id)} style={{ backgroundColor: 'transparent', color: '#ff4b4b', border: '1px solid #ff4b4b', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                Remover
              </button>
            </div>
          ))}

          {produtos.length === 0 && (
            <p style={{ color: '#666', fontSize: '13px', fontStyle: 'italic', textAlign: 'center' }}>Você ainda não tem nenhum produto no seu catálogo.</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default PainelVendedor