import { useEffect } from 'react';
import { useMap } from "react-leaflet";

function PanesInitialize() {
    const map = useMap();

    useEffect(() => {
        if(!map.getPane('routes')) {
            map.createPane('routes');
            map.getPane('routes').style.zIndex = 400;
        }

        if(!map.getPane('stops')) {
            map.createPane('stops');
            map.getPane('stops').style.zIndex = 450;
        }

        if(!map.getPane('vehicles')) {
            map.createPane('vehicles');
            map.getPane('vehicles').style.zIndex = 500;
        }
    }, [map]);

    return null;
}

export default PanesInitialize;