import { distance } from './distance';
import { deg2rad } from './distance';

export function findPaths(data, pathLength, beginning) {
  let objectOfPaths = { 1: [], 2: [], 3: [], 4: [] };
  let totalPathLength = pathLength;
  let start = beginning;

  for (let i = 0; i < data.businesses.length; i++) {
    let remainingPath = totalPathLength;
    let oneSlice = [];
    let oneSliceDistance = [];
    let comparePoint = start;
    let firstVisited = i;
    let walkingDistance = distance(
      comparePoint[0],
      comparePoint[1],
      data.businesses[i].coordinates.latitude,
      data.businesses[i].coordinates.longitude
    );
    remainingPath = remainingPath - walkingDistance;
    data.businesses[i].travelDistance = walkingDistance;

    if (remainingPath >= 0) {
      oneSlice.push(data.businesses[i]);
      oneSliceDistance.push(walkingDistance);
      // console.log('*****', possiblePath);
      // console.log('&&&&&', objectOfPaths[1]);
      // objectOfPaths[1].push([oneSlice, oneSliceDistance]);
      objectOfPaths[1].push(oneSlice);
      // objectOfPaths[1].push([remainingPath]);
      comparePoint = [
        data.businesses[i].coordinates.latitude,
        data.businesses[i].coordinates.longitude,
      ];
      for (let j = 0; j < data.businesses.length; j++) {
        if (j !== firstVisited) {
          walkingDistance = distance(
            comparePoint[0],
            comparePoint[1],
            data.businesses[j].coordinates.latitude,
            data.businesses[j].coordinates.longitude
          );
          remainingPath = remainingPath - walkingDistance;
          data.businesses[j].travelDistance = walkingDistance;
          if (remainingPath >= 0) {
            let twoSlice = [...oneSlice, data.businesses[j]];
            let twoSiceDistance = [...oneSliceDistance, walkingDistance];
            // objectOfPaths[2].push([twoSlice, twoSiceDistance]);
            objectOfPaths[2].push(twoSlice);
            // objectOfPaths[2].push([remainingPath]);
            comparePoint = [
              data.businesses[j].coordinates.latitude,
              data.businesses[j].coordinates.longitude,
            ];
            let secondVisited = j;
            for (let k = 0; k < data.businesses.length; k++) {
              if (k !== firstVisited && k !== secondVisited) {
                walkingDistance = distance(
                  comparePoint[0],
                  comparePoint[1],
                  data.businesses[k].coordinates.latitude,
                  data.businesses[k].coordinates.longitude
                );
                remainingPath = remainingPath - walkingDistance;
                data.businesses[k].travelDistance = walkingDistance;
                if (remainingPath >= 0) {
                  let threeSlice = [...twoSlice, data.businesses[k]];
                  let threeSliceDistance = [
                    ...twoSiceDistance,
                    walkingDistance,
                  ];
                  objectOfPaths[3].push([threeSlice, threeSliceDistance]);
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
                      walkingDistance = distance(
                        comparePoint[0],
                        comparePoint[1],
                        data.businesses[l].coordinates.latitude,
                        data.businesses[l].coordinates.longitude
                      );
                      remainingPath = remainingPath - walkingDistance;
                      data.businesses[l].travelDistance = walkingDistance;
                      if (remainingPath > 0) {
                        let fourSlice = [...threeSlice, data.businesses[l]];
                        let fourSliceDistance = [
                          ...threeSliceDistance,
                          walkingDistance,
                        ];
                        objectOfPaths[4].push([fourSlice, fourSliceDistance]);
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
