import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import useFetchArticle from '../hooks/useFetchArticle';

const ArticleCard: FC = () => {
  const { teamId, articleId } = useParams();
  const { error, loading, article } = useFetchArticle(teamId, articleId);

  if (!article) {
    return null;
  }

  const { body, title } = article;

  return (
    <div className='panel'>
      {error && <h1>Some error occured</h1>}
      {loading ? (
        <h1>Loading</h1>
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
