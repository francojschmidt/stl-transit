import { GeoJSON } from 'react-leaflet';
import routeColors from './util/routeColors';

function RouteLayer({ routeData }) {

    if(!routeData || routeData.length === 0) return null;

    const lineLayers = routeData.map((route) => {
        const lineFeatures = route.data?.features?.filter((feature) =>
            feature.geometry &&
            (
                feature.geometry.type === 'LineString' ||
                feature.geometry.type === 'MultiLineString'
            )
        ) || [];

        return {
            id: route.id,
            color: routeColors[route.routeId] || route.color,
            data: {
                type: 'FeatureCollection',
                features: lineFeatures
            }
        };
    });

    return (
        <>
            {lineLayers.map((route) =>
                route.data.features.length ? (
                    <GeoJSON
                        key={route.id}
                        data={route.data}
                        pane={'routes'}
                        style={{color: route.color, weight: 4}}
                    />
                ) : null
            )}
        </>
    );
}

export default RouteLayer;