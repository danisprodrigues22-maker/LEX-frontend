import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import processService from '../../api/processService';
import './ProcessPage.css';
import './ProcessTabs.css';
import ProcessoTabs from './ProcessTabs';

function ProcessoDetalhePage() {
  const [processo, setProcesso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchProcesso = async () => {
      try {
        setLoading(true);
        const response = await processService.getProcessById(id);
        setProcesso(response.data);
      } catch (err) {
        setError('Falha ao carregar dados do processo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProcesso();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!processo) return null;

  const clienteNome = processo.clienteId
    ? (typeof processo.clienteId === 'object'
        ? (processo.clienteId.tipoPessoa === 'fisica'
            ? processo.clienteId.nomeCompleto
            : processo.clienteId.razaoSocial)
        : String(processo.clienteId))
    : '—';

  const formatarData = (d) =>
    d ? new Date(d).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '—';

  return (
    <div className="page-container">
      <div className="detalhe-header">
        <div>
          <h1 className="page-title" style={{ border: 'none', margin: 0, padding: 0 }}>
            {processo.titulo}
          </h1>
          <span className="page-subtitle">
            Cliente: {clienteNome}
            {processo.numeroProcesso ? ` | Nº: ${processo.numeroProcesso}` : ''}
          </span>
        </div>
        <Link to={`/dashboard/processos/editar/${id}`} className="btn-primary">
          Editar Processo
        </Link>
      </div>

      <div className="processo-detalhe-secao">
        <h3>Dados do Processo</h3>
        <p><strong>Status:</strong> {processo.status}</p>
        {processo.tipoAcao && <p><strong>Tipo de Ação:</strong> {processo.tipoAcao}</p>}
        {processo.area && <p><strong>Área:</strong> {processo.area}</p>}
        {processo.dataDistribuicao && (
          <p><strong>Data de Distribuição:</strong> {formatarData(processo.dataDistribuicao)}</p>
        )}
        {processo.orgao && <p><strong>Órgão:</strong> {processo.orgao}</p>}
        {processo.vara && <p><strong>Vara:</strong> {processo.vara}</p>}
        {processo.comarca && <p><strong>Comarca:</strong> {processo.comarca}</p>}
        {processo.descricao && <p><strong>Descrição:</strong> {processo.descricao}</p>}
        {processo.observacoes && <p><strong>Observações:</strong> {processo.observacoes}</p>}
      </div>

      <ProcessoTabs processoId={id} />
    </div>
  );
}

export default ProcessoDetalhePage;
