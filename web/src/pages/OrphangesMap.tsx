import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import markerImg from '../images/2.svg'

import '../styles/pages/OrphanagesMap.css'
import 'leaflet/dist/leaflet.css'

import mapIcon from '../utils/happyIcon'
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, [])
    return(
        <div id="page-map">
            <aside>
            <header>
                <img src={markerImg} alt=""/>
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças esperam sua visita</p>
            </header>

            <footer>
                <strong>Jundiaí</strong>
                <span>São Paulo</span>
            </footer>
            </aside>

            <Map 
                center={[-23.1911997,-46.8839156]}
                zoom={15}
                style= {{width:'100%', height:'100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {orphanages.map(orphanage => {
                    return (
                        <Marker icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} key={orphanage.id}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;