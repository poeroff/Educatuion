import { RouteObject } from 'react-router-dom';
import { ILayoutDataTypes } from '../type/Layout/Layout';

export declare type IRouteObject = Omit<RouteObject, 'children'> & {
  params?: ILayoutDataTypes;
  children?: IRouteObject[];
};
