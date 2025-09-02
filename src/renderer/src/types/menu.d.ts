export interface Meta {
    title: string;
    icon: string;
    noCache: boolean;
    link: string | null;
  }

export interface Child {
    id: string;
    name: string;
    path: string;
    hidden: boolean;
    component: string;
    meta: Meta;
  }

export interface Parent {
    id: string;
    name: string;
    hidden: boolean;
    redirect: string;
    component: string;
    alwaysShow: boolean;
    query: string;
    path: string;
    meta: Meta;
    children: Child[];
  }

export type partialParent = Partial<Parent>;
export type MenuData = Parent[];
