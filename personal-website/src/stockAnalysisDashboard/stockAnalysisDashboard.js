const stockAnalysisDashboardInput = 'stock-analysis-dashboard-input'

async function analyzeStock() {
    document.getElementById('stock-analysis-dashboard-data').innerText = ""
    const stockSymbolToAnalyze = document.getElementById(stockAnalysisDashboardInput).value
    if(stockSymbolToAnalyze.length === 0) {
        alert('Please enter a stock symbol to analyze')
        return
    }
    const url = 'http://localhost:5000/analyze-stock/' + stockSymbolToAnalyze
    
    const response = await fetch(url) 
    if(!response.ok) {
        alert('There was a probblem getting the analysis for your stock: ' + stockSymbolToAnalyze)
    }
    const data = await response.json()
    console.log(data)
    document.getElementById('stock-analysis-dashboard-data').innerText = JSON.stringify(data)
}