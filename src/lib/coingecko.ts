// CoinGecko API configuration
export const COINGECKO_API_KEY = 'CG-i4wUVGZRocFPE8Di2KdRoDEQ';

export const fetchWithApiKey = async (url: string) => {
  const separator = url.includes('?') ? '&' : '?';
  const fullUrl = `${url}${separator}x_cg_demo_api_key=${COINGECKO_API_KEY}`;
  const response = await fetch(fullUrl);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};
