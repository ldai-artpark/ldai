import Fuse from "fuse.js";
import district_state_map from "./district_state";
import _ from "lodash";

const fuzzySearch = new Fuse(Object.keys(district_state_map),{
    includeScore: true,
    isCaseSensitive: false
})

function findDistrictAndStates(distToSearch, stateToSearch) {

    const results = fuzzySearch.search(distToSearch);
    const districtNameFound =  results?.[0]?.item || null;

    const bestScore = _.minBy(results, (result) => result.score);

    const bestResults = results.filter((result) => result.score === bestScore.score);

    if(stateToSearch && bestResults.length > 1) {

        const foundStates = bestResults.map((result) => district_state_map[result.item]);

        const stateSearch = new Fuse(foundStates,{
            includeScore: true,
            isCaseSensitive: false
        });

        const stateResults = stateSearch.search(stateToSearch);

        const stateNameFound = stateResults?.[0]?.item || null;

        return {
            district: districtNameFound,
            state: stateNameFound
        }

    }

    return districtNameFound ? {
        district : districtNameFound,
        state: district_state_map[districtNameFound]
    } : {
        district: distToSearch,
        state: null
    };
}

export default findDistrictAndStates;