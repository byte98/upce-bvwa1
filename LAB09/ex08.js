// 08 - FACTORIAL
function ex08()
{
    const input = prompt("Zadejte číslo");
    let res = 1;
    for (let i = 1; i <= parseInt(input); i++)
    {
        res *= i;
    }
    console.log("Faktoriál čísla " + input + " je: " + res);
}
