import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

function Vitrine() {
  const [produtos, setProdutos] = useState([])
  const numeroWhatsApp = '5547999999999'

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
    const mensaje = `Olá! Gostaria de fazer um pedido através do Conecta Itajaí:\n\n*Produto:* ${produto.nome}\n*Valor:* R$ ${produto.preco.toFixed(2).replace('.', ',')}\n\nPor favor, me informe a chave Pix para pagamento e a estimativa de entrega!`
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#e0e0e0', marginBottom: '5px' }}>Doces da Maria 🧁</h2>
        <p style={{ color: '#aaa', fontSize: '14px' }}>Microempreendedora Local - Itajaí/SC</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {produtos.map((produto) => (
          <div key={produto.id} style={{ backgroundColor: '#2a2a2a', borderRadius: '12px', overflow: 'hidden', display: 'flex', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', border: '1px solid #333' }}>
            <img src={produto.imagem} alt={produto.nome} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
            <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
              <div>
                <h3 style={{ color: '#fff', margin: '0 0 5px 0', fontSize: '16px' }}>{produto.nome}</h3>
                <p style={{ color: '#aaa', margin: '0 0 10px 0', fontSize: '12px', lineHeight: '1.4' }}>{produto.descricao}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '16px' }}>
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </span>
                <button onClick={() => enviarPedido(produto)} style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Pedir no WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}

        {produtos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', fontStyle: 'italic' }}>Nenhum produto cadastrado no momento.</p>
        )}
      </div>
    </div>
  )
}

export default Vitrine