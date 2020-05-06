import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import useFetchArticle from '../hooks/useFetchArticle';
import type { FC } from 'react';

const ArticleCard: FC = () => {
  const { teamId, articleId } = useParams();
  const { loading, article } = useFetchArticle(teamId, articleId);

  if (!article) {
    return null;
  }

  const { body, title } = article;

  return (
    <div className='panel'>
      {loading ? (
        <Loading />
      ) : (
        <article className='article'>
          <h1 className='header'>{title}</h1>
          <p>{body}</p>
        </article>
      )}
    </div>
  );
};

export default ArticleCard;
