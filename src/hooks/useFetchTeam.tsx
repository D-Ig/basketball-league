import { useEffect, useReducer } from 'react';
import { Team } from '../interfaces';
import { getTeam } from '../dummy/api';

type TeamState = {
  error: null | Error;
  loading: boolean;
  team: null | Team;
};

type Action =
  | { type: 'request' }
  | { type: 'success'; payload: Team }
  | { type: 'failure'; payload: Error };

const initialState = {
  error: null,
  loading: true,
  team: null,
};

const reducer = (state: TeamState, action: Action): TeamState => {
  switch (action.type) {
    case 'request':
      return { ...state, loading: true };
    case 'success':
      return { team: action.payload, loading: false, error: null };
    case 'failure':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error('unknown action');
  }
};

const useFetchTeam = (teamId: string | undefined): TeamState => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const get = async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'request' });
      const team = await getTeam(id);
      dispatch({ type: 'success', payload: team });
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

export default useFetchTeam;
