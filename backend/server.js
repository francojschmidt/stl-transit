const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

const app = express();

app.use(cors());

const PORT = 3001;

const GTFS_RT_URL = 'https://www.metrostlouis.org/RealTimeData/';
const VEHICLE_FILE = 'StlRealTimeTrips.pb';

app.get('/vehicles', async (req, res) => {
    try {
        const response = await fetch(GTFS_RT_URL + VEHICLE_FILE);
        const buffer = await response.arrayBuffer();

        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
            new Uint8Array(buffer)
        );

        const vehicles = feed.entity
            .filter(entity => entity.vehicle)
            .map(entity => {
                const vehicle = entity.vehicle;

                return {
                    id: vehicle.vehicle?.id,
                    routeId: vehicle.trip?.routeId,
                    latitude: vehicle.position?.latitude,
                    longitude: vehicle.position?.longitude,
                    bearing: vehicle.position?.bearing,
                    speed: vehicle.position?.speed,
                    timestamp: vehicle.timestamp
                };
            }).filter(vehicle => vehicle.latitude && vehicle.longitude);

        res.json(vehicles);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed to get vehicles' });
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})