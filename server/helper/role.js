const roleBasedAccessMap =require('../enums/roleBasedAccessMap')
const models = require('../models/index')

// return whether user has the permission to access that resources
const role = async({email, method, endpoint}) => {
    if (!roleBasedAccessMap.hasOwnProperty(endpoint)) return true // if no mention of endpoint in roleBasedAccessMap, assume no need to restrict access
    const user = await models.User.findOne(
        { 
            where: { email },
            include: [
                {
                    model: models.User_Permission, 
                    as: 'user_permission',
                    include: [
                        {
                            model: models.Permission,
                            as: 'permission',
                        }
                    ]
                }
            ]
        }
    )
    console.log("user", user)
    if (!user) return false
    
    return user?.user_permission.find((value)=>{
        return value?.permission?.name === roleBasedAccessMap[endpoint][method]
    })
};


module.exports = role

