// 03 - QUADRATIC EQUATIONS
function ex03()
{
    const input = prompt("Zadejte koeficienty");
    let coeffs = input.split(" ");
    if (coeffs.length == 3)
    {
        let a = parseFloat(coeffs[0]);
        let b = parseFloat(coeffs[1]);
        let c = parseFloat(coeffs[2]);
        let x1 = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
        let x2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
        console.log(a + "x^2 " + (b >= 0 ? "+ " : "- ") + Math.abs(b) + "x " + (c >= 0 ? "+ " : "- ") + Math.abs(c) + ": x1 =" + x1  + ", x2 = " + x2);
    }
    else
    {
        console.error("Očekávány jsou tři koeficienty, avšak na vstupu je: " + coeffs.length);
    }
}
