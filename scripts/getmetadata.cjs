// script for building route data into a useable format
const fs = require("fs");
const path = require("path");
// (NOTE: inputFile is routes.txt from GTFS schedule data)
const inputFile = path.join("../finalproject/data/google_transit/", "routes.txt");
const outputFile = path.join("./src/util", "routesMetadata.js");

// might add the real ones later idk, would have to do it by hand :(
// (because bus routes are all #FFFFFF for stl metro)
const colors = [
    "#1E88E5",
    "#43A047",
    "#E53935",
    "#FB8C00",
    "#8E24AA",
    "#00ACC1",
    "#FDD835",
    "#6D4C41",
    "#3949AB",
    "#00897B"
];

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

function generateMetadata() {
    const fileContent = fs.readFileSync(inputFile, "utf8");
    const routes = parseCSV(fileContent);

    const metadata = routes.map((route, index) => {
        const routeId = route.route_id;
        const shortName = route.route_short_name || routeId;
        const longName = route.route_long_name || shortName;

        return {
            id: routeId,
            name: `${shortName} - ${longName}`,
            color: colors[index % colors.length],
            files: [
                `routes/70006_${routeId}_0.geojson`,
                `routes/70006_${routeId}_1.geojson`
            ]
        };
    });

    const output = `const routesMetadata = ${JSON.stringify(metadata, null, 2)};

    export default routesMetadata;
    `;

    fs.writeFileSync(outputFile, output);

    console.log(`Created routesMetadata.js with ${metadata.length} routes`);
}

generateMetadata();