import { GeoJSON, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

function StopLayer() {
    const [showStops, setShowStops] = useState(false);
    const [stopsData, setStopsData] = useState(null);

    const map = useMapEvents({
        zoomend() {
            const zoom = map.getZoom();
            setShowStops(zoom >= 15);
        }
    });

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}stops/all-stops.geojson`)
        .then(res => res.json())
        .then(setStopsData)
        .catch(console.error);
    }, []);

    if(!showStops || !stopsData) return null;

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