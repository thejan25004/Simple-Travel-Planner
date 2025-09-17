
import React from "react"
import { Tabs } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"

const tabs = [
  { label: "Home", name: "home", icon: "home" },
  { label: "Trips", name: "trips", icon: "flight-takeoff" },
  { label: "Profile", name: "profile", icon: "person" },
  { label: "Settings", name: "settings", icon: "settings" },
] as const

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#059669",
        tabBarInactiveTintColor: "#6B7280",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingBottom: 8,
          paddingTop: 8,
          height: 70
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600"
        }
      }}
    >
      {tabs.map(({ name, icon, label }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={icon} color={color} size={24} />
            )
          }}
        />
      ))}
    </Tabs>
  )
}

export default DashboardLayout