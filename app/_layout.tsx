// import React from "react"
// import "./../global.css"
// import { Slot, Stack } from "expo-router"
// import { AuthProvider } from "@/context/AuthContext"
// import { LoaderProvider } from "@/context/LoaderContext"
//
// const RootLayout = () => {
//   return (
//     <LoaderProvider>
//       <AuthProvider>
//         <Slot />
//       </AuthProvider>
//     </LoaderProvider>
//   )
// }
//
// export default RootLayout


// src/app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { LoaderProvider } from "@/context/LoaderContext";
import { AuthProvider } from "@/context/AuthContext";
import "../global.css";

const RootLayout = () => {
  return (
    <LoaderProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(dashboard)" />
        </Stack>
      </AuthProvider>
    </LoaderProvider>
  );
};

export default RootLayout;

// import React from "react"
// import { Stack } from "expo-router"
// import { LoaderProvider } from "@/context/LoaderContext"
// import "../global.css"

// const RootLayout = () => {
//   return (
//     <LoaderProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         {/* First screen = Login */}
//         <Stack.Screen name="index" />

//         {/* Register screen */}
//         <Stack.Screen name="register" />

//         {/* Dashboard group */}
//         <Stack.Screen name="(dashboard)" />
//       </Stack>
//     </LoaderProvider>
//   )
// }

// export default RootLayout