import { useReducer, useEffect } from 'react';

const { REACT_APP_API_TOKEN } = process.env;

type State<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

type RequestAction = {
  type: 'REQUEST';
};

type SuccessAction<T> = {
  type: 'SUCCESS';
  payload: T;
};

type FailureAction = {
  type: 'FAILURE';
  payload: Error;
};

type Action<T> = RequestAction | SuccessAction<T> | FailureAction;

export function useQuery<T>(endpoint: string) {
  function reducer(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
      case 'REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case 'FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function request() {
      try {
        const response = await fetch(`https://api.vimeo.com${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${REACT_APP_API_TOKEN}`,
          },
        });

        const json = await response.json();

        if (json.data) {
          const items = json.data;
          json.items = items;
          delete json.data;
        }

        if (isMounted) {
          dispatch({ type: 'SUCCESS', payload: json });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'FAILURE', payload: error });
        }
      }
    }

    request();

    return () => {
      isMounted = false;
    };
  }, [endpoint, dispatch]);

  return state;
}
