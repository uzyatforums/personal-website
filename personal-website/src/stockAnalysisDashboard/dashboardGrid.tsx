import { useEffect, useRef } from 'react';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { DashboardGridContent } from './stockAnalysisDashboard'
import NumberStat from './numberStat';
import LineChartContent from './lineChartContent'
import NewsList from './newsLinks'
import NewsSentimentAnalysis from './newsSentimentAnalysis';

function DashboardGrid({ stockData }: { stockData: any }) {
  const gridRef = useRef<GridStack | null>(null);

  useEffect(() => {
    // Initialize GridStack with the ref to prevent double-init issues
    if (!gridRef.current) {
      gridRef.current = GridStack.init({
        float: true,
        cellHeight: 'auto',
        animate: true,
      });
    }
  }, []);

  return (
    <div>
      <div className="grid-stack">
        {/* First Row */}
        <div className="grid-stack-item" gs-w="3">
          <DashboardGridContent className="grid-stack-item-content">
            <NumberStat
              value={stockData.basicInfo.marketCap}
              label='Market Cap'
              center={true}
            />
          </DashboardGridContent>
        </div>
        <div className="grid-stack-item" gs-w="3">
          <DashboardGridContent className="grid-stack-item-content">
            <NumberStat
              value={stockData.basicInfo.fullTimeEmployees}
              label='Employees'
              center={true}
            />
          </DashboardGridContent>
        </div>
        <div className="grid-stack-item" gs-w="3">
          <DashboardGridContent className="grid-stack-item-content">
            <NumberStat
              value={stockData.basicInfo.totalRevenue}
              label='Total Revenue'
              center={true}
            />
          </DashboardGridContent>
        </div>
        <div className="grid-stack-item" gs-w="3">
          <DashboardGridContent className="grid-stack-item-content">
            <NumberStat
              value={stockData.basicInfo.trailingEps}
              label='Earnings Per Share'
              center={true}
            />
          </DashboardGridContent>
        </div>

        {/* Second Row */}
        <div className="grid-stack-item" gs-w="10" gs-h="3">
          <DashboardGridContent className="grid-stack-item-content">
            <LineChartContent
              priceHistory={stockData.priceHistory}
            />
          </DashboardGridContent>
        </div>
        <div className="grid-stack-item" gs-w="2" gs-h="2">
          <DashboardGridContent className="grid-stack-item-content">
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Future Earnings</div>
            {stockData.futureEarningsDates.map((nextDate: string) => (
              <div key={nextDate}>{nextDate}</div>
            ))}
          </DashboardGridContent>
        </div>

        {/* Third Row */}
        <div className="grid-stack-item" gs-w="5" gs-h="2">
          <DashboardGridContent className="grid-stack-item-content">
            <NewsList
              newsLinks={stockData.newsArticles}
            ></NewsList>
          </DashboardGridContent>
        </div>

        <div className="grid-stack-item" gs-w="4" gs-h="2">
          <DashboardGridContent className="grid-stack-item-content">
            {/* PASS THE PROP HERE */}
            <NewsSentimentAnalysis
              newsTextAnalysis={stockData.newsTextAnalysis}
            />
          </DashboardGridContent>
        </div>

        <div className="grid-stack-item" gs-w="3" gs-h="2">
          <DashboardGridContent className="grid-stack-item-content">
            <img
              src={
                stockData.newsTextAnalysis.data.wordCloudImage.startsWith('data:image')
                  ? stockData.newsTextAnalysis.data.wordCloudImage.trim()
                  : `data:image/png;base64,${stockData.newsTextAnalysis.data.wordCloudImage.replace(/"/g, '').trim()}`
              }
              alt="Word Cloud"
              style={{ height: '100%', width: '100%', objectFit: 'contain' }}
              onError={(e) => {
                console.error("Base64 string was invalid. Check the console for the raw data.");
                e.currentTarget.src = "https://placehold.co/600x400?text=Invalid+Image+Data";
              }}
            />
          </DashboardGridContent>
        </div>





      </div>
    </div>
  )
}

export default DashboardGrid;