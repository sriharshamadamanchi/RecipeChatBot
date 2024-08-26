import { action } from '../store/typeSafe';

export const showLoaderAction = (): any =>
  action('src/common/loaderRedux/showLoaderAction');
export const hideLoaderAction = (): any =>
  action('src/common/loaderRedux/hideLoaderAction');

export type startLoadingActionType = {
  name: string;
  msg?: string;
};
export const startLoadingAction = (payload: startLoadingActionType): any =>
  action('src/common/loaderRedux/startLoadingAction', payload);

export type successLoadingActionType = {
  name: string;
  msg: string;
};
export const successLoadingAction = (payload: successLoadingActionType): any =>
  action('src/common/loaderRedux/successLoadingAction', payload);

export type failedLoadingActionType = {
  name: string;
  msg: string;
  id?: string;
};

export const failedLoadingAction = (payload: failedLoadingActionType): any =>
  action('src/common/loaderRedux/failedLoadingAction', payload);

export type removeLoaderActionType = {
  name: string;
};

export const removeLoaderAction = (payload: removeLoaderActionType): any =>
  action('src/common/loaderRedux/removeLoaderAction', payload);

export const resetAllLoadersAction = (): any =>
  action('src/common/loaderRedux/resetAllLoadersAction');

export const resetReducersAction = (): any =>
  action('src/common/loaderRedux/resetReducersAction');
