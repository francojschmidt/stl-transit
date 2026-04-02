const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

async function main() {
    const response = await fetch(
        'https://www.metrostlouis.org/RealTimeData/StlRealTimeVehicles.pb'
    );

    if(!response.ok) {
        throw new Error(`error: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer)
    );

    console.log(`Timestamp: ${new Date(feed.header.timestamp * 1000).toLocaleString()}`);
    console.log(`Vehicles: ${feed.entity.length}\n`);
    feed.entity.slice(0, 5).forEach(entity => {
        const vehicle = entity.vehicle;
        console.log(`Vehicle ID: ${entity.id}`);
        console.log(`   Route: ${vehicle.trip.routeId}`);
        console.log(`   Coords: ${vehicle.position.latitude}, ${vehicle.position.longitude}`);
        console.log(`   Speed: ${vehicle.position.speed}\n`)
    });
}

main().catch(console.error);