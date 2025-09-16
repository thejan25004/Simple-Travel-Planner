
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
// import { register } from "@/services/authService"

// const Register = () => {
//   const router = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleRegister = async () => {
//     if (isLoading) return
//     setIsLoading(true)
//     await register(email, password)
//       .then((res) => {
//         console.log("Register success:", res)
//         router.replace("/") // 🚀 Register → Login
//       })
//       .catch((err) => {
//         console.error(err)
//         Alert.alert("Registration failed", "Something went wrong")
//       })
//       .finally(() => {
//         setIsLoading(false)
//       })
//   }

//   return (
//     <View className="flex-1 bg-gray-100 justify-center p-4">
//       <Text className="text-2xl font-bold mb-6 text-blue-600 text-center">
//         Register
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
//         className="bg-green-600 p-4 rounded mt-2"
//         onPress={handleRegister}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" size="large" />
//         ) : (
//           <Text className="text-center text-2xl text-white">Register</Text>
//         )}
//       </TouchableOpacity>

//       <Pressable onPress={() => router.replace("/")}>
//         <Text className="text-center text-blue-500 text-xl mt-4">
//           Already have an account? Login
//         </Text>
//       </Pressable>
//     </View>
//   )
// }

// export default Register
// src/app/(auth)/register.tsx
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
import { register } from "@/services/authService";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please enter email and password");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      await register(email, password);
      router.replace("/(dashboard)/home"); // Redirect to dashboard after registration
    } catch (err: any) {
      console.error(err);
      Alert.alert("Registration Failed", err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center p-4">
      <Text className="text-2xl font-bold mb-6 text-blue-600 text-center">
        Register
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
        className="bg-green-600 p-4 rounded mt-2"
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-2xl text-white">Register</Text>
        )}
      </TouchableOpacity>
      <Pressable onPress={() => router.replace("/login")}>
        <Text className="text-center text-blue-500 text-xl mt-4">
          Already have an account? Login
        </Text>
      </Pressable>
    </View>
  );
};

export default Register;