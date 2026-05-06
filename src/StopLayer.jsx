import { GeoJSON, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';

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
        fetch('src/assets/stops/all-stops.json')
        .then(res => res.json())
        .then(setStopsData);
    }, []);

    if(!showStops || !stopsData) return null;

    return (
        <GeoJSON
            data={stopsData}
            pointToLayer={(feature, latlng) =>
                L.circleMarker(latlng, {radius: 4})
            }
        />
    );
}

export default StopsLayer