import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
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
        const response = await api.get(`/processos/${id}`);
        setProcesso(response.data);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar dados do processo.');
        setLoading(false);
      }
    };
    fetchProcesso();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!processo) return null;

  return (
    <div className="page-container">
      <div className="detalhe-header">
        <div>
          <h1 className="page-title" style={{ border: 'none', margin: 0, padding: 0 }}>
            {processo.titulo_caso}
          </h1>
          <span className="page-subtitle">
            Cliente: {processo.nome_cliente} | Nº: {processo.numero_processo}
          </span>
        </div>
        <Link to={`/dashboard/processos/editar/${id}`} className="btn-primary">
          Editar Dados do Processo
        </Link>
      </div>

      {/* 3. Chamando o componente de abas com o nome novo */}
      <ProcessoTabs processoId={id} />
      
    </div>
  );
}

export default ProcessoDetalhePage;