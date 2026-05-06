import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import SelectionMenu from './SelectionMenu';
import RouteLayer from './RouteLayer';
import StopLayer from './StopLayer';
import PanesInitialize from './PanesInitialize';
import MapSettings from './MapSettings';
import VehicleLayer from './VehicleLayer';
import { loadSelectedRouteFiles } from './loadGeoJSON';
import './App.css';

const stlPosition = [38.6274, -90.1982]

function App() {
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    const [loadedRouteData, setLoadedRouteData] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            const loaded = await loadSelectedRouteFiles(selectedRoutes);
            if(!cancelled) {
                setLoadedRouteData(loaded);
            }
        }
        loadData();

        return () => {
            cancelled = true;
        };
    }, [selectedRoutes]);

    return (
        <>
            <header>
            </header>

            <main>
                <div>
                    <MapContainer id="map" center={stlPosition} zoom={11} >
                        <PanesInitialize />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <RouteLayer routeData={loadedRouteData} />
                        <StopLayer routeData={loadedRouteData} />
                        <VehicleLayer
                            selectedRoutes={selectedRoutes}
                            showVehicles={showVehicles}
                        />
                    </MapContainer>
                </div>
                <MapSettings
                    showVehicles={showVehicles}
                    setShowVehicles={setShowVehicles}
                />
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
