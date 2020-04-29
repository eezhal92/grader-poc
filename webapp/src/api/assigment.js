import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

const takeData = response => response.data;

/**
 * @param {object} query
 * @param {string} query.username
 * @param {string} query.runtime
 * @param {string} query.testId
 */
export function getTemplate (query) {
  return instance.get('/test', {
    params: query,
  })
    .then(takeData);
}

/**
 * @param {object} payload
 * @param {string} payload.username
 * @param {string} payload.runtime
 * @param {string} payload.testId
 * @param {string} payload.solution
 */
export function submit (payload) {
  return instance.post('/submit', payload)
    .then(takeData);
}