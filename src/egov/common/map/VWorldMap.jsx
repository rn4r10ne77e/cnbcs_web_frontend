// VWorldMap.jsx
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import {useMap } from './VWorldContext'

// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ';
// import { defaults as defaultControls } from 'ol/control'; // 🔥 이거 추가

const VWorldMap = ({ children }) => {
  const mapRef = useRef();
  const { initializeMap } = useMap();

  useEffect(() => {
    const cleanup = initializeMap(mapRef.current);

    return cleanup;
  }, []);


  /*useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      controls: defaultControls(),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.vworld.kr/req/wmts/1.0.0/1E033A03-0CC7-363F-BB4A-BCA0F3ECCC13/Base/{z}/{y}/{x}.png',
            crossOrigin: 'anonymous',
          }),
        }),
      ],
      view: new View({
        center: [14135030.97, 4518632.06], // 서울 좌표 (EPSG:3857)
        zoom: 7,
      }),
    });
    
    return () => map.setTarget(null);
  }, []);*/
  
  return (
      // <div style={{ position: 'relative', width: '100%', height: '1080px' }}>
      <div style={{position: 'absolute', width: '100%', height: 'calc(100% - 60px)'}}>
        <div ref={mapRef} style={{width: '100%', height: '100%'}}/>
        {/* 맵 위에 자식 컴포넌트들 겹쳐서 배치 */}
        <div style={{position: 'absolute', top: 0, left: 1, zIndex: 10}}>
          {children}
        </div>
      </div>
  );
};

export default VWorldMap;
