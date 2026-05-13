import React from 'react';
import { Link } from 'react-router-dom';
import './ProcessTabs.css';

function ProcessoTabs({ processoId }) {
  return (
    <div className="tabs-container">
      <h3 className="modulos-nav-title">Módulos Relacionados</h3>
      <div className="modulos-nav">
        <Link to={`/dashboard/honorarios?processoId=${processoId}`} className="btn-primary">Honorários</Link>
        <Link to={`/dashboard/parcelas?processoId=${processoId}`} className="btn-primary">Parcelas</Link>
        <Link to={`/dashboard/documentos?processoId=${processoId}`} className="btn-primary">Documentos</Link>
        <Link to={`/dashboard/pagamentos?processoId=${processoId}`} className="btn-primary">Pagamentos</Link>
      </div>
    </div>
  );
}

export default ProcessoTabs;
