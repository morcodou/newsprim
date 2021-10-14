
export  const getHigtNubers = (tables : number[]) : number[] => {
    
    // 3 numbers => biggest products
    // 3 biggest positive number (OK) [4, 9, 8, -7, 5]
    // bigest positve and 2 lowest negative [4, -9, -8, 7, 5]
    // array has less that 3 items
    // all items are negative values [-3, -4, -9, -5]
    // length is 3 and include  0 [2,0,0]
    // length is 3 and include  0 [2,0,0]
    // length is more and include  [-2, 0, 1, 4]  

    return [];
} 


// Donut - same price- donut type base price
// track donut made by day
// track donaut by sold
// Catalog

// SELECT type, UnitPrice
// FROM Donut
// Order BY type asc

// // average - donut
// SELECT type
// FROM Donut
// GROUP BY price 
// HAVING price AVG(price)


// SELECT type
// FROM Donut
// WHERE price > (
//     SELECT argv(pric) 
//     FROM Donut
// )

// // Top 5 selling gonut

// SELECT top 5 type
// FROM Calander cal
// INNER JOIN Inventory Inv on cal.day = inv.day
// WHERE cal.season = 'fall'
// GROUP BY type
// ORDER BY SUM(Inv.Sale) desc

// SELECT tye
// FROM Calander cal
// OUTER JOIN Inventory Inv on cal.day = inv.day
// WHERE cal.season = 'fall'
// GROUP BY type
// ORDER BY SUM(Inv.Sale) desc
