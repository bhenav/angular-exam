export interface DashboardNav {
  id: number;
  title: string;
  children?: DashboardNav[];
  path?: string;
  icon?: string;
}
