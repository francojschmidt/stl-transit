import { GeoJSON, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

function StopLayer({ routeData }) {
    const [showStops, setShowStops] = useState(false);
    const [stopsData, setStopsData] = useState(null);

    const map = useMap();

    useMapEvents({
        zoomend() {
            setShowStops(map.getZoom() >= 14);
        }
    });

    useEffect(() => {
        if(!map) return;
        setShowStops(map.getZoom() >= 14);
    }, [map]);

    useEffect(() => {
        if(!routeData || routeData.length === 0) {
            setStopsData(null);
            return;
        }

        const stopMap = new Map();

        routeData.forEach((route) => {
            const pointFeatures = route.data?.features?.filter(
                (feature) => feature?.geometry?.type === 'Point'
            ) || [];

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

    if(!showStops || stopsData?.type !== 'FeatureCollection' || !stopsData?.features?.length) {
        return null;
    }

    return (
        <GeoJSON
            data={stopsData}
            pane='stops'
            pointToLayer={(feature, latlng) =>
                L.circleMarker(latlng, {
                    pane: 'stops',
                    radius: 5,
                    color: '#CC0033',
                    weight: 3,
                    fillColor: '#333399',
                    fillOpacity: 1
                })
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