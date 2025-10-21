import axios from 'axios';

const API_URL = 'https://api.tvmaze.com/shows';

export const fetchAllShows = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};

export const fetchShowById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching show with id ${id}:`, error);
    throw error;
  }
};

export const searchShows = async (query) => {
  try {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
    return response.data.map(item => item.show);
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }
};