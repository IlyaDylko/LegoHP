import {RouteProp} from '@react-navigation/native';

export type NavigationRoutes = {
  Main: undefined;
};

export type RootRouteProps<RouteName extends keyof NavigationRoutes> =
  RouteProp<NavigationRoutes, RouteName>;
