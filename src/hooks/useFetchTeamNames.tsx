import { useEffect, useReducer } from 'react';
import { getTeamNames } from '../dummy/api';

type TeamNamesState = {
  error: null | Error;
  loading: boolean;
  teamNames: string[];
};

type Action =
  | { type: 'request' }
  | { type: 'success'; payload: string[] }
  | { type: 'failure'; payload: Error };

const initialState = {
  error: null,
  loading: true,
  teamNames: [],
};

const reducer = (state: TeamNamesState, action: Action): TeamNamesState => {
  switch (action.type) {
    case 'request':
      return { ...state, loading: true };
    case 'success':
      return { teamNames: action.payload, loading: false, error: null };
    case 'failure':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error('unknown action');
  }
};

const useFetchTeamNames = (): TeamNamesState => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const get = async (): Promise<void> => {
    try {
      dispatch({ type: 'request' });
      const teamNames = await getTeamNames();
      dispatch({ type: 'success', payload: teamNames });
    } catch (err) {
      dispatch({ type: 'failure', payload: err });
    }
  };

  useEffect(() => {
    get();
  }, []);

  return state;
};

export default useFetchTeamNames;
