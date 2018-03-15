import store from '../store';
import {updateSimulationVehicles} from '../actions';
const apiRoot = process.env.SIMULATION_CAPTAIN_HOST;

export const getSimulationVehicles = ({lat, long}) => {
  let url = new URL('/simulation/drones', apiRoot);

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const body = {longitude: long, latitude: lat};
  const options = { method: 'POST', headers };
  options.body = JSON.stringify(body);
  return fetch(url, options).then(response => response.json());
};


export const updateSimulationVehiclesAndDispatch = () => {
  const coords = store.getState().map.coords;
  if (!coords.lat || !coords.long) return;
  store.dispatch(updateSimulationVehicles(coords));
};
