import routesMetadata from './util/routesMetadata';

function SelectionMenu({ selectedRoutes, setSelectedRoutes }) {
    const toggleRoute = (routeId) => {
        setSelectedRoutes((prev) =>
            prev.includes(routeId)
            ? prev.filter(id => id !== routeId)
            : [...prev, routeId]
        );
    };


    return (
        <div className="selection-menu">
            <h3>Select Routes</h3>
            {routesMetadata.map((route) => (
                <label key={route.id}>
                    <input
                        type="checkbox"
                        checked={selectedRoutes.includes(route.id)}
                        onChange={() => toggleRoute(route.id)}
                    />
                    {route.name}
                </label>
            ))}
        </div>
    );
}

export default SelectionMenu