import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "@/api/axios.config";
import { v4 as uuidv4 } from "uuid";
import { AppState, Organization, ClickHouseCredential } from "@/types/types";

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // User State
        user: null,
        userIsLoading: false,
        userError: null,
        allUsers: null,

        getCurrentUser: async () => {
          set({ userIsLoading: true, userError: null });
          try {
            const response = await api.get("/users/me");
            set({ user: response.data, userIsLoading: false });
          } catch (error: any) {
            set({ user: null, userIsLoading: false, userError: error.message });
            throw error;
          }
        },

        admin: () => get().user?.role === "admin",

        updateUser: async (userData: Partial<AppState>) => {
          set({ userIsLoading: true, userError: null });
          try {
            const response = await api.put(`/users/me`, userData);
            set({ user: response.data, userIsLoading: false });
          } catch (error) {
            set({ userError: "Failed to update user", userIsLoading: false });
            throw error;
          }
        },

        getAllUsers: async () => {
          set({ userIsLoading: true, userError: null });
          try {
            const response = await api.get("/users");
            set({ allUsers: response.data, userIsLoading: false });
          } catch (error) {
            set({ userError: "Failed to get users", userIsLoading: false });
            throw error;
          }
        },

        setCurrentOrganization: async (organizationId) => {
          set({ userIsLoading: true, userError: null });
          try {
            const response = await api.post("/users/me/organization", {
              organizationId,
            });
            set((state) => {
              const user = state.user;
              if (user) {
                return {
                  ...state,
                  user: {
                    ...user,
                    activeOrganization: response.data.organization,
                  },
                  userIsLoading: false,
                };
              } else {
                return {
                  ...state,
                  userIsLoading: false,
                  userError: "User not logged in",
                };
              }
            });
          } catch (error) {
            set({
              userError: "Failed to set organization",
              userIsLoading: false,
            });
            throw error;
          }
        },

        setCurrentCredential: async (credentialId) => {
          set({ userIsLoading: true, userError: null });
          try {
            const response = await api.post("/users/me/credential", {
              credentialId,
            });
            set((state) => {
              const user = state.user;
              if (user) {
                return {
                  ...state,
                  user: {
                    ...user,
                    activeClickhouseCredential:
                      response.data.credential,
                  },
                  userIsLoading: false,
                };
              } else {
                return {
                  ...state,
                  userIsLoading: false,
                  userError: "User not logged in",
                };
              }
            });
          } catch (error) {
            set({
              userError: "Failed to set current credential",
              userIsLoading: false,
            });
            throw error;
          }
        },

        // Auth State
        authIsLoading: false,
        authError: null,

        login: async (email, password) => {
          set({ authIsLoading: true, authError: null });
          try {
            const response = await api.post("/auth/login", { email, password });
            set({ user: response.data, authIsLoading: false });
          } catch (error) {
            set({ authError: "Login failed", authIsLoading: false });
            throw error;
          }
        },
        logout: async () => {
          set({ authIsLoading: true, authError: null });
          try {
            await api.post("/auth/logout");
            set({ user: null, authIsLoading: false });
          } catch (error) {
            set({ authError: "Logout failed", authIsLoading: false });
            throw error;
          }
        },
        register: async (name, email, password) => {
          set({ authIsLoading: true, authError: null });
          try {
            await api.post("/auth/register", { name, email, password });
            set({ authIsLoading: false });
          } catch (error) {
            set({ authError: "Registration failed", authIsLoading: false });
            throw error;
          }
        },

        checkAuth: async () => {
          try {
            await get().getCurrentUser();
            return true;
          } catch (error) {
            return false;
          }
        },

        // Organization State
        organizations: [],
        orgIsLoading: false,
        orgError: null,
        fetchOrganizations: async () => {
          set({ orgIsLoading: true, orgError: null });
          try {
            const response = await api.get<Organization[]>("/organizations");
            set({ organizations: response.data, orgIsLoading: false });
          } catch (error) {
            set({
              orgError: "Failed to fetch organizations",
              orgIsLoading: false,
            });
            throw error;
          }
        },
        createOrganization: async (name) => {
          set({ orgIsLoading: true, orgError: null });
          try {
            await api.post("/organizations", { name });
            await get().fetchOrganizations();
          } catch (error) {
            set({
              orgError: "Failed to add organization",
              orgIsLoading: false,
            });
            throw error;
          }
        },
        updateOrganization: async (id, name) => {
          set({ orgIsLoading: true, orgError: null });
          try {
            await api.put("/organizations", { name, organizationId: id });
            await get().fetchOrganizations();
          } catch (error) {
            set({
              orgError: "Failed to update organization",
              orgIsLoading: false,
            });
            throw error;
          }
        },
        deleteOrganization: async (id) => {
          set({ orgIsLoading: true, orgError: null });
          try {
            await api.delete("/organizations", {
              data: { organizationId: id },
            });
            await get().fetchOrganizations();
          } catch (error) {
            set({
              orgError: "Failed to delete organization",
              orgIsLoading: false,
            });
            throw error;
          }
        },
        addUserToOrganization: async (organizationId, userId: string) => {
          set({ orgIsLoading: true, orgError: null });
          try {
            await api.post(`/organizations/${organizationId}/members`, {
              userId,
            });
            await get().fetchOrganizations();
          } catch (error) {
            set({
              orgError: "Failed to add user to organization",
              orgIsLoading: false,
            });
            throw error;
          }
        },
        removeUserFromOrganization: async (organizationId, userId) => {
          set({ orgIsLoading: true, orgError: null });
          try {
            await api.delete(
              `/organizations/${organizationId}/members/${userId}`
            );
            await get().fetchOrganizations();
          } catch (error) {
            set({
              orgError: "Failed to remove user from organization",
              orgIsLoading: false,
            });
            throw error;
          }
        },

        // ClickHouse Credential State
        credentials: [],
        availableCredentials: [],
        credIsLoading: false,
        credError: null,
        fetchCredentials: async () => {
          set({ credIsLoading: true, credError: null });
          try {
            const response = await api.get<ClickHouseCredential[]>(
              "/clickhouse-credentials"
            );
            set({ credentials: response.data, credIsLoading: false });
          } catch (error) {
            set({
              credError: "Failed to fetch credentials",
              credIsLoading: false,
            });
            throw error;
          }
        },
        fetchAvailableCredentials: async (organizationId) => {
          set({ credIsLoading: true, credError: null });
          try {
            const response = await api.get<ClickHouseCredential[]>(
              `/clickhouse-credentials/available?organizationId=${organizationId}`
            );
            set({ availableCredentials: response.data, credIsLoading: false });
          } catch (error) {
            set({
              credError: "Failed to fetch available credentials",
              credIsLoading: false,
            });
            throw error;
          }
        },
        createCredential: async (credentialData) => {
          set({ credIsLoading: true, credError: null });
          try {
            await api.post("/clickhouse-credentials", credentialData);
            await get().fetchCredentials();
          } catch (error) {
            set({
              credError: "Failed to create credential",
              credIsLoading: false,
            });
            throw error;
          }
        },
        updateCredential: async (id, credentialData) => {
          set({ credIsLoading: true, credError: null });
          try {
            await api.put(`/clickhouse-credentials/${id}`, credentialData);
            await get().fetchCredentials();
          } catch (error) {
            set({
              credError: "Failed to update credential",
              credIsLoading: false,
            });
            throw error;
          }
        },
        deleteCredential: async (id) => {
          set({ credIsLoading: true, credError: null });
          try {
            await api.delete(`/clickhouse-credentials/${id}`);
            await get().fetchCredentials();
          } catch (error) {
            set({
              credError: "Failed to delete credential",
              credIsLoading: false,
            });
            throw error;
          }
        },
        assignCredentialToOrganization: async (
          credentialId,
          organizationId
        ) => {
          set({ credIsLoading: true, credError: null });
          try {
            await api.post(
              `/clickhouse-credentials/${credentialId}/organizations`,
              { organizationId }
            );
            await get().fetchCredentials();
          } catch (error) {
            set({
              credError: "Failed to assign credential to organization",
              credIsLoading: false,
            });
            throw error;
          }
        },
        revokeCredentialFromOrganization: async (
          credentialId,
          organizationId
        ) => {
          set({ credIsLoading: true, credError: null });
          try {
            await api.delete(
              `/clickhouse-credentials/${credentialId}/organizations/${organizationId}`
            );
            await get().fetchCredentials();
          } catch (error) {
            set({
              credError: "Failed to revoke credential from organization",
              credIsLoading: false,
            });
            throw error;
          }
        },
        assignUserToCredential: async (credentialId, userId) => {
          set({ credIsLoading: true, credError: null });
          try {
            await api.post(`/clickhouse-credentials/${credentialId}/users`, {
              userId,
            });
            await get().fetchCredentials();
          } catch (error) {
            set({
              credError: "Failed to assign user to credential",
              credIsLoading: false,
            });
            throw error;
          }
        },
        revokeUserFromCredential: async (credentialId, userId) => {
          set({ credIsLoading: true, credError: null });
          try {
            await api.delete(
              `/clickhouse-credentials/${credentialId}/users/${userId}`
            );
            await get().fetchCredentials();
          } catch (error) {
            set({
              credError: "Failed to revoke user from credential",
              credIsLoading: false,
            });
            throw error;
          }
        },

        resetCredentials: () => {
          set({
            availableCredentials: [],
            credError: null,
          });
        },

        // Tab State
        tabs: [
          {
            id: "home",
            title: "Home",
            content: "",
            type: "home",
            databaseData: [],
          },
        ],
        activeTabId: "home",
        tabIsLoading: false,
        tabError: null,
        isLoadingDatabase: false,
        databaseData: [],
        isSavedQuery: false,
        isDirty: false,
        isCreateTableModalOpen: false,
        isCreateDatabaseModalOpen: false,
        selectedDatabaseForCreateTable: "",
        addTab: (tab) => {
          const newTab = { ...tab, id: uuidv4() };
          set((state) => ({
            tabs: [...state.tabs, newTab],
            activeTabId: newTab.id,
          }));
        },
        closeTab: (id) => {
          set((state) => {
            const newTabs = state.tabs.filter((tab) => tab.id !== id);
            const newActiveTabId =
              id === state.activeTabId
                ? newTabs[newTabs.length - 1]?.id || "home"
                : state.activeTabId;
            return { tabs: newTabs, activeTabId: newActiveTabId };
          });
        },
        setActiveTab: (id) => set({ activeTabId: id }),
        updateTabContent: (id, updatedValues) => {
          set((state) => ({
            tabs: state.tabs.map((tab) =>
              tab.id === id ? { ...tab, ...updatedValues } : tab
            ),
          }));
        },
        updateTabTitle: (id, title) => {
          set((state) => ({
            tabs: state.tabs.map((tab) =>
              tab.id === id ? { ...tab, title } : tab
            ),
          }));
        },
        moveTab: (fromIndex, toIndex) => {
          set((state) => {
            const newTabs = [...state.tabs];
            const [movedTab] = newTabs.splice(fromIndex, 1);
            newTabs.splice(toIndex, 0, movedTab);
            return { tabs: newTabs };
          });
        },

        getTabById: (id) => get().tabs.find((tab) => tab.id === id),

        runQuery: async (query: string, tabId?: string): Promise<void> => {
          if (tabId) {
            set((state) => ({
              tabs: state.tabs.map((tab) =>
                tab.id === tabId
                  ? { ...tab, isLoading: true, error: null }
                  : tab
              ),
            }));
          }
          try {
            const response = await api.post("/query", { query });
            if (tabId) {
              set((state) => ({
                tabs: state.tabs.map((tab) =>
                  tab.id === tabId
                    ? { ...tab, results: response.data, isLoading: false }
                    : tab
                ),
              }));
            }
            // handle success without returning
          } catch (error: any) {
            const errorMessage =
              error.response?.data?.message || "An error occurred";
            if (tabId) {
              set((state) => ({
                tabs: state.tabs.map((tab) =>
                  tab.id === tabId
                    ? {
                        ...tab,
                        error: errorMessage,
                        isLoading: false,
                      }
                    : tab
                ),
              }));
            }
          }
        },

        fetchDatabaseData: async () => {
          set({ isLoadingDatabase: true, tabError: null });
          try {
            const response = await api.get("/ch-queries/databases");
            set({ databaseData: response.data, isLoadingDatabase: false });
          } catch (error) {
            set({
              tabError: "Failed to fetch database data",
              isLoadingDatabase: false,
            });
          }
        },
        closeCreateTableModal: () =>
          set({
            isCreateTableModalOpen: false,
            selectedDatabaseForCreateTable: "",
          }),
        openCreateTableModal: (database) =>
          set({
            isCreateTableModalOpen: true,
            selectedDatabaseForCreateTable: database,
          }),
        closeCreateDatabaseModal: () =>
          set({ isCreateDatabaseModalOpen: false }),
        openCreateDatabaseModal: () => set({ isCreateDatabaseModalOpen: true }),
        resetTabs: () =>
          set({
            tabs: [
              {
                id: "home",
                title: "Home",
                content: "",
                type: "home",
                databaseData: [],
              },
            ],
            activeTabId: "home",
            tabIsLoading: false,
            tabError: null,
            isLoadingDatabase: false,
            databaseData: [],
            isSavedQuery: false,
            isDirty: false,
            isCreateTableModalOpen: false,
            selectedDatabaseForCreateTable: "",
          }),

        // Connection State
        isConnected: false,
        instanceVersion: "",
        lastChecked: null,
        checkConnection: async () => {
          set({ isConnected: false, instanceVersion: "", lastChecked: null });
          try {
            const response = await api.get("/ch-queries/health");
            set({
              isConnected: true,
              instanceVersion: response.data.version,
              lastChecked: new Date(),
            });
          } catch (error) {
            set({
              isConnected: false,
              instanceVersion: "",
              lastChecked: new Date(),
            });
          }
        },
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          user: state.user,
          tabs: state.tabs,
          activeTabId: state.activeTabId,
        }),
      }
    )
  )
);

export default useAppStore;
