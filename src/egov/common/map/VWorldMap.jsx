// VWorldMap.jsx
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { XYZ } from 'ol/source';

const VWorldMap = ({ children }) => {
  const mapRef = useRef();
  
  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.vworld.kr/req/wmts/1.0.0/YOUR_API_KEY/Base/{z}/{y}/{x}.png`,
            crossOrigin: 'anonymous',
          }),
        }),
      ],
      view: new View({
        center: [14135030.97, 4518632.06], // 서울 (EPSG:3857)
        zoom: 7,
      }),
    });
    
    return () => map.setTarget(null);
  }, []);
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {/* 자식 컴포넌트들은 지도 위에 오버레이됩니다 */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

export default VWorldMap;