import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import './styles.css';

function DevItem({ dev, onDelete }) {
  return (
    <li className="dev-item">
      <button onClick={() => onDelete(dev.github_username)} type="button">
        <FiTrash2 size={20} color="#a8a8b3" />
      </button>          
      <header>     
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>       
        </div>  
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar Perfil do GitHub</a>
    </li>  
  )
}

export default DevItem;