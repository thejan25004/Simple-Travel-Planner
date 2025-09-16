
import { View, Text } from "react-native"
import React from "react"

const SettingsScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-4xl font-bold text-gray-900">Settings Screen</Text>
      <Text className="text-gray-600 mt-2">Customize your app experience</Text>
    </View>
  )
}

export default SettingsScreen