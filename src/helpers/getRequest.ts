/**
 * Sends a GET request to the specified URL and returns the response data.
 *
 * @param {Object} args - The arguments for the function.
 * @param {string} args.url - The URL to send the request to.
 * @param {HeadersInit} args.headers - The headers to include in the request.
 * @return {Promise<T>} - A promise that resolves to the response data.
 */
export async function getRequest<T>(args: {
  url: string;
  headers: HeadersInit;
}): Promise<T> {
  const response = await fetch(args.url, {
    method: "GET",
    headers: new Headers({
      ...args.headers,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}
