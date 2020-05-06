import React from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import slug from 'slug';
import { stringify } from 'query-string';
import Error from './Error';
import Loading from './Loading';
import TeamLogo from './TeamLogo';
import useFetchTeam from '../hooks/useFetchTeam';
import useFetchTeamArticles from '../hooks/useFetchTeamArticles';
import type { FC } from 'react';

const TeamPage: FC = () => {
  const { teamId } = useParams();
  const { url } = useRouteMatch();
  const { error, loading, team } = useFetchTeam(teamId);
  const {
    error: articlesError,
    loading: articlesLoading,
    articles,
  } = useFetchTeamArticles(teamId);

  if (!team) {
    return <Loading />;
  }

  const {
    championships,
    coach,
    established,
    id,
    losses,
    manager,
    name,
    wins,
  } = team;

  if (error || articlesError) {
    return <Error />;
  }

  return (
    <div className='panel'>
      {loading || articlesLoading ? (
        <Loading />
      ) : (
        <>
          <TeamLogo id={id} />
          <h1 className='medium-header'>{name}</h1>
          <h4 style={{ margin: 5 }}>
            <Link
              to={{ pathname: '/players', search: stringify({ teamId: id }) }}
            >
              View Roster
            </Link>
          </h4>
          <h4>Championships</h4>
          <ul className='championships'>
            {championships.map(year => (
              <li key={year}>{year}</li>
            ))}
          </ul>
          <ul className='info-list row' style={{ width: '100%' }}>
            <li>
              Established<div>{established}</div>
            </li>
            <li>
              Manager<div>{manager}</div>
            </li>
            <li>
              Coach<div>{coach}</div>
            </li>
            <li>
              Record
              <div>
                {wins}-{losses}
              </div>
            </li>
          </ul>
          <h2 className='header'>Articles</h2>
          <ul className='articles'>
            {articles.map(({ date, id, title }) => (
              <li key={id}>
                <Link to={`${url}/articles/${slug(title)}`}>
                  <h4 className='article-title'>{title}</h4>
                  <div className='article-date'>
                    {date.toLocaleDateString('en-GB')}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TeamPage;
