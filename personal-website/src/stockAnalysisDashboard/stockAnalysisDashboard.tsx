import { useState } from 'react'
import styled from 'styled-components'
import {
  analyzeStock,
  VerticalAlignContainer,
  VerticalAlignContent,
  DashboardGridContainer
} from './stockAnalysisDashboard'
import { Oval } from 'react-loader-spinner'
import DashboardGrid from './dashboardGrid'

// --- Styled Components for the Input Section ---

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-end; 
  gap: 15px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  color: white;
  font-size: 1.2rem;
  padding: 8px 4px;
  width: 100%;
  outline: none;
  transition: border-bottom 0.3s ease;

  &:focus {
    border-bottom: 2px solid #ffffff;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const AnalyzeButton = styled.button`
  background: transparent;
  border: 1.5px solid white;
  color: white;
  padding: 10px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: white;
    color: #4facfe;
  }
`;

const BackButton = styled.div`
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 15px;
  display: inline-block;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

// --- Main Component ---

function StockAnalysisDashboard() {
  const [stockData, setStockData] = useState<any>()
  const [stockSymbol, setStockSymbol] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [gotData, setGotData] = useState(false)

  function goBack() {
    setGotData(false)
    setIsLoading(false)
  }

  async function runStockAnalysis() {
    if (!stockSymbol) return;
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
          <DashboardGridContainer>
            <BackButton onClick={() => goBack()}>← Back to Search</BackButton>
            <div>
              <DashboardGrid stockData={stockData} />
            </div>
          </DashboardGridContainer>
        </VerticalAlignContent>
      </VerticalAlignContainer>
    )
  }

  return (
    <VerticalAlignContainer>
      <VerticalAlignContent>
        <HeaderSection>
          <Title>Stock Analysis Dashboard</Title>
          <Subtitle>Put in a stock symbol you'd like to analyse (e.g. MSFT)</Subtitle>

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#ffffff"
                secondaryColor="rgba(255,255,255,0.3)"
                ariaLabel="oval-loading"
              />
            </div>
          ) : (
            <InputContainer>
              <StyledInput
                placeholder="Enter Ticker..."
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && runStockAnalysis()}
              />
              <AnalyzeButton onClick={runStockAnalysis}>
                Analyse
              </AnalyzeButton>
            </InputContainer>
          )}
        </HeaderSection>
      </VerticalAlignContent>
    </VerticalAlignContainer>
  )
}

export default StockAnalysisDashboard;