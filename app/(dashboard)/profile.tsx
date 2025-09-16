// import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
// import React, { useState } from "react";
// import { useRouter } from "expo-router";
// import { logout, changePassword } from "@/services/authService";

// const ProfileScreen = () => {
//   const router = useRouter();
//   const [newPassword, setNewPassword] = useState("");

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.replace("/(auth)/login"); // ✅ go back to login
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Logout Failed", "Something went wrong");
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!newPassword) {
//       Alert.alert("Error", "Enter a new password");
//       return;
//     }
//     try {
//       await changePassword(newPassword);
//       Alert.alert("Success", "Password updated successfully");
//       setNewPassword("");
//     } catch (err: any) {
//       console.error(err);
//       Alert.alert("Failed", err.message || "Something went wrong");
//     }
//   };

//   return (
//     <View className="flex-1 justify-center items-center bg-gray-50 px-4">
//       <Text className="text-4xl font-bold text-gray-900">Profile</Text>
//       <Text className="text-gray-600 mt-2 mb-6">Manage your travel profile</Text>

//       {/* Change password */}
//       <TextInput
//         placeholder="Enter new password"
//         className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 w-full text-gray-900"
//         secureTextEntry
//         value={newPassword}
//         onChangeText={setNewPassword}
//       />
//       <TouchableOpacity
//         className="bg-green-600 p-4 rounded mb-4 w-full"
//         onPress={handleChangePassword}
//       >
//         <Text className="text-center text-xl text-white">Change Password</Text>
//       </TouchableOpacity>

//       {/* Logout */}
//       <TouchableOpacity
//         className="bg-red-500 p-4 rounded w-full"
//         onPress={handleLogout}
//       >
//         <Text className="text-center text-xl text-white">Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ProfileScreen;
// src/app/(dashboard)/profile.tsx
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { logout, changePassword } from "@/services/authService";

const ProfileScreen = () => {
  const router = useRouter();
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
    if (!newPassword.trim()) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      await changePassword(newPassword);
      Alert.alert("Success", "Password updated successfully");
      setNewPassword("");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Failed", err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-4">
      <Text className="text-4xl font-bold text-gray-900">Profile</Text>
      <Text className="text-gray-600 mt-2 mb-6">Manage your travel profile</Text>
      <TextInput
        placeholder="Enter new password"
        className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 w-full text-gray-900"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity
        className="bg-green-600 p-4 rounded mb-4 w-full"
        onPress={handleChangePassword}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-xl text-white">Change Password</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 p-4 rounded w-full"
        onPress={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-xl text-white">Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;