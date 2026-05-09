import React from 'react';
import { Link } from 'react-router-dom';
import './ProcessTabs.css';

function ProcessoTabs({ processoId }) {
  return (
    <div className="tabs-container">
      <h3 className="modulos-nav-title">Módulos Relacionados</h3>
      <div className="modulos-nav">
        <Link to="/dashboard/honorarios" className="btn-primary">Honorários</Link>
        <Link to="/dashboard/parcelas" className="btn-primary">Parcelas</Link>
        <Link to="/dashboard/documentos" className="btn-primary">Documentos</Link>
        <Link to="/dashboard/pagamentos" className="btn-primary">Pagamentos</Link>
      </div>
    </div>
  );
}

export default ProcessoTabs;
