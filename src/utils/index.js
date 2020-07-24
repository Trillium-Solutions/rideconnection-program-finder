import Terraformer from 'terraformer';

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

export const selectActivePrograms = (selectors) => {
    let { formData, programs, areas } = selectors;
    let origin = new Terraformer.Point([formData.origin.lng, formData.origin.lat]);
    let categories = [];
    if (formData.medical) categories.push('medical');
    if (formData.shopping) categories.push('shopping');
    if (formData.social) categories.push('lunch');
    if (otherCategoryIsApplicable(categories, formData)) categories.push('other');
    if (!formData.eligibility_restricted) {
        programs = programs.filter( program => program.eligibility_restricted === formData.eligibility_restricted);
    }
    programs = programs.filter( program => categories.includes(program.category) );
    programs = programs.filter( program => originIsInProgramBounds(program, areas, origin ) );
    return programs;
}

function otherCategoryIsApplicable(categories, formData) {
    if ((categories.length === 1) && formData.social) {
        return false;
    }
    return true;
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