//
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Pressable,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import React, { useState } from "react";
// import { useRouter } from "expo-router";
// import { register } from "@/services/authService";
//
// const Register = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//
//   const handleRegister = async () => {
//     if (!email.trim() || !password.trim()) {
//       Alert.alert("Validation Error", "Please enter email and password");
//       return;
//     }
//     if (isLoading) return;
//     setIsLoading(true);
//     try {
//       await register(email, password);
//       router.replace("/(dashboard)/home"); // Redirect to dashboard after registration
//     } catch (err: any) {
//       console.error(err);
//       Alert.alert("Registration Failed", err.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
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
//         keyboardType="email-address"
//         autoCapitalize="none"
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
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" size="large" />
//         ) : (
//           <Text className="text-center text-2xl text-white">Register</Text>
//         )}
//       </TouchableOpacity>
//       <Pressable onPress={() => router.replace("/login")}>
//         <Text className="text-center text-blue-500 text-xl mt-4">
//           Already have an account? Login
//         </Text>
//       </Pressable>
//     </View>
//   );
// };
//
// export default Register;
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";
import { Ionicons } from '@expo/vector-icons';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header Section */}
          <View className="items-center mb-16">
            <View className="bg-blue-50 rounded-full p-6 mb-6 shadow-sm">
              <Ionicons name="person-add" size={48} color="#3B82F6" />
            </View>
            <Text className="text-4xl font-black text-gray-900 text-center mb-2">
              Join Travel Planner
            </Text>
            <Text className="text-lg text-gray-600 text-center font-medium">
              Start Your Adventure Today
            </Text>
          </View>

          {/* Register Form */}
          <View className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-8">
            <Text className="text-2xl font-bold text-gray-900 text-center mb-8">
              Create Account
            </Text>

            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-gray-700 text-sm font-semibold mb-3">
                Email Address
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Enter your email"
                  className={`bg-gray-50 border-2 rounded-2xl px-5 py-4 pr-12 text-gray-900 text-lg ${
                    emailFocused ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                <View className="absolute right-4 top-5">
                  <Ionicons
                    name="mail"
                    size={22}
                    color={emailFocused ? "#3B82F6" : "#9CA3AF"}
                  />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-8">
              <Text className="text-gray-700 text-sm font-semibold mb-3">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Create a password"
                  className={`bg-gray-50 border-2 rounded-2xl px-5 py-4 pr-16 text-gray-900 text-lg ${
                    passwordFocused ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity
                  className="absolute right-4 top-5"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color={passwordFocused ? "#3B82F6" : "#9CA3AF"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              className={`rounded-2xl py-5 px-6 shadow-lg ${
                isLoading ? 'bg-gray-400' : 'bg-green-500'
              }`}
              style={{ elevation: 4 }}
            >
              <View className="flex-row items-center justify-center">
                {isLoading ? (
                  <>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text className="text-white text-lg font-bold ml-3">
                      Creating Account...
                    </Text>
                  </>
                ) : (
                  <>
                    <Text className="text-white text-lg font-bold mr-2">
                      Create Account
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  </>
                )}
              </View>
            </TouchableOpacity>

            {/* Terms */}
            <Text className="text-gray-500 text-xs text-center mt-6 leading-5">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          {/* Login Section */}
          <View className="items-center">
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500 text-sm font-medium">OR</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <Pressable
              onPress={() => router.replace("/login")}
              className="bg-white border-2 border-blue-500 rounded-2xl py-4 px-8 shadow-sm"
              style={{ elevation: 2 }}
            >
              <View className="flex-row items-center">
                <Ionicons name="log-in" size={20} color="#3B82F6" />
                <Text className="text-blue-500 text-lg font-semibold ml-2">
                  Sign In Instead
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="mt-12 items-center">
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark" size={16} color="#10B981" />
              <Text className="text-gray-500 text-xs font-medium ml-2">
                Secure & Protected Registration
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Register;