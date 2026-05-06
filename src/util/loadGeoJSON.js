import routesMetadata from "./routesMetadata";

export async function loadSelectedRouteFiles(selectedRoutes) {
    const selectedMetadata = routesMetadata.filter(route =>
        selectedRoutes.includes(route.id)
    );

    const loaded = await Promise.all(
        selectedMetadata.flatMap(route =>
            route.files.map(async (file) => {
                const res = await fetch(
                    `${import.meta.env.BASE_URL}${file}`
                );

                if(!res.ok) {
                    console.error(`Failed to load: ${file}`);
                    return null;
                }

                const data = await res.json();

                return {
                    id: `${route.id}-${file}`,
                    routeId: route.id,
                    color: route.color,
                    file,
                    data
                };
            })
        )
    );

    return loaded.filter(Boolean);
}