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
                selectedMetadata.flatMap(route =>
                    route.files.map(async (file) => {
                        const res = await fetch(`${import.meta.env.BASE_URL}${file}`);

                        if(!res.ok) {
                            console.error(`Failed to load: ${file}`);
                            return null;
                        }

                        const data = await res.json();

                        return {
                            id: `${route.id}-${file}`,
                            color: route.color,
                            data
                        };
                    })
                )
            );
            setRouteData(loaded.filter(Boolean));
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