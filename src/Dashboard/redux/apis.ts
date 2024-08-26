import { mainAxios } from '../../common/apiWrapper';

export const searchRecipeAPI = async (payload: { query: string }) => {
  const { data } = await mainAxios.get(
    `/recipes/complexSearch?query=${payload.query}`
  );

  return data;
};

export const searchRecipeByIdAPI = async (payload: { id: number }) => {
  const { data } = await mainAxios.get(`/recipes/${payload.id}/information`);

  return data;
};
