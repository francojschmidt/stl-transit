import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import SelectionMenu from './SelectionMenu';
import RouteLayer from './RouteLayer';
import StopLayer from './StopLayer';
import './App.css';

const stlPosition = [38.6274, -90.1982]

function App() {
    const [selectedRoutes, setSelectedRoutes] = useState([]);

    return (
        <>
            <header>
            </header>

            <main>
                <div>
                    <MapContainer id="map" center={stlPosition} zoom={13}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <RouteLayer selectedRoutes={selectedRoutes} />
                    </MapContainer>
                </div>
                <SelectionMenu
                    selectedRoutes={selectedRoutes}
                    setSelectedRoutes={setSelectedRoutes}
                />
            </main>

            <footer>
            </footer>
        </>
    );
}

export default App
