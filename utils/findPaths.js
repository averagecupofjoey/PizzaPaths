import { distance } from './distance';
import { deg2rad } from './distance';

export function findPaths(data) {
  let objectOfPaths = { 1: [], 2: [], 3: [], 4: [] };
  let totalPathLength = 800;
  let start = [40.765837, -73.9939515];

  for (let i = 0; i < data.businesses.length; i++) {
    console.log(i);
    let remainingPath = totalPathLength;
    let oneSlice = [];
    let comparePoint = start;
    let firstVisited = i;
    remainingPath =
      remainingPath -
      distance(
        comparePoint[0],
        comparePoint[1],
        data.businesses[i].coordinates.latitude,
        data.businesses[i].coordinates.longitude
      );
    console.log(remainingPath);
    if (remainingPath >= 0) {
      oneSlice.push(data.businesses[i]);
      // console.log('*****', possiblePath);
      // console.log('&&&&&', objectOfPaths[1]);
      objectOfPaths[1].push([oneSlice, remainingPath]);
      comparePoint = [
        data.businesses[i].coordinates.latitude,
        data.businesses[i].coordinates.longitude,
      ];
      for (let j = 0; j < data.businesses.length; j++) {
        if (j !== firstVisited) {
          remainingPath =
            remainingPath -
            distance(
              comparePoint[0],
              comparePoint[1],
              data.businesses[j].coordinates.latitude,
              data.businesses[j].coordinates.longitude
            );
          if (remainingPath >= 0) {
            let twoSlice = [...oneSlice, data.businesses[j]];
            objectOfPaths[2].push([twoSlice, remainingPath]);
            comparePoint = [
              data.businesses[j].coordinates.latitude,
              data.businesses[j].coordinates.longitude,
            ];
            let secondVisited = j;
            for (let k = 0; k < data.businesses.length; k++) {
              if (k !== firstVisited && k !== secondVisited) {
                remainingPath =
                  remainingPath -
                  distance(
                    comparePoint[0],
                    comparePoint[1],
                    data.businesses[j].coordinates.latitude,
                    data.businesses[j].coordinates.longitude
                  );
                if (remainingPath >= 0) {
                  let threeSlice = [...twoSlice, data.businesses[k]];
                  objectOfPaths[3].push([threeSlice, remainingPath]);
                  comparePoint = [
                    data.businesses[k].coordinates.latitude,
                    data.businesses[k].coordinates.longitude,
                  ];
                  let thirdVisited = k;
                  for (let l = 0; l < data.businesses.length; l++) {
                    if (
                      l !== firstVisited &&
                      l !== secondVisited &&
                      l !== thirdVisited
                    ) {
                      remainingPath =
                        remainingPath -
                        distance(
                          comparePoint[0],
                          comparePoint[1],
                          data.businesses[j].coordinates.latitude,
                          data.businesses[j].coordinates.longitude
                        );
                      if (remainingPath > 0) {
                        let fourSlice = [...threeSlice, data.businesses[l]];
                        objectOfPaths[4].push([fourSlice, remainingPath]);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return objectOfPaths;
}
