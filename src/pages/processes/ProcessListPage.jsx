import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import processService from '../../api/processService';
import './ProcessPage.css';

function ProcessoListPage() {
  const [processos, setProcessos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProcessos = async () => {
      try {
        setLoading(true);
        const response = await processService.listProcesses();
        setProcessos(response.data.data ?? response.data);
      } catch (err) {
        setError('Falha ao buscar processos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProcessos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este processo?')) {
      try {
        await processService.deleteProcess(id);
        setProcessos(processos.filter(p => p._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Erro ao excluir processo.');
      }
    }
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return '—';
    try {
      return new Date(dataISO).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    } catch (e) { return 'Data inválida'; }
  };

  const nomeCliente = (p) => {
    if (!p.clienteId) return '—';
    if (typeof p.clienteId === 'object') {
      return p.clienteId.tipoPessoa === 'fisica'
        ? p.clienteId.nomeCompleto
        : p.clienteId.razaoSocial;
    }
    return String(p.clienteId);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Processos Registrados</h1>
        <Link to="/dashboard/processos/novo" className="btn-primary">Novo Processo</Link>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Nº Processo</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Distribuição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processos.length === 0 ? (
              <tr><td colSpan="6">Nenhum processo cadastrado.</td></tr>
            ) : (
              processos.map(p => (
                <tr key={p._id}>
                  <td>{p.titulo}</td>
                  <td>{p.numeroProcesso || '—'}</td>
                  <td>{nomeCliente(p)}</td>
                  <td>{p.status}</td>
                  <td>{formatarData(p.dataDistribuicao)}</td>
                  <td className="actions-cell">
                    <Link to={`/dashboard/processos/detalhe/${p._id}`} className="btn-action btn-edit">Gerenciar</Link>
                    <button onClick={() => handleDelete(p._id)} className="btn-action btn-delete">Excluir</button>
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

export default ProcessoListPage;
