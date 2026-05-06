function MapSettings({ showVehicles, setShowVehicles }) {
    return (
        <label>
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