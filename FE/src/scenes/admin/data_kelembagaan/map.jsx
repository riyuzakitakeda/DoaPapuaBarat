import React, { useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIcon from '../../../assets/image/marker-icon.png';
import L from 'leaflet';

const myIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  popupAnchor: [-0, -0],
  iconSize: [50, 60],
});

const center = {
  lat: -5.160543,
  lng: 119.436077,
}

const MapDialog = ({pos, execute}) => {
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          execute(marker.getLatLng());
        }
      },
    }),
    [],
  )

  return (
    <MapContainer center={pos} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={pos}
        ref={markerRef}
        icon={myIcon}
      >
        <Popup minWidth={90}>
          <span>
            {'Pilih Lokasi Anda'}
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDialog;