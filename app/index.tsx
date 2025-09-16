// import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
// import React, { useEffect } from "react"
// import { useRouter } from "expo-router"
// import { useAuth } from "@/context/AuthContext"
//
// const Index = () => {
//   const router = useRouter()
//   const { user, loading } = useAuth()
//   console.log("User data : ", user)
//
//   useEffect(() => {
//     if (!loading) {
//       if (user) router.replace("/home")
//       else router.replace("/login")
//     }
//   }, [user, loading])
//
//   if (loading) {
//     return (
//       <View className="flex-1 w-full justify-center align-items-center">
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }
//
//   return null
// }
//
// export default Index
// src/app/index.tsx
import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(dashboard)/home");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  return null;
};

export default Index;
// import { View, Text, ImageBackground, TouchableOpacity } from "react-native"
// import React from "react"
// import { useRouter } from "expo-router"
// import { LinearGradient } from "expo-linear-gradient"

// const WelcomeScreen = () => {
//   const router = useRouter()
//   return (
//     <ImageBackground
//       source={{ uri: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" }}
//       className="flex-1"
//       resizeMode="cover"
//     >
//       <LinearGradient
//         colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
//         className="flex-1 justify-end px-6 pb-20"
//       >
//         <View className="mb-8">
//           <Text className="text-5xl font-bold text-white mb-2">
//             Explore
//           </Text>
//           <Text className="text-5xl font-bold text-white mb-4">
//             Sri Lanka
//           </Text>
//           <Text className="text-lg text-gray-200 leading-6">
//             Discover the pearl of the Indian Ocean with beautiful beaches, ancient temples, and lush mountains
//           </Text>
//         </View>

//         <TouchableOpacity
//           className="bg-gradient-to-r from-green-600 to-blue-600 py-4 px-8 rounded-xl shadow-lg"
//           onPress={() => router.push("/(dashboard)/home")}
//         >
//           <Text className="text-white text-xl font-semibold text-center">
//             Start Your Journey
//           </Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </ImageBackground>
//   )
// }

// export default WelcomeScreen