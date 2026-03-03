export async function analyzeStock(stockSymbolToAnalyze: string) {
    if (stockSymbolToAnalyze.length === 0) {
        alert('Please enter a stock symbol to analyze')
        return
    }
    const url = 'http://localhost:5000/analyze-stock/' + stockSymbolToAnalyze

    const response = await fetch(url)
    if (!response.ok) {
        alert('There was a probblem getting the analysis for your stock: ' + stockSymbolToAnalyze)
    }
    const data = await response.json()
    return data
}