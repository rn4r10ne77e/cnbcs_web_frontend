import {createContext, useContext, useState, useEffect, useCallback} from "react";
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { defaults as defaultControls } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Style, Icon, Fill, Stroke} from 'ol/style';
import { fromLonLat } from 'ol/proj';
import {coordinates} from "ol/geom/flat/reverse";
import CircleStyle from "ol/style/Circle";

// Context 생성
//const MapContext  = useContext();
const MapContext = createContext();

export function MapProvider({children}) {
    const [map, setMap] = useState(null);
    const [markerSource, setMarkerSource] = useState(null);
    const [markerLayer, setMarkerLayer] = useState(null);
    const [mapReady, setMapReady] = useState(false);

    const initializeMap = useCallback((target) => {
        if(!target) return;

        const source = new VectorSource();
        const layer = new VectorLayer({
            source,
            name: 'markerLayer'
        });

        const mapInstance = new Map({
            target,
            layers:[
                new TileLayer({
                    source: new XYZ({
                        url: 'https://api.vworld.kr/req/wmts/1.0.0/1E033A03-0CC7-363F-BB4A-BCA0F3ECCC13/Base/{z}/{y}/{x}.png',
                        crossOrigin: 'anonymous'
                    }),
                }),
                layer
            ],
            view: new View({
                center: [14135030.97, 4518632.06], // 서울 좌표 (EPSG:3857)
                zoom: 7,
            }),
        })

        setMap(mapInstance);
        setMarkerSource(source);
        setMarkerLayer(layer);
        setMapReady(true);

        return () => {
            mapInstance.setTarget(null);
        }
    }, []);

    //마커 추가 함수
    const addMarker  = useCallback((coordinates,options = {}) =>{
       if(!markerSource || !mapReady) return null;

       // 좌표변환
       const olCoords = fromLonLat(coordinates);

       // 마커생성
       const marker = new Feature({
           geometry: new Point(olCoords),
           name: options.name || 'Marker',
           ...options.properties
       });

        marker.setStyle(
            new Style({
                image : options.iconUrl  ?
                new Icon({
                    src:options.iconUrl,
                    scale: options.scale || 0.5
                })
                :
                new CircleStyle({
                    radius : options.radius || 6,
                    fill: new Fill({color:'red'}),
                    stroke: new Stroke({color:"white", width : 1})
                })
            })
        )

        // 마커 소스에 추가
        markerSource.addFeature(marker);

        return marker;
    }, [markerSource, mapReady]);

    // 마커 제거 함수
    const removeMarker = useCallback((marker) => {
        if (!markerSource || !mapReady) return;

        markerSource.removeFeature(marker);
    }, [markerSource, mapReady]);

    // 모든 마커 제거
    const clearMarkers = useCallback(() => {
        if (!markerSource || !mapReady) return;

        markerSource.clear();
    }, [markerSource, mapReady]);

    // 위치로 이동
    const moveToLocation = useCallback((coordinates, zoom = 14) => {
        if (!map || !mapReady) return;

        const olCoords = fromLonLat(coordinates);

        /*map.getView().animate({
            center: olCoords,
            zoom: zoom,
            duration: 500
        });*/

        map.getView().setCenter(olCoords);
        map.getView().setZoom(zoom);

    }, [map, mapReady]);

    // 지도 초기화
    const resetMap = useCallback(() => {
        if (!map || !mapReady) return;

        clearMarkers();

        map.getView().setCenter([14135030.97, 4518632.06]);
        map.getView().setZoom(7);

    }, [map, mapReady, clearMarkers]);

    // 레이어 추가
    const addLayer = useCallback((layer) => {
        if (!map || !mapReady) return;

        map.addLayer(layer);
    }, [map, mapReady]);

    // 레이어 제거
    const removeLayer = useCallback((layer) => {
        if (!map || !mapReady) return;

        map.removeLayer(layer);
    }, [map, mapReady]);


    // 지도에 클릭 이벤트 추가
    const addMapClickListener = useCallback((callback) => {
        if (!map || !mapReady) return;

        const clickListener = map.on('click', (event) => {
            callback(event);
        });

        return clickListener;
    }, [map, mapReady]);

    // Context 값 정의
    const mapContextValue = {
        map,
        mapReady,
        initializeMap,
        addMarker,
        removeMarker,
        clearMarkers,
        moveToLocation,
        resetMap,
        addLayer,
        removeLayer,
        addMapClickListener
    };

    return (
        <MapContext.Provider value={mapContextValue}>
            {children}
        </MapContext.Provider>
    );
}
// 커스텀 훅
export function useMap() {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
}
// 기타 유용한 훅
export function useMapReady() {
    const { mapReady } = useMap();
    return mapReady;
}