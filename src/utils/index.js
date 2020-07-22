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