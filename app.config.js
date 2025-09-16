export default {
  expo: {
    name: "task-manager-app",
    slug: "task-manager-app",
    version: "1.0.0",
    ios: {
      bundleIdentifier: "com.anonymous.amdday01",
      supportsTablet: true
    },
    android: {
      package: "com.anonymous.taskmanagerapp"
    },
    extra: {
      mockApi: process.env.EXPO_BASE_API_URL,
      eas: {
        projectId: "b8ec02af-45d4-4263-b365-762d17fc6930"  // <-- add this
      }
    }
  }
};
