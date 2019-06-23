





export default class Sevice {

    async getTemporada(value, next) {
        fetch('http://ergast.com/api/f1/' + value.key + '.json')
            .then((response) => response.json())

            .then((data) => {
                next(data.MRData.RaceTable.Races)
            }).catch((err) => {
                next(err)

            });
    }

    async get(value, tipo, next) {
        fetch('http://ergast.com/api/f1/' + value.season + '/' + value.round + '/' + tipo + '.json')
            .then((response) => response.json())

            .then((data) => {
                if (tipo == "constructors") {
                    next(data.MRData.ConstructorTable.Constructors)
                } else if (tipo == "drivers") {
                    next(data.MRData.DriverTable.Drivers)
                } else if (tipo == "results") {
                    var newdata = [];


                    data.MRData.RaceTable.Races.forEach(element => {
                        element.Results.forEach(element => {
                           
                            var d = {
                                points: element.points,
                                ...element.Constructor,
                                ...element.Driver,
                                grid: element.grid,
                                position: element.position,
                                ...element.FastestLap
                            }
                            newdata.push(d);
                        });

                    });
                    next(newdata)

                }
            }).catch((err) => {
                next(err)
            });
    }
}

/* Object {
    "Constructor": Object {
      "constructorId": "bar",
      "name": "BAR",
      "nationality": "British",
      "url": "http://en.wikipedia.org/wiki/British_American_Racing",
    },
    "Driver": Object {
      "code": "BUT",
      "dateOfBirth": "1980-01-19",
      "driverId": "button",
      "familyName": "Button",
      "givenName": "Jenson",
      "nationality": "British",
      "permanentNumber": "22",
      "url": "http://en.wikipedia.org/wiki/Jenson_Button",
    },
    "FastestLap": Object {
      "AverageSpeed": Object {
        "speed": "203.803",
        "units": "kph",
      },
      "Time": Object {
        "time": "1:37.912",
      },
      "lap": "2",
      "rank": "14",
    },
    "grid": "9",
    "laps": "2",
    "number": "3",
    "points": "0",
    "position": "18",
    "positionText": "R",
    "status": "Engine",
  },
  Object {
    "Constructor": Object {
      "constructorId": "bar",
      "name": "BAR",
      "nationality": "British",
      "url": "http://en.wikipedia.org/wiki/British_American_Racing",
    },
    "Driver": Object {
      "code": "DAV",
      "dateOfBirth": "1979-04-18",
      "driverId": "davidson",
      "familyName": "Davidson",
      "givenName": "Anthony",
      "nationality": "British",
      "url": "http://en.wikipedia.org/wiki/Anthony_Davidson",
    },
    "FastestLap": Object {
      "AverageSpeed": Object {
        "speed": "196.657",
        "units": "kph",
      },
      "Time": Object {
        "time": "1:41.470",
      },
      "lap": "2",
      "rank": "18",
    },
    "grid": "15",
    "laps": "2",
    "number": "4",
    "points": "0",
    "position": "19",
    "positionText": "R",
    "status": "Engine",
    */