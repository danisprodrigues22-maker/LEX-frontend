import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clientService from '../../api/clientService';
import './ClientPage.css';

function ClienteListPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const response = await clientService.getAllClients();
        setClientes(response.data.data ?? response.data);
      } catch (err) {
        setError('Falha ao buscar clientes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await clientService.deleteClient(id);
        setClientes(clientes.filter(c => c._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Erro ao excluir cliente.');
      }
    }
  };

  const formatEndereco = (endereco) => {
    if (!endereco?.logradouro) return '—';
    const partes = [
      endereco.logradouro,
      endereco.numero ? `nº ${endereco.numero}` : null,
      endereco.bairro,
      [endereco.cidade, endereco.estado].filter(Boolean).join('/'),
    ].filter(Boolean);
    return partes.join(', ');
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="cliente-page-container">
      <div className="page-header">
        <h1 className="page-title">Clientes Registrados</h1>
        <Link to="/dashboard/clientes/novo" className="btn-primary">Novo Cliente</Link>
      </div>
      {error && <p className="error-message">{error}</p>}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome / Razão Social</th>
              <th>CPF / CNPJ</th>
              <th>Tipo</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="7">Nenhum cliente cadastrado.</td>
              </tr>
            ) : (
              clientes.map(cliente => (
                <tr key={cliente._id}>
                  <td>{cliente.tipoPessoa === 'fisica' ? cliente.nomeCompleto : cliente.razaoSocial}</td>
                  <td>{cliente.tipoPessoa === 'fisica' ? cliente.cpf : cliente.cnpj}</td>
                  <td>{cliente.tipoPessoa === 'fisica' ? 'Física' : 'Jurídica'}</td>
                  <td>{cliente.email || '—'}</td>
                  <td>{cliente.telefone || '—'}</td>
                  <td>{formatEndereco(cliente.endereco)}</td>
                  <td className="actions-cell">
                    <Link to={`/dashboard/clientes/detalhe/${cliente._id}`} className="btn-action btn-view">Ver</Link>
                    <Link to={`/dashboard/clientes/editar/${cliente._id}`} className="btn-action btn-edit">Editar</Link>
                    <button onClick={() => handleDelete(cliente._id)} className="btn-action btn-delete">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClienteListPage;
