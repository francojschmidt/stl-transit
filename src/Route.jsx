import { GeoJSON } from 'react-leaflet';
import { useState, useEffect } from 'react';
import './Route.css'

const geojsonFiles = import.meta.glob('./assets/routes/*.geojson', { as: 'url' });

function Route() {
    const [geodata, setGeodata] = useState([]);

    useEffect(() => {
        Promise.all(
            Object.entries(geojsonFiles).map(async ([path, loader]) => {
                const url = await loader();
                const res = await fetch(url);
                const data = await res.json();

                return { path, data };
            })
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