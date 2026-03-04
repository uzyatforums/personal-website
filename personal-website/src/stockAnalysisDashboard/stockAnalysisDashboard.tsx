import { useState } from 'react'
import {
    analyzeStock,
    VerticalAlignContainer,
    VerticalAlignContent
} from './stockAnalysisDashboard.ts'
import { Oval } from 'react-loader-spinner'

function stockAnalysisDashboard() {

    const [stockData, setStockData] = useState<any>()
    const [stockSymbol, setStockSymbol] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [gotData, setGotData] = useState(false)

    function goBack() {
        setGotData(false)
        setIsLoading(false)
    }

    async function runStockAnalysis() {
        setIsLoading(true)
        const gotStockData = await analyzeStock(stockSymbol)
        if (gotStockData) {
            setStockData(gotStockData)
            setGotData(true)
            setIsLoading(false)
        } else {
            goBack()
        }
    }

    if (gotData) {
        return (
            <VerticalAlignContainer>
                <VerticalAlignContent>
                <div>
                    <div onClick={() => goBack()}>Back</div>
                    {JSON.stringify(stockData)}
                </div>
            </VerticalAlignContent>
        </VerticalAlignContainer >
        )
    }

    return (
        <VerticalAlignContainer>
            <VerticalAlignContent>
                <div>
                    <div id="stock-analysis-dashboard-title">
                        STOCK ANALYSIS DASHBOARD
                    </div>

                    <div id="stock-analysis-dashboard-subtitle">
                        Put in a stock symbol you'd like to analyse (e.g. MSFT)
                    </div>

                    {isLoading ? (
                        <div>
                            <Oval
                                visible={true}
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        <div>
                            <input
                                value={stockSymbol}
                                onChange={(e) => setStockSymbol(e.target.value)}
                            />
                            <button
                                className="stock-analysis-dashboard-button"
                                onClick={runStockAnalysis}
                            >
                                Analyse
                            </button>
                        </div>
                    )}
                </div>
            </VerticalAlignContent>
        </VerticalAlignContainer>
    )
}

// ✅ NOW we are outside the function
export default stockAnalysisDashboard