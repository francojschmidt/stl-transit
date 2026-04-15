// script to preprocess gtfs schedule data, data too big otherwise
import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';
import { parse } from 'csv-parse/sync';

const GTFS_SCHEDULE_URL = 'https://www.metrostlouis.org/Transit/google_transit.zip';
const GTFS_DIR = '.gtfs-tmp';
const ZIP_PATH = '.gtfs-tmp/google_transit.zip'

async function download(url, dest) {
    console.log('attempting to download schedule...');
    const res = await fetch(url);
    if(!res.ok) {
        throw new Error('download failed: ' + res.status);
    }
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
}

function unzip(zipPath, outputDir) {
    fs.mkdirSync(GTFS_DIR, { recursive: true });
    execSync(`powershell -Command "Expand-Archive -Path '${ZIP_PATH}' -DestinationPath '${GTFS_DIR}'"`,
        (err) => {
            if(err) console.error("Error: ", err);
            else console.log("unzipping complete");
        }
    );
}

function read(file) {
    return parse(fs.readFileSync(path.join(GTFS_DIR, file), 'utf8'), { columns: true });
}

async function main() {
    fs.mkdirSync(GTFS_DIR, { recursive: true });

    await download(GTFS_SCHEDULE_URL, ZIP_PATH);
    unzip(ZIP_PATH, GTFS_DIR);

    const shapes = read('shapes.txt');
    const trips = read('trips.txt');
    const routes = read('routes.txt');
    const stops = read('stops.txt');

    // grouping shapes by ID
    const shapeMap = {};
    for(const pt of shapes) {
        if (!shapeMap[pt.shape_id]) shapeMap[pt.shape_id] = [];
        shapeMap[pt.shape_id].push(pt);
    }

    for(const id in shapeMap) {
        shapeMap[id].sort((a, b) => +a.shape_pt_sequence - +b.shape_pt_sequence);
    }


}

// bus routes all given #FFFFFF in gtfs data
function assignColors() {

}