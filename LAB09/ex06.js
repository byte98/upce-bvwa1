// 06 - DRAWING A SQUARE
function ex06()
{
    const input = prompt("Zadejte velikost");
    if (isNaN(parseInt(input)))
    {
        console.error("Velikost musí být číslo!");
    }
    else
    {
        let length = parseInt(input);
        if (length <= 0)
        {
            console.error("Velikost musí být alespoň 1!");
        }
        else if (length > 20)
        {
            console.error("Velikost musí být maximálně 20!");
        }
        else
        {
            console.group("Výstup");
            for (let c = 0; c < length; c++)
            {
                let row = "";
                for (let r = 0; r < length; r++)
                {
                    if (c == 0 || c == (length - 1) || r == 0 || r == (length - 1))
                    {
                        row += "*";
                    }
                    else
                    {
                        row += " ";
                    }
                    
                }
                console.log(row);
            }
            console.groupEnd();
        }
    }
}
