import Terraformer from 'terraformer';
import axios from 'axios';

export const calculateProgramBounds = areas => {
    const geojson = areas.map(area => area.geojson);
    const areaCollection = new Terraformer.GeometryCollection(geojson);
    const bbox = areaCollection.bbox();
    // BBOX uses lng, lat order. Google uses lat, lng order
    // Let's just name the fields and avoid using order altogether
    return {
        bottom_left: {
            lat: bbox[1],
            lng: bbox[0]
        },
        top_right: {
            lat: bbox[3],
            lng: bbox[2]
        }
    }
}

const DEVELOPER_ID = '85BC2053CC7E3ECD6941E88BD';
const BASE_URL = 'https://developer.trimet.org/ws/V1/stops';
export const getNearbyStops = (origin, callback) => {
    let lnglat = origin.lng.toString() + ',' + origin.lat.toString();
    axios.get(BASE_URL, {
        params: {
            appID: DEVELOPER_ID,
            json: true,
            ll: lnglat,
            meters: 400
        }
    })
    .then(response => {
        if (response.data && response.data.resultSet && response.data.resultSet.location) {
            console.log(response);
            callback(response.data.resultSet.location.length);
        } else {
            callback(0);
        }
    })
    .catch(error => {
        console.log(error);
        callback(0);
    });
}

export const selectActivePrograms = (selectors) => {
    let { formData, programs, areas } = selectors;
    let origin = new Terraformer.Point([formData.origin.lng, formData.origin.lat]);
    if (!formData.eligibility_restricted) {
        programs = programs.filter( program => program.eligibility_restricted === formData.eligibility_restricted);
    }
    programs = programs.filter( program => program.category !== 'alternative');
    programs = programs.filter( program => originIsInProgramBounds(program, areas, origin ) );
    programs = programs.sort((a,b) => {
        if (a.category === b.category) return 0;
        if (a.category === 'other') return -1;
        if (b.category === 'other') return 1;
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
    });
    return programs;
}

export const selectAlternativePrograms = (formData, programs) => {
    console.log(formData);
    if (!formData.eligibility_restricted) {
        programs = programs.filter( program => program.eligibility_restricted === formData.eligibility_restricted);
    }
    return programs.filter( program => program.category === 'alternative');
}

function originIsInProgramBounds(program, areas, origin) {
    let found = program.areas.some( areaID => {
        let area = areas.find( area => {
            return area.area_id == areaID;
        } );
        if (area) {
            return area.geojson.contains(origin);
        }
        return false;
    });
    return found;
}