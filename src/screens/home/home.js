import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'

function Home() {
  return (
    <div className='totalHome'>
      <div className="card">
        <h1>Bienvenido de nuevo!</h1>
        <div className="card-body">
          <p className="card-text">La vulnerabilidad del sector eléctrico Colombiano se evidenció a principios de los años noventa
          con una de las crisis energéticas mas profundas que ha sufrido el país en su historia.
            Tras la crisis, el estado Colombiano estableció una política de largo plazo que incluía
            la rápida puesta en marcha de plantas termoeléctricas que aseguraran al país frente a 
            futuros racionamientos. En consecuencia se invitó a inversionistas extranjeros privados 
            para construir y operar plantas termoeléctricas con tecnología de punta en distintos puntos de Colombia.Termopaipa, 
            es una planta de generación a base de carbón resultado de dicha política estatal. Ubicada en el municipio de Paipa, tiene una capacidad neta de 150 MW.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
