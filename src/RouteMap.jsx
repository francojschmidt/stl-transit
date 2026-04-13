import { MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import './RouteMap.css'

const stlPosition = [38.6274, 90.1982]

function RouteMap() {
    let map = L.map('map').setView(stlPosition, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return (
        <div id="map">
            <MapContainer center={stlPosition} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={stlPosition}>
                    <Popup>
                        St. Louis, MO
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default RouteMap