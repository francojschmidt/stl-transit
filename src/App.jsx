import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import SelectionMenu from './SelectionMenu';
import RouteLayer from './RouteLayer';
import StopLayer from './StopLayer';
import PanesInitialize from './PanesInitialize';
import MapSettings from './MapSettings';
import VehicleLayer from './VehicleLayer';
import { loadSelectedRouteFiles } from './util/loadGeoJSON';
import './style/App.css';

const stlPosition = [38.6274, -90.1982]

function App() {
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    const [loadedRouteData, setLoadedRouteData] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <header className="header">
                <h1>STL Transit</h1>
                <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    ☰
                </button>
            </header>



                <div className="layout">
                    <main className="map">
                        <MapContainer center={stlPosition} zoom={11} >
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
                    </main>

                    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                        <MapSettings
                            className="show-vehicles"
                            showVehicles={showVehicles}
                            setShowVehicles={setShowVehicles}
                        />
                        <SelectionMenu
                            selectedRoutes={selectedRoutes}
                            setSelectedRoutes={setSelectedRoutes}
                        />
                    </aside>
                </div>

            <footer>
            </footer>
        </>
    );
}

export default App
