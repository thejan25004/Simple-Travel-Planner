
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Pressable,
//   Alert,
//   ActivityIndicator
// } from "react-native"
// import React, { useState } from "react"
// import { useRouter } from "expo-router"
// import { login } from "@/services/authService"

// const Login = () => {
//   const router = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleLogin = async () => {
//     if (isLoading) return
//     setIsLoading(true)
//     await login(email, password)
//       .then((res) => {
//         console.log("Login success:", res)
//         router.replace("/(dashboard)") // 🚀 Dashboard/Home కి යනවා
//       })
//       .catch((err) => {
//         console.error(err)
//         Alert.alert("Login failed", "Something went wrong")
//       })
//       .finally(() => {
//         setIsLoading(false)
//       })
//   }

//   return (
//     <View className="flex-1 bg-gray-100 justify-center p-4">
//       <Text className="text-2xl font-bold mb-6 text-blue-600 text-center">
//         Login to Task Manager
//       </Text>

//       <TextInput
//         placeholder="Email"
//         className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 text-gray-900"
//         placeholderTextColor="#9CA3AF"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         placeholder="Password"
//         className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 text-gray-900"
//         placeholderTextColor="#9CA3AF"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity
//         className="bg-blue-500 p-4 rounded mt-2"
//         onPress={handleLogin}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" size="large" />
//         ) : (
//           <Text className="text-center text-2xl text-white">Login</Text>
//         )}
//       </TouchableOpacity>

//       <Pressable onPress={() => router.push("/register")}>
//         <Text className="text-center text-blue-500 text-xl mt-4">
//           Dont have an account? Register
//         </Text>
//       </Pressable>
//     </View>
//   )
// }

// export default Login
// src/app/(auth)/login.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please enter email and password");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      await login(email, password);
      router.replace("/(dashboard)/home"); // Redirect to dashboard
    } catch (err: any) {
      console.error(err);
      Alert.alert("Login Failed", err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center p-4">
      <Text className="text-2xl font-bold mb-6 text-blue-600 text-center">
        Login to Task Manager
      </Text>
      <TextInput
        placeholder="Email"
        className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 text-gray-900"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 text-gray-900"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded mt-2"
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-2xl text-white">Login</Text>
        )}
      </TouchableOpacity>
      <Pressable onPress={() => router.push("/register")}>
        <Text className="text-center text-blue-500 text-xl mt-4">
          Dont have an account? Register
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;