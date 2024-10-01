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
  activeOrganization?: Organization;
  activeClickhouseCredential?: ClickHouseCredential;
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
  results?: any[];
  error?: string | null;
  isLoading?: boolean;
  isSaved?: boolean;
  isDirty?: boolean;
  databaseData: any[];
}

// Chat Types
export interface Chat {
  _id: string;
  participants: User[];
  messages: Message[];
  lastMessage: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  sender: User;
  content: string;
  timestamp: string;
}

// Merged AppState Interface
export interface AppState {
  // Auth State
  user: User | null;
  allUsers: User[];
  authIsLoading: boolean;
  authError: string | null;

  // Organization State
  organizations: Organization[];
  selectedOrganization: Organization | null;
  orgIsLoading: boolean;
  orgError: string | null;

  // ClickHouse Credential State
  credentials: ClickHouseCredential[];
  selectedCredential: ClickHouseCredential | null;
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
  getCurrentUser: () => Promise<void>;
  setCurrentOrganization: (organizationId: string) => Promise<void>;
  setCurrentCredential: (credentialId: string) => Promise<void>;
  checkAuth: () => Promise<boolean>;
  admin: () => boolean;
  updateUser: (userId: string, userData: Partial<User>) => Promise<void>;
  getAllUsers: () => Promise<void>;

  // Organization Actions
  fetchOrganizations: () => Promise<void>;
  addOrganization: (name: string) => Promise<void>;
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
  fetchQueries: () => Promise<void>;
  runQuery: (tabId: string, query: string) => Promise<void>;
  fetchDatabaseData: () => Promise<void>;
  closeCreateTableModal: () => void;
  openCreateTableModal: (database: string) => void;
  closeCreateDatabaseModal: () => void;
  openCreateDatabaseModal: () => void;
  resetTabs: () => void;

  // Connection Actions
  checkConnection: () => Promise<void>;
}
