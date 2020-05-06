import { useEffect, useReducer } from 'react';
import { getTeamsArticles } from '../dummy/api';
import type { TeamArticle } from '../interfaces';

type ArticlesState = {
  error: null | Error;
  loading: boolean;
  articles: TeamArticle[];
};

type Action =
  | { type: 'request' }
  | { type: 'success'; payload: TeamArticle[] }
  | { type: 'failure'; payload: Error };

const initialState = {
  error: null,
  loading: true,
  articles: [],
};

const reducer = (state: ArticlesState, action: Action): ArticlesState => {
  switch (action.type) {
    case 'request':
      return { ...state, loading: true };
    case 'success':
      return { articles: action.payload, loading: false, error: null };
    case 'failure':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error('unknown action');
  }
};

const useFetchTeamArticles = (teamId: string | undefined): ArticlesState => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const get = async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'request' });
      const articles = await getTeamsArticles(id);
      dispatch({ type: 'success', payload: articles });
    } catch (err) {
      dispatch({ type: 'failure', payload: err });
    }
  };

  useEffect(() => {
    if (teamId) {
      get(teamId);
    }
  }, [teamId]);

  return state;
};

export default useFetchTeamArticles;
