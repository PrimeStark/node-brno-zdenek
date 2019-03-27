const request = require("request-promise")

const BASE_URL = "http://swapi.co/api"
const LUKE = "/people/1"

// SOLUTION n.1
// async function getVehicle(vehicle) {
//   const vehicleResult = await request(`${vehicle}`)
//   const vehicleData = JSON.parse(vehicleResult)
//   console.log(vehicleData.name)
// }

// async function getLuke() {
//   const result = await request(`${BASE_URL}${LUKE}`)
//   const data = await JSON.parse(result)

//   for (vehicle of data.vehicles) {
//     getVehicle(vehicle)
//   }
// }

// SOLUTION n.2
async function getVehicle(vehicle) {
  const vehicleResult = await request(`${vehicle}`)
  const vehicleData = JSON.parse(vehicleResult)
  console.log(vehicleData.name)
}

async function getLuke() {
  const result = await request(`${BASE_URL}${LUKE}`)
  const data = await JSON.parse(result)

  data.vehicles.map(vehicle => getVehicle(vehicle))
}

getLuke()
