import nodeFetch from "node-fetch";

const JSON_CONTENT_TYPE = 'application/json';

function getJsonHeaders() {
    return {
      Accept: JSON_CONTENT_TYPE,
      'Content-Type': JSON_CONTENT_TYPE,
    };
}

export async function fetchGet(url: string, extraHeaders: {} = {}) {
  let headers = getJsonHeaders();
  if (extraHeaders) {
    headers = { ...headers, ...extraHeaders };
  }
  const request = {
    method: 'GET',
    headers
  };
  try {
    const result = await nodeFetch(url, request);
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchPost(url: string, data: {}, extraHeaders: {} = {}) {
  let headers = getJsonHeaders();
  if (extraHeaders) {
    headers = { ...headers, ...extraHeaders };
  }
  const request = {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  };

  try {
    const result = await nodeFetch(url, request);
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
}