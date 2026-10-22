export const fetchApi = async (endpoint) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro na requisição');
  return response.json();
};

export const create = async (endpoint, data) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Erro ao criar');
  return response.json();
};