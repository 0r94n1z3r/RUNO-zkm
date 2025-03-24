export const addressDisplay = (address) => 
    `${address.city? address.city: ""}`+
    `${address.street? ', '+address.street : ""}`+
    `${address.house? ', д. '+address.house : ""}`+
    `${address.housing? ', корп. '+address.housing : ""}`+
    `${address.flat? ', кв. '+address.flat : ""}`+
    `${address.floor? ', '+address.flat+" этаж" : ""}`
