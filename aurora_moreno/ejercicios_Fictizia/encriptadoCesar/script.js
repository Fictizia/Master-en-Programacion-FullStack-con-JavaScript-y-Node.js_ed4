
document.getElementById('transfButton').addEventListener('click', cesarAlg)



function cesarAlg() {

    var originText = document.getElementById('originText').value;
    var desplNumber = parseInt(document.getElementById('desplNumber').value);
    new Promise(resolve => {

        var transfText = originText
            .split('')
            .map(letters => (letters !== ' ') ? String.fromCharCode(letters.charCodeAt() + desplNumber) : letters)
            .join('')

        resolve(transfText)

    })


        .then((finalResult) => { document.getElementById('result').innerText = finalResult })
}
