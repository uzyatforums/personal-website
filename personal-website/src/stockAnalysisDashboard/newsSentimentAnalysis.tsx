import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import NumberStat from './numberStat';
import { ThemeGreen, ThemeRed, ThemeYellow } from './stockAnalysisDashboard';

ChartJS.register(ArcElement, Tooltip, Legend);

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const ChartSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  justify-content: space-between; 
  align-items: flex-start;
  padding: 4px;
  border: 1px solid #4facfe; 
  min-width: 0;
`;

const ChartContainer = styled.div`
  width: 100%; 
  max-height: 130px; /* Reduced to ensure vertical space for title on the right */
  flex: 1;
  position: relative;
`;

const StatsSide = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: flex-start;
  height: 100%;
  padding: 8px 6px; 
  border: 1px solid #f093fb; 
  min-width: 0;
  /* Use gap for tight, predictable spacing between title and stats */
  gap: 4px; 
`;

const AnalysisTitle = styled.div`
  /* Reduced font size significantly */
  font-size: 0.65rem; 
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  margin-bottom: 2px;
  flex-shrink: 0;
`;

const SmallStatWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;

  /* Target the Number (Value) - Shrinking this is key */
  & > div > div:first-child, 
  & > div > span:first-child {
    font-size: 0.95rem !important; /* Shrunk below 1rem to save height */
    line-height: 1 !important;
    margin-bottom: 0px !important;
  }
  
  /* Target the Label - Shrinking to tiny size */
  & > div > div:last-child,
  & > div > span:last-child { 
    font-size: 0.6rem !important; 
    color: #aaa !important;
    line-height: 1 !important;
    white-space: nowrap;
    margin: 0 !important;
  }

  /* Extreme fallback to catch any nested text */
  * {
    line-height: 1.1 !important;
  }
`;

interface NewsSentimentAnalysisProps {
  newsTextAnalysis: any;
}

const NewsSentimentAnalysis: React.FC<NewsSentimentAnalysisProps> = ({ newsTextAnalysis }) => {
  const sentiment = newsTextAnalysis?.data?.sentiment;
  const wordCount = newsTextAnalysis?.metadata?.wordsAnalyzed;
  const sentenceCount = newsTextAnalysis?.data?.keySentences?.length;

  if (!sentiment) return null;

  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [{
      data: [sentiment.pos, sentiment.neg, sentiment.neu],
      backgroundColor: [ThemeGreen, ThemeRed, ThemeYellow],
      borderWidth: 0,
      cutout: '55%', 
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 5,
          padding: 2,
          color: '#aaa',
          font: { size: 8 },
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <MainWrapper>
      <ChartSide>
        <ChartContainer>
          <Doughnut data={data} options={options} />
        </ChartContainer>
      </ChartSide>

      <StatsSide>
        <AnalysisTitle>News Text Analysis</AnalysisTitle>
        <SmallStatWrapper>
          <NumberStat value={sentenceCount || 0} label="Sentences Analyzed" />
        </SmallStatWrapper>
        <SmallStatWrapper>
          <NumberStat value={wordCount || 0} label="Words Analyzed" />
        </SmallStatWrapper>
      </StatsSide>
    </MainWrapper>
  );
};

export default NewsSentimentAnalysis;