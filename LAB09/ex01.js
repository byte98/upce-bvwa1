// 01 - TAXI
function ex01()
{
    let tariff = function(distance)
    {
        let reti = 0;
        if (distance < 20)
        {
            reti = 25
        }
        else if (distance >= 20 && distance < 40)
        {
            reti = 23
        }
        else if (distance >= 40 && distance < 60)
        {
            reti = 20;
        }
        else if (distance >= 60)
        {
            reti = 17;
        }
        return reti;
    };
    const input = prompt("Zadejte vzdálenost");
    let dist = parseFloat(input);
    if (dist < 0){
        console.error("Vzdálenost nesmí být záporné cislo!");
    }
    else
    {
        console.log("Cena: " + (tariff(dist) * dist) + " CZK");
    }
}
