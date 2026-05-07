import './style/MapSettings.css'

function MapSettings({ showVehicles, setShowVehicles }) {
    return (
            <label id="vehicle-toggle">
                <input
                    type='checkbox'
                    checked={showVehicles}
                    onChange={(e) => setShowVehicles(e.target.checked)}
                />
                Show Vehicles
            </label>
    );
}

export default MapSettings;