import styles from './RoadMap.module.css';
import { IPoint } from '../../api/types';
import { TPointCoords } from '../../config';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import { LatLngTuple, Map } from 'leaflet';
import { useState } from 'react';
import { Container } from '@mui/material';

interface IRoadMapProps {
  start?: IPoint;
  end?: IPoint;
  route?: Array<TPointCoords>;
}

export function RoadMap({ start, end, route }: IRoadMapProps) {
  const mapCenter = [55.752, 37.615] as LatLngTuple;
  const mapZoom = 13;

  const [mapRef, setMapRef] = useState<Map>();
  if (route && route.length > 0) {
    mapRef?.fitBounds(route);
  }

  return (
    <Container sx={{
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      <MapContainer ref={(ref) => ref && setMapRef(ref)} className={styles.mapContainer} center={mapCenter} zoom={mapZoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {(start && end && route && route.length > 0) && (
          <>
            <Marker position={start.coordinates as LatLngTuple}>
              <Popup>
                {start.name}
              </Popup>
            </Marker>
            <Marker position={end.coordinates as LatLngTuple}>
              <Popup>
                {end.name}
              </Popup>
            </Marker>
            <Polyline positions={route} />
          </>
        )}
      </MapContainer>
    </Container>

  );
}
