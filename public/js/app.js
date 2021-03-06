console.log('Client side javascript file is loaded.')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.getElementById('msg1');
const para2 = document.getElementById('msg2');

para1.setAttribute('style', 'white-space: pre;');
para2.setAttribute('style', 'white-space: pre;');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();     //By default, browser refreshes the page, we don't want that to happen

    para1.textContent = 'Loading...';
    para2.textContent = '';

    const address = search.value;
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {

            para1.textContent = '';

            if(data.error) {
                return para2.textContent = data.error;
            }
            const forecast = data.summary + '\r\n' + data.temperature + '\r\n' + data.temperatureLow + '\r\n' + data.temperatureHigh + '\r\n' + data.chancesOfRain + '\r\n' + data.location;
            para1.textContent = forecast;
        });
    });
});
