// script for building json file with data for all stops
const fs = require("fs");
const path = require("path");

const inputFile = path.join("../finalproject/data/google_transit/", "stops.txt");
const outputDir = path.join("./public/stops");
const outputFile = path.join(outputDir, "all-stops.geojson");

function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map((line) => {
        const values = line.split(",");
        const row = {};

        headers.forEach((header, index) => {
            row[header.trim()] = values[index]?.trim() || "";
        });

        return row;
    });
}

function generateStopsGeoJSON() {
    const fileContent = fs.readFileSync(inputFile, "utf8");
    const stops = parseCSV(fileContent);

    const features = stops.map((stop) => ({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [
                Number(stop.stop_lon),
                Number(stop.stop_lat)
            ]
        },
        properties: {
            stop_id: stop.stop_id,
            stop_code: stop.stop_code,
            stop_name: stop.stop_name,
            stop_desc: stop.stop_desc,
            wheelchair_boarding: stop.wheelchair_boarding
        }
    }));

    const geojson = {
        type: "FeatureCollection",
        features
    };

    if(!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, JSON.stringify(geojson, null, 2));

    console.log(`Created all-stops.geojson with ${features.length} stops`);
}

generateStopsGeoJSON();