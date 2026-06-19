import React from 'react'

const PRODUTOS_MOCK = [
  {
    id: 1,
    nome: 'Bolo de Pote Brigadeiro',
    preco: 12.00,
    descricao: 'Camadas de bolo de chocolate com recheio cremoso de brigadeiro artesanal.',
    imagem: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=400'
  },
  {
    id: 2,
    nome: 'Copo da Felicidade Morango',
    preco: 18.00,
    descricao: 'Creme de ninho, morangos frescos, brownie e bastante Nutella.',
    imagem: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400'
  },
  {
    id: 3,
    nome: 'Cento de Docinhos Festa',
    preco: 90.00,
    descricao: 'Cento misto com brigadeiro tradicional, beijinho e dois amores.',
    imagem: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400'
  }
]

function Vitrine() {
  const numeroWhatsApp = '5547999999999'

  const enviarPedido = (produto) => {
    const mensagem = `Olá! Gostaria de fazer um pedido através do Conecta Itajaí:\n\n*Produto:* ${produto.nome}\n*Valor:* R$ ${produto.preco.toFixed(2).replace('.', ',')}\n\nPor favor, me informe a chave Pix para pagamento e a estimativa de entrega!`
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#e0e0e0', marginBottom: '5px' }}>Doces da Maria 🧁</h2>
        <p style={{ color: '#aaa', fontSize: '14px' }}>Microempreendedora Local - Itajaí/SC</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {PRODUTOS_MOCK.map((produto) => (
          <div key={produto.id} style={{ backgroundColor: '#2a2a2a', borderRadius: '12px', overflow: 'hidden', display: 'flex', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', border: '1px solid #333' }}>
            <img src={produto.imagem} alt={produto.nome} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
            <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'between', flex: 1 }}>
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
      </div>
    </div>
  )
}

export default Vitrine