// 04 - GREATES COMMON DIVISOR (EUCLIDEAN ALGORITHM)
function ex04()
{
    const input = prompt("Zadejte vstupy");
    let inputs = input.split(" ");
    if (inputs.length == 2)
    {
        let u = parseInt(inputs[0]);
        let v = parseInt(inputs[1]);
        if (v > u)
        {
            let temp = v;
            v = u;
            u = temp;
        }
        while (v != 0)
        {
            let r = u % v;
            u = v;
            v = r;
        }
        console.log("Největši společný dělitel čísel " + inputs[0] + " a " + inputs[1] + " je " + u);
    }
    else
    {
        console.error("Neplatný počet vstupů!. Očeávány byly dva vstupy, avšak zadáno jich bylo: " + inputs.length);
    }
}
