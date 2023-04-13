// 02 - CALCULATOR
function ex02()
{
    const input = prompt("Zadejte výraz");
    let members = input.split(" ");
    if (members.length != 3)
    {
        console.error("Neočekávaný počet vstupů. Očekávány byly tři, na vstupu je však: " + members.length);
    }
    else
    {
        let a = parseFloat(members[0]);
        let b = parseFloat(members[1]);
        let op = members[2];
        switch(op)
        {
            case "+": console.log(a + " + " + b + " = " + (a + b)); break;
            case "-": console.log(a + " - " + b + " = " + (a - b)); break;
            case "*": console.log(a + " * " + b + " = " + (a * b)); break;
            case "/": {
                if (b == 0)
                {
                    console.error("Nelze dělit nulou!");
                }
                else
                {
                    console.log(a + " / " + b + " = " + (a / b));
                }
                break;
            }
            default: console.error("Neznámá operace '" + op + "'!");
        }
    }
}
