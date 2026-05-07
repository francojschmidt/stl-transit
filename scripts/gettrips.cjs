// script for building json file with data for all stops
const fs = require("fs");
const path = require("path");

const inputFile = path.join("../finalproject/data/google_transit/", "trips.txt");
const outputDir = path.join("./src/util/");
const outputFile = path.join(outputDir, "tripData.js");

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

function getTrips() {
    const fileContent = fs.readFileSync(inputFile, "utf8");
    const trips = parseCSV(fileContent);

    const tripData = {};

    trips.forEach((trip) => {
        const tripId = trip.trip_id;

        tripData[tripId] = {
            routeId: trip.route_id,
            headsign: trip.trip_headsign,
            directionId: trip.direction_id
        };
    });

    return tripData;
}

function writeTripFile() {
    const tripData = getTrips();

    const output = `
const tripData = ${JSON.stringify(tripData, null, 2)};

export default tripData;
`;

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputFile, output);
    console.log("tripData built")
}

writeTripFile();