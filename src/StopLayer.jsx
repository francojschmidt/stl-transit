import { GeoJSON, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

function StopLayer({ routeData }) {
    const [showStops, setShowStops] = useState(false);
    const [stopsData, setStopsData] = useState(null);

    const map = useMap();

    useMapEvents({
        zoomend() {
            setShowStops(map.getZoom() >= 15);
        }
    });

    useEffect(() => {
        setShowStops(map.getZoom() >= 15);
    }, [map]);

    useEffect(() => {
        const stopMap = new Map();

        routeData.forEach((route) => {
            const pointFeatures = route.data.features.filter(
                (feature) =>
                    feature.geometry &&
                    feature.geometry.type === 'Point'
            );

            pointFeatures.forEach((feature) => {
                const stopId = feature.properties?.stop_id ||
                    JSON.stringify(feature.geometry.coordinates);

                if(!stopMap.has(stopId)) {
                    stopMap.set(stopId, feature);
                }
            });
        });

        setStopsData({
            type: 'FeatureCollection',
            features: Array.from(stopMap.values())
        });
    }, [routeData]);

    if(!showStops || !stopsData) {
        return null;
    }

    return (
        <GeoJSON
            data={stopsData}
            pointToLayer={(feature, latlng) =>
                L.circleMarker(latlng, {radius: 4})
            }
            onEachFeature={(feature, layer) => {
                if(feature.properties?.stop_name) {
                    layer.bindPopup(feature.properties.stop_name);
                }
            }}
        />
    );
}

export default StopLayer