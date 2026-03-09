import styled from 'styled-components'
export async function analyzeStock(stockSymbolToAnalyze: string) {
    if (stockSymbolToAnalyze.length === 0) {
        alert('Please enter a stock symbol to analyze')
        return
    }
    //development url:
    // const url = 'http://localhost:5000/analyze-stock/' + stockSymbolToAnalyze
    //production url:
    // const url = 'https://text-analysis-tool.onrender.com/analyze-stock/' + stockSymbolToAnalyze
    const url = 'https://text-analysis-tool-glsz.onrender.com//analyze-stock/' + stockSymbolToAnalyze
    
    const response = await fetch(url)
    if (!response.ok) {
        alert('There was a probblem getting the analysis for your stock: ' + stockSymbolToAnalyze)
    }
    const data = await response.json()
    return data
}

export const PrimaryColor = '#467bb0';
export const ThemeGreen = '#7bdb76';
export const ThemeYellow = '#ffcc5c';
export const ThemeRed = '#ff6169';

export const VerticalAlignContainer = styled.div`
    width: 100%;
    height: 100%;
    display: table;
`

export const VerticalAlignContent = styled.div`
  display: table-cell;
    vertical-align: middle;
`

export const DashboardGridContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  border: solid red 1px;
`

export const DashboardGridContent = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
`