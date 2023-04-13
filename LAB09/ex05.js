// 05 - NUMERICAL SUM
function ex05()
{
    const input = prompt("Zadejte číslo");
    if (isNaN(parseInt(input)) == false)
    {
        let sum = 0;
        let i = input;
        while(i.length > 0)
        {
            sum += parseInt(i.charAt(0));
            i = i.substring(1);
        }
        console.log("Ciferný součet čísla " + input + " je " + sum);
    }
    else
    {
        console.error("Vstup musí být číslo!");
    }
}
