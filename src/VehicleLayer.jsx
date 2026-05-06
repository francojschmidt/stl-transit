import { useEffect, useState } from "react";
import { CircleMarker, Popup } from "react-leaflet";
import L from 'leaflet';

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
                <svg viewBox="0 0 24 24" class="vehicle-svg">
                    <path d="M12 2 L22 22 L22 17 L2 22 Z"
                        fill="var(--vehicle-color)"
                    />
                </svg>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
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
                <CircleMarker
                    key={vehicle.id}
                    center={[vehicle.latitude, vehicle.longitude]}
                    radius={6}
                >
                    <Popup>
                        <div>
                            Vehicle: {vehicle.id}
                        </div>
                        <div>
                            Route: {vehicle.routeId}
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </>
    );
}

export default VehicleLayer;