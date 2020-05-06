import React from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import Error from './Error';
import SideBar from './Sidebar';
import useFetchTeamArticles from '../hooks/useFetchTeamArticles';
import type { FC } from 'react';

const Articles: FC = () => {
  const { teamId } = useParams();
  const { path } = useRouteMatch();
  const { error, loading, articles } = useFetchTeamArticles(teamId);

  return (
    <div className='container two-column'>
      {error ? (
        <Error />
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
