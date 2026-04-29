import { GeoJSON } from 'react-leaflet';
import { useState, useEffect } from 'react';
import './Route.css'

const geojsonFiles = import.meta.glob('./assets/geojson/*.geojson');

function Route() {
    const [geodata, setGeodata] = useState([]);

    useEffect(() => {
        Promise.all(
            Object.entries(geojsonFiles).map(([Path, loader]) =>
                loader().then(mod => ({ path, data: mod.default }))
            )
        ).then(setGeodata);
    }, []);

    return (
        <>
            {geodata.map(({ path, data }) => (
                <GeoJSON
                    key={path}
                    data={data}
                    style={{ color: 'blue', weight: 3 }}
                />
            ))}
        </>
    )
}

export default Route