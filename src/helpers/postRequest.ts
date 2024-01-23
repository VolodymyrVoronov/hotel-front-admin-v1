/**
 * Sends a POST request to the specified URL with the provided argument.
 *
 * @param {string} url - The URL to send the POST request to
 * @param {{ arg: T }} arg - The argument to be sent in the request body
 * @return {Promise<T>} The response data from the server
 */
export async function postRequest<T, U>(
  url: string,
  { arg }: { arg: T }
): Promise<U> {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ ...arg }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

/**
 * Sends a POST request to the specified URL with the provided argument.
 *
 * @param {string} url - The URL to send the POST request to
 * @param {{ arg: T }} arg - The argument to be sent in the request body
 * @return {Promise<T>} The response data from the server
 */
export async function postRequestWithHeaders<T, U>(
  {
    url,
    headers,
  }: {
    url: string;
    headers: Record<string, string>;
  },
  { arg }: { arg: T }
): Promise<U> {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ ...arg }),
    headers: {
      ...headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}
