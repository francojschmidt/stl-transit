import { Polyline } from 'react-leaflet';
import './Route.css'

const stlPosition = [38.6274, -90.1982];


function Route() {
    const testShape = [
        [38.628, -90.198], [38.627, -90.1984], [38.6275, -90.1978],
    ];
    const routeOption = { color: 'blue' };

    return (
        <Polyline pathOptions={routeOption} positions={testShape} />
    )
}

export default Route