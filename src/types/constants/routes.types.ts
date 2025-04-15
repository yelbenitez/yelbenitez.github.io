export interface RouteDefinition {
  path: string;
  name: string;
}

export interface Routes {
  home: RouteDefinition;
  activity: RouteDefinition;
  score: RouteDefinition;
}
