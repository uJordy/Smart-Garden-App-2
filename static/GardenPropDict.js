const GardenPropDict = {
  ["Temperature"]:
  {
    PropSuffix: "°C",
    Step: 0.1,
    MinVal: 0,
    MaxVal: 35,
  },
  ["Light Intensity"]:
  {
    PropSuffix: "%",
    Step: 1,
    MinVal: 0,
    MaxVal: 100,
  },
  ["Soil Moisture"]:
  {
    PropSuffix: "%",
    Step: 1,
    MinVal: 0,
    MaxVal: 100,
  },
  ["Humidity"]:
  {
    PropSuffix: "%",
    Step: 1,
    MinVal: 0,
    MaxVal: 100,
  },
}

export default GardenPropDict;