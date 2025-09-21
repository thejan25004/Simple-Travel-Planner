//
// import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
// import React, { useState } from "react";
// import { useRouter } from "expo-router";
// import { logout, changePassword } from "@/services/authService";
//
// const ProfileScreen = () => {
//   const router = useRouter();
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//
//   const handleLogout = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
//     try {
//       await logout();
//       router.replace("/login");
//     } catch (err: any) {
//       console.error(err);
//       Alert.alert("Logout Failed", err.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const handleChangePassword = async () => {
//     if (!currentPassword.trim() || !newPassword.trim()) {
//       Alert.alert("Error", "Please enter both current and new password");
//       return;
//     }
//     if (isLoading) return;
//     setIsLoading(true);
//     try {
//       await changePassword(currentPassword, newPassword);
//       Alert.alert("Success", "Password updated successfully");
//       setCurrentPassword("");
//       setNewPassword("");
//     } catch (err: any) {
//       console.error(err);
//       Alert.alert("Failed", err.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return (
//     <View className="flex-1 justify-center items-center bg-gray-50 px-4">
//       <Text className="text-4xl font-bold text-gray-900">Profile</Text>
//       <Text className="text-gray-600 mt-2 mb-6">Manage your travel profile</Text>
//
//       {/* Current password */}
//       <TextInput
//         placeholder="Enter current password"
//         className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 w-full text-gray-900"
//         secureTextEntry
//         value={currentPassword}
//         onChangeText={setCurrentPassword}
//       />
//
//       {/* New password */}
//       <TextInput
//         placeholder="Enter new password"
//         className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 w-full text-gray-900"
//         secureTextEntry
//         value={newPassword}
//         onChangeText={setNewPassword}
//       />
//
//       {/* Change Password Button */}
//       <TouchableOpacity
//         className="bg-green-600 p-4 rounded mb-4 w-full"
//         onPress={handleChangePassword}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" size="large" />
//         ) : (
//           <Text className="text-center text-xl text-white">Change Password</Text>
//         )}
//       </TouchableOpacity>
//
//       {/* Logout Button */}
//       <TouchableOpacity
//         className="bg-red-500 p-4 rounded w-full"
//         onPress={handleLogout}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" size="large" />
//         ) : (
//           <Text className="text-center text-xl text-white">Logout</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };
//
// export default ProfileScreen;
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { logout, changePassword } from "@/services/authService";

const ProfileScreen = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await logout();
      router.replace("/login");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Logout Failed", err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword.trim() || !newPassword.trim()) {
      Alert.alert("Error", "Please enter both current and new password");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      Alert.alert("Success", "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Failed", err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-blue-50 pt-12">
      {/* Header */}
      <View className="items-center mb-8 px-4">
        <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
          <Text className="text-3xl text-white font-bold">👤</Text>
        </View>
        <Text className="text-4xl font-bold text-gray-900">Profile</Text>
        <Text className="text-gray-600 mt-2">Manage your travel profile</Text>
      </View>

      {/* Main Content Card */}
      <View className="flex-1 bg-white mx-4 rounded-t-3xl px-6 pt-8">

        {/* Password Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">🔐 Security Settings</Text>

          {/* Current password */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Current Password</Text>
            <TextInput
              placeholder="Enter current password"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 w-full text-gray-900"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>

          {/* New password */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">New Password</Text>
            <TextInput
              placeholder="Enter new password"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 w-full text-gray-900"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            className="bg-green-600 p-4 rounded-xl mb-6 w-full"
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">🔄 Change Password</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Account Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">⚙️ Account Actions</Text>

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-red-500 p-4 rounded-xl w-full"
            onPress={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">🚪 Logout</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="items-center mt-8">
          <Text className="text-gray-500">✈️ Happy travels!</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;