import { GeoJSON } from 'react-leaflet';

function RouteLayer({ routeData }) {
    const lineLayers = routeData.map((route) => {
        const lineFeatures = route.data.features.filter((feature) =>
            feature.geometry &&
            (
                feature.geometry.type === 'LineString' ||
                feature.geometry.type === 'MultiLineString'
            )
        );

        return {
            id: route.id,
            color: route.color,
            data: {
                type: 'FeatureCollection',
                features: lineFeatures
            }
        };
    });

    return (
        <>
            {lineLayers.map((route) => (
                <GeoJSON
                    key={route.id}
                    data={route.data}
                    style={{color: route.color, weight: 4}}
                />
            ))}
        </>
    );
}

export default RouteLayer;