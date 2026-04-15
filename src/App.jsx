import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import './App.css';
import Route from './Route.jsx';

const stlPosition = [38.6274, -90.1982]

function App() {

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
                        <Marker position={stlPosition}>
                            <Popup>
                                St. Louis, MO
                            </Popup>
                        </Marker>
                        <Route />
                    </MapContainer>
                </div>
            </main>

            <footer>
            </footer>
        </>
    );
}

export default App
