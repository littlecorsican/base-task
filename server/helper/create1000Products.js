const create1000Products=()=>{
    const products = new Array(1000).fill({})
    const names = [
        "pen", "pencil", "lightbulb", "laptop", "water bottle", "book", "coca cola", "desk", "battery", "cdrom", "bedsheet"
    ]
    const descriptions = [
        "this item weights 100g", 
        "this item is bought at 7 eleven",
        "i got this as a gift",
        "i got this using a gift card",
        "i bought this using paypal",
        "i found this on the floor",
        "someone submitted this via lost and found",
        "it is wet when given to me",
        "i got 2 of this via buy 1 free 1",
        "i got a 50% discount for this"
    ]
    const prices = [
        8,7,4,3,5,6,1,2,9,10
    ]
    products.forEach((item, index, arr)=> {
        const random_name = Math.round(Math.random()*10)
        const random_description = Math.round(Math.random()*10)
        const random_price = Math.round(Math.random()*10)
        arr[index] = {
            name: names[random_name],
            description: descriptions[random_description],
            price: prices[random_price],
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })
    console.log(products)
    return products
}


module.exports = create1000Products