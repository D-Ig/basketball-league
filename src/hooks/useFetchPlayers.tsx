import { useEffect, useReducer } from 'react';
import { parse } from 'query-string';
import { Player } from '../interfaces';
import { getPlayers } from '../dummy/api';

type PlayersState = {
  error: null | Error;
  loading: boolean;
  players: Player[];
};

type Action =
  | { type: 'request' }
  | { type: 'success'; payload: Player[] }
  | { type: 'failure'; payload: Error };

const initialState = {
  error: null,
  loading: true,
  players: [],
};

const reducer = (state: PlayersState, action: Action): PlayersState => {
  switch (action.type) {
    case 'request':
      return { ...state, loading: true };
    case 'success':
      return { players: action.payload, loading: false, error: null };
    case 'failure':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error('unknown action');
  }
};

const useFetchPlayers = (querystring: string): PlayersState => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { teamId } = parse(querystring); // oh-eh...

  const get = async (teamId?: string): Promise<void> => {
    try {
      dispatch({ type: 'request' });
      const players = await getPlayers(teamId);
      dispatch({ type: 'success', payload: players });
    } catch (err) {
      dispatch({ type: 'failure', payload: err });
    }
  };

  useEffect(() => {
    typeof teamId === 'string' ? get(teamId) : get();
  }, [teamId]);

  return state;
};

export default useFetchPlayers;
