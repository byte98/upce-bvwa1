// 07 - PIN
function ex07()
{
    const PIN = "1234";
    let i = 0;
    let ok = false;
    let msg = "Zadejte pin";
    for(; i < 3; i++)
    {
        const input = prompt(msg);
        if (input == PIN)
        {
            ok = true;
            break;
        }
        else
        {
            msg = "Špatný pin! Zkuste to znovu";
        }
    }
    if (ok)
    {
        console.log("PIN OK");
    }
    else
    {
        console.error("Špatný pin!");
    }
}
