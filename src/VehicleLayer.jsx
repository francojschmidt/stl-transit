import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import routeColors from './util/routeColors';
import busIcon from './assets/bus-front-fill.svg'

function createVehicleIcon(color, bearing = 0) {
    return L.divIcon({
        className: 'vehicle-icon-wrapper',
        html: `
            <div class="vehicle-icon"
                style="
                    --vehicle-color: ${color};
                    --vehicle-bearing: ${bearing}deg;
                "
            >
                <img src="${busIcon}" />
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
}

function VehicleLayer({ selectedRoutes, showVehicles }) {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        if(!showVehicles) {
            setVehicles([]);
            return;
        }

        let interval;

        async function fetchVehicles() {
            try {
                const res = await fetch(
                    'http://localhost:3001/vehicles'
                );

                const data = await res.json();

                const filtered = data.filter(vehicle =>
                    selectedRoutes.includes(vehicle.routeId)
                );

                setVehicles(filtered);

            } catch(err) {
                console.error(err);
            }
        }

        fetchVehicles();

        interval = setInterval(fetchVehicles, 15000);
        return () => clearInterval(interval);
    }, [selectedRoutes, showVehicles]);

    if(!showVehicles) return null;

    return (
        <>
            {vehicles.map(vehicle => (
                <Marker
                    key={vehicle.id}
                    position={[vehicle.latitude, vehicle.longitude]}
                    icon={createVehicleIcon(
                        routeColors[vehicle.routeId] || '#104710',
                        vehicle.bearing || 0
                    )}
                    pane='vehicles'
                >
                    <Popup>
                        Vehicle: {vehicle.id}
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

export default VehicleLayer;