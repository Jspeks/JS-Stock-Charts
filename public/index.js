async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // making a fetch request

    const data = await fetch ('https://github.com/Jspeks/JS-Stock-Charts.git')
    const result = await data.json()

    const { GME, MSFT, DIS, BNTX} = result
    const stocks = [GME, MSFT, DIS, BNTX]

 stocks.forEach( stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values)
                ))
            }]
        }
    });

    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Average',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    getAverage(stock.values)
                ))
            }]
        }
    });

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
}
function findHighest(values) {
    let highest = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
}

function getAverage(values) {
    let sum = 0;
    values.forEach(value => {
        sum += parseFloat(value.high)
    })
    return sum / values.length
}
main()