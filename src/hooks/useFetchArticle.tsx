import { useEffect, useReducer } from 'react';
import { Article } from '../interfaces';
import { getArticle } from '../dummy/api';

type ArticleState = {
  error: null | Error;
  loading: boolean;
  article: null | Article;
};

type Action =
  | { type: 'request' }
  | { type: 'success'; payload: Article }
  | { type: 'failure'; payload: Error };

const initialState = {
  error: null,
  loading: true,
  article: null,
};

const reducer = (state: ArticleState, action: Action): ArticleState => {
  switch (action.type) {
    case 'request':
      return { ...state, loading: true };
    case 'success':
      return { article: action.payload, loading: false, error: null };
    case 'failure':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error('unknown action');
  }
};

const useFetchArticle = (
  teamId: string | undefined,
  articleId: string | undefined,
): ArticleState => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const get = async (teamId: string, articleId: string): Promise<void> => {
    try {
      dispatch({ type: 'request' });
      const article = await getArticle(teamId, articleId);
      dispatch({ type: 'success', payload: article });
    } catch (err) {
      dispatch({ type: 'failure', payload: err });
    }
  };

  useEffect(() => {
    if (teamId && articleId) {
      get(teamId, articleId);
    }
  }, [teamId, articleId]);

  return state;
};

export default useFetchArticle;
