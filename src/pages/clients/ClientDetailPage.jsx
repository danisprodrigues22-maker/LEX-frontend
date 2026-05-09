import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import clientService from '../../api/clientService';
import './ClientPage.css';

function ClientDetailPage() {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await clientService.getClientById(id);
        setCliente(response.data);
      } catch (err) {
        setError('Cliente não encontrado.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const { tipoPessoa, nomeCompleto, cpf, razaoSocial, nomeFantasia, cnpj, email, telefone, endereco, observacoes } = cliente;

  return (
    <div className="cliente-page-container">
      <div className="page-header">
        <h1 className="page-title">Detalhe do Cliente</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to={`/dashboard/clientes/editar/${id}`} className="btn-action btn-edit">Editar</Link>
          <button onClick={() => navigate('/dashboard/clientes')} className="btn-action btn-view">Voltar</button>
        </div>
      </div>

      <div className="detail-section">
        <h3>{tipoPessoa === 'fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}</h3>
        {tipoPessoa === 'fisica' ? (
          <>
            <p><strong>Nome Completo:</strong> {nomeCompleto}</p>
            <p><strong>CPF:</strong> {cpf}</p>
          </>
        ) : (
          <>
            <p><strong>Razão Social:</strong> {razaoSocial}</p>
            <p><strong>Nome Fantasia:</strong> {nomeFantasia}</p>
            <p><strong>CNPJ:</strong> {cnpj}</p>
          </>
        )}
      </div>

      <div className="detail-section">
        <h3>Contato</h3>
        <p><strong>Email:</strong> {email || '—'}</p>
        <p><strong>Telefone:</strong> {telefone || '—'}</p>
      </div>

      {endereco && Object.values(endereco).some(Boolean) && (
        <div className="detail-section">
          <h3>Endereço</h3>
          {endereco.logradouro && <p><strong>Logradouro:</strong> {endereco.logradouro}{endereco.numero ? `, nº ${endereco.numero}` : ''}</p>}
          {endereco.complemento && <p><strong>Complemento:</strong> {endereco.complemento}</p>}
          {endereco.bairro && <p><strong>Bairro:</strong> {endereco.bairro}</p>}
          {(endereco.cidade || endereco.estado) && (
            <p><strong>Cidade/Estado:</strong> {[endereco.cidade, endereco.estado].filter(Boolean).join('/')}</p>
          )}
          {endereco.cep && <p><strong>CEP:</strong> {endereco.cep}</p>}
          {endereco.pais && <p><strong>País:</strong> {endereco.pais}</p>}
        </div>
      )}

      {observacoes && (
        <div className="detail-section">
          <h3>Observações</h3>
          <p>{observacoes}</p>
        </div>
      )}
    </div>
  );
}

export default ClientDetailPage;
