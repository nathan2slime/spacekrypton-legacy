export type UserType = {
  id?: string;
  email?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  satellites?: number[];
  thumb?: string;
  roles?: string[];
  username?: string;
};

export type MenuItem = {
  name: string;
  route: string;
  icon: string;
};
