
import React from "react"
import { Stack } from "expo-router"

const TripsLayout = () => {
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Trip Details",
          headerStyle: {
            backgroundColor: "#059669"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: "Plan New Trip",
          headerStyle: {
            backgroundColor: "#059669"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
    </Stack>
  )
}

export default TripsLayout
