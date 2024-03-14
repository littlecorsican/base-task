const roleBasedAccessMap =require('../enums/roleBasedAccessMap')

// return whether user has the permission to access that resources
const role = ({permissions, method, endpoint}) => {
    if (!roleBasedAccessMap.hasOwnProperty(endpoint)) return true // if no mention of endpoint in roleBasedAccessMap, assume no need to restrict access
    return permissions.find((value)=>{
        return value?.permission?.name === roleBasedAccessMap[endpoint][method]
    })
};


module.exports = role

