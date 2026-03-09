import React from 'react';
import styled from 'styled-components';
import { PrimaryColor } from './stockAnalysisDashboard';

interface NewsLink {
  title: string;
  link: string;
}

interface NewsListProps {
  newsLinks: NewsLink[];
}

const NewsItem = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-bottom: 10px;
`;

const NewsLink = styled.a`
  text-decoration: none;
  color: ${PrimaryColor};
  font-size: 12px;
`;

const ScrollableList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;
`;

const Title = styled.div`
  margin-bottom: 10px;
`;

const NewsList: React.FC<NewsListProps> = ({ newsLinks }) => {
  return (
    <NewsListContainer>
      <Title>In The News</Title>
      <ScrollableList>
        {newsLinks.map((news, index) => (
          <NewsItem key={`${news.link}-${index}`}>
            <NewsLink
              href={news.link}
              title={news.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {news.title}
            </NewsLink>
          </NewsItem>
        ))}
      </ScrollableList>
    </NewsListContainer>
  );
};

export default NewsList;