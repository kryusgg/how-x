import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

function Vitrine() {
  const [produtos, setProdutos] = useState([])
  const [categoriaAtiva, setCategoriaAtiva] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'produtos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const produtosArray = []
      querySnapshot.forEach((doc) => {
        produtosArray.push({ ...doc.data(), id: doc.id })
      })
      setProdutos(produtosArray)
    })
    return () => unsubscribe()
  }, [])

  const enviarPedido = (produto) => {
    const destinoWhatsApp = produto.whatsapp || '5547999999999'
    const mensagem = `Olá! Gostaria de fazer um pedido através do Conecta Itajaí:\n\n*Produto:* ${produto.nome}\n*Valor:* R$ ${produto.preco.toFixed(2).replace('.', ',')}`
    const url = `https://api.whatsapp.com/send?phone=${destinoWhatsApp}&text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  const categorias = [
    { id: 'bolo', nome: 'Bolos e Tortas', emoji: '🍰', cor: '#ff7597' },
    { id: 'doce', nome: 'Doces e Brigadeiros', emoji: '🍬', cor: '#ffb84d' },
    { id: 'copo', nome: 'Copos da Felicidade', emoji: '🍨', cor: '#60efff' }
  ]

  const produtosFiltrados = produtos.filter(p => {
    if (!categoriaAtiva) return false
    const nomeMinusculo = p.nome.toLowerCase()
    const descMinusculo = p.descricao.toLowerCase()
    
    if (categoriaAtiva === 'bolo') return nomeMinusculo.includes('bolo') || descMinusculo.includes('bolo')
    if (categoriaAtiva === 'doce') return nomeMinusculo.includes('brigasdeiro') || nomeMinusculo.includes('doce') || descMinusculo.includes('doce')
    if (categoriaAtiva === 'copo') return nomeMinusculo.includes('copo') || descMinusculo.includes('copo')
    return true
  })

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      
      {!categoriaAtiva ? (
        <div>
          <h2 style={{ color: '#e0e0e0', textAlign: 'center', marginBottom: '10px', fontSize: '20px' }}>O que você deseja pedir hoje?</h2>
          <p style={{ color: '#888', textAlign: 'center', fontSize: '14px', marginBottom: '30px' }}>Selecione uma categoria para ver os produtos locais</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {categorias.map(cat => (
              <div key={cat.id} onClick={() => setCategoriaAtiva(cat.id)} style={{ backgroundColor: '#222', padding: '25px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', border: '1px solid #333', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                <span style={{ fontSize: '32px' }}>{cat.emoji}</span>
                <div>
                  <h3 style={{ color: '#fff', margin: '0', fontSize: '18px' }}>{cat.nome}</h3>
                  <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '12px' }}>Clique para ver as opções disponíveis</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <button onClick={() => setCategoriaAtiva(null)} style={{ background: 'none', border: 'none', color: '#00adb5', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>
              ← Voltar pras Categorias
            </button>
            <span style={{ color: '#666' }}>|</span>
            <h2 style={{ color: '#fff', fontSize: '18px', margin: '0' }}>
              {categorias.find(c => c.id === categoriaAtiva)?.nome}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {produtosFiltrados.map((produto) => (
              <div key={produto.id} style={{ backgroundColor: '#222', borderRadius: '12px', overflow: 'hidden', display: 'flex', border: '1px solid #333', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
                <img src={produto.imagem} alt={produto.nome} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                  <div>
                    <h3 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '15px' }}>{produto.nome}</h3>
                    <p style={{ color: '#888', margin: '0', fontSize: '12px', lineHeight: '1.3' }}>{produto.descricao}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '15px' }}>
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </span>
                    <button onClick={() => enviarPedido(produto)} style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                      Pedir
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {produtosFiltrados.length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', marginTop: '40px' }}>Nenhum produto cadastrado nesta categoria ainda.</p>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Vitrine