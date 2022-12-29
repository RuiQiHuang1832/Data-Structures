let arr = [3, 5, 1, 3, 4, 6, 8, 3, 1,];
let order = []

function compare(a, b) {
    if (a > b) {
        order.push("longer")
    } else if (a < b) {
        order.push("shorter")
    } else {
        order.push("equal")
    }
}

for (let i = 0; i < arr.length - 1; i++)
    for (let j = i + 1; j < arr.length; j++)
        compare(arr[i], arr[j])


console.log(order)        
