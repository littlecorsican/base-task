const roleBasedAccessMap =require('../enums/roleBasedAccessMap')

// return whether user has the permission to access that resources
const role = ({permissions, method, endpoint}) => {
    console.log("role", roleBasedAccessMap)
    console.log("role2", roleBasedAccessMap[endpoint])
    console.log("role3", permissions)
    if (!roleBasedAccessMap.hasOwnProperty(endpoint)) return true // if no mention of endpoint in roleBasedAccessMap, assume no need to restrict access
    return permissions.find((value)=>{
        return value?.permission?.name === roleBasedAccessMap[endpoint][method]
    })
};


module.exports = role

