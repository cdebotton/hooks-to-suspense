const { REACT_APP_API_TOKEN } = process.env;

type Status = 'pending' | 'success' | 'failure';

export function createSuspender<T>(promise: Promise<T>) {
  let result: T | Error;
  let status: Status = 'pending';

  const suspender = promise.then(
    data => {
      status = 'success';
      result = data;
    },
    error => {
      status = 'failure';
      result = error;
    },
  );

  return {
    read(): T {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'failure':
          throw result;
        case 'success':
          if (!(result instanceof Error)) {
            return result;
          }
          break;
      }

      throw new Error('Invalid state');
    },
  };
}

export async function request<T>(endpoint: string): Promise<T> {
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

  return json;
}
