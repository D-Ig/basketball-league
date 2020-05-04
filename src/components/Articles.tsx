import React, { FC } from 'react';
import { useParams, Route, useRouteMatch } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import SideBar from './Sidebar';
import useFetchTeamArticles from '../hooks/useFetchTeamArticles';

const Articles: FC = () => {
  const { teamId } = useParams();
  const { path } = useRouteMatch();
  const { error, loading, articles } = useFetchTeamArticles(teamId);

  return (
    <div className='container two-column'>
      {error ? (
        <h1>Some error occured</h1>
      ) : (
        <>
          <SideBar
            title='Articles'
            list={articles.map(({ title }) => title)}
            isLoading={loading}
          />
          <Route path={`${path}/:articleId`}>
            <ArticleCard />
          </Route>
        </>
      )}
    </div>
  );
};

export default Articles;
