// types.ts

// User and Auth Types
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "viewer";
  active: boolean;
  createdAt: string;
  updatedAt: string;
  activeOrganization?: any;
  activeClickhouseCredential?: any;
}

// Organization Types
export interface Organization {
  _id: string;
  name: string;
  slug: string;
  members: User[];
  owner: User;
  createdAt: string;
  updatedAt: string;
}

// ClickHouse Credential Types
export interface ClickHouseCredential {
  _id: string;
  name: string;
  slug: string;
  host: string;
  port: number;
  username: string;
  password?: string;
  owner: string;
  users: string[];
  allowedOrganizations: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  __v?: number;
}

// Tab Types
export type TabType = "sql" | "result" | "home" | "information" | "saved_query";

export interface Tab {
  id: string;
  title: string;
  content: string | { query: string; database: string; table: string };
  type: TabType;
  error?: string | null;
  isLoading?: boolean;
  isSaved?: boolean;
  isDirty?: boolean;
}

// Merged AppState Interface
export interface AppState {
  // Auth State
  user: User | null;
  userIsLoading: boolean;
  userError: string | null;
  authIsLoading: boolean;
  authError: string | null;
  allUsers: User[] | null;

  // Organization State
  organizations: Organization[];
  orgIsLoading: boolean;
  orgError: string | null;

  // ClickHouse Credential State
  credentials: ClickHouseCredential[];
  availableCredentials: ClickHouseCredential[];

  credIsLoading: boolean;
  credError: string | null;

  // Tab State
  tabs: Tab[];
  activeTabId: string;
  tabIsLoading: boolean;
  tabError: string | null;
  isLoadingDatabase: boolean;
  databaseData: any[];
  isSavedQuery: boolean;
  isDirty: boolean;
  isCreateTableModalOpen: boolean;
  isCreateDatabaseModalOpen: boolean;
  selectedDatabaseForCreateTable: string;

  // Connection State
  isConnected: boolean;
  instanceVersion: string;
  lastChecked: Date | null;

  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<boolean>;

  // User Actions
  getCurrentUser: () => Promise<void>;
  setCurrentOrganization: (organizationId: string) => Promise<void>;
  setCurrentCredential: (credentialId: string) => Promise<void>;
  admin: () => boolean;
  updateUser: (userId: string, userData: Partial<User>) => Promise<void>;
  getAllUsers: () => Promise<void>;

  // Organization Actions
  fetchOrganizations: () => Promise<void>;
  createOrganization: (name: string) => Promise<void>;
  updateOrganization: (id: string, name: string) => Promise<void>;
  deleteOrganization: (id: string) => Promise<void>;
  addUserToOrganization: (
    organizationId: string,
    userId: string
  ) => Promise<void>;
  removeUserFromOrganization: (
    organizationId: string,
    userId: string
  ) => Promise<void>;

  // ClickHouse Credential Actions
  fetchCredentials: () => Promise<void>;
  fetchAvailableCredentials: (organizationId: string) => Promise<void>;
  createCredential: (
    credentialData: Partial<ClickHouseCredential>
  ) => Promise<void>;
  updateCredential: (
    id: string,
    credentialData: Partial<ClickHouseCredential>
  ) => Promise<void>;
  deleteCredential: (id: string) => Promise<void>;
  assignCredentialToOrganization: (
    credentialId: string,
    organizationId: string
  ) => Promise<void>;
  revokeCredentialFromOrganization: (
    credentialId: string,
    organizationId: string
  ) => Promise<void>;
  assignUserToCredential: (
    credentialId: string,
    userId: string
  ) => Promise<void>;
  revokeUserFromCredential: (
    credentialId: string,
    userId: string
  ) => Promise<void>;
  resetCredentials: () => void;

  // Tab Actions
  addTab: (tab: Omit<Tab, "id">) => void;
  closeTab: (id: string) => void;
  updateTabContent: (id: string, updatedValues: Partial<Tab>) => void;
  setActiveTab: (id: string) => void;
  updateTabTitle: (id: string, title: string) => void;
  moveTab: (fromIndex: number, toIndex: number) => void;
  getTabById: (id: string) => Tab | undefined;

  runQuery: (query: string, tabId?: string) => Promise<void>;
  fetchDatabaseData: () => Promise<void>;
  closeCreateTableModal: () => void;
  openCreateTableModal: (database: string) => void;
  closeCreateDatabaseModal: () => void;
  openCreateDatabaseModal: () => void;
  resetTabs: () => void;

  // Connection Actions
  checkConnection: () => Promise<void>;
}
