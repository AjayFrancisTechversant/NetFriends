import axios from 'axios';

export const getUsers = async currentPage => {
  try {
    let response = await axios.get(
      `https://randomuser.me/api/?page=${currentPage}&results=5&seed=ac2bd`,
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
