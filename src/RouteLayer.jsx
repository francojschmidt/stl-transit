import { GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';
import routesMetadata from './routesMetadata.js';

function RouteLayer({ selectedRoutes }) {
    const [routeData, setRouteData] = useState([]);

    useEffect(() => {
        async function loadRoutes() {
            const selectedMetadata = routesMetadata.filter(route =>
                selectedRoutes.includes(route.id)
            );

            const loaded = await Promise.all(
                selectedMetadata.map(async (route) => {
                    const res = await fetch(route.file);
                    const data = await res.json();

                    return {
                        id: `${route.id}-${file}`,
                        color: route.color,
                        data
                    };
                })
            );
            setRouteData(loaded);
        }

        loadRoutes();
    }, [selectedRoutes]);

    return (
        <>
            {routeData.map((route) => (
                <GeoJSON
                    key={route.id}
                    data={route.data}
                    style={{ color: route.color, weight: 4 }}
                />
            ))}
        </>
    );
}

export default RouteLayer;