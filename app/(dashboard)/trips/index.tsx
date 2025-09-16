
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Plan } from "@/types/plan";
import { getAllPlans, deletePlan, toggleFavorite } from "@/services/planService";

const TripsScreen = () => {
  const [trips, setTrips] = useState<Plan[]>([]);
  const router = useRouter();

  const fetchTrips = async () => {
    try {
      const data = await getAllPlans();
      setTrips(data);
    } catch (err) {
      console.log("Error fetching trips:", err);
    }
  };

  useFocusEffect(useCallback(() => { fetchTrips(); }, []));

  const handleDeleteTrip = (id: string) => {
    Alert.alert("Delete Trip", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deletePlan(id);
          fetchTrips();
        },
      },
    ]);
  };

  const handleFavorite = async (trip: Plan) => {
    if (!trip.id) return;
    await toggleFavorite(trip.id, trip.favorite || false);
    fetchTrips();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      <View className="px-6 pt-4 pb-6 bg-white">
        <Text className="text-2xl font-bold text-gray-900 mb-2">My Trips</Text>
        <Text className="text-gray-600">Plan and manage your trips</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {trips.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <MaterialIcons name="flight-takeoff" size={64} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-gray-500 mt-4 mb-2">
              No trips planned yet
            </Text>
          </View>
        ) : (
          trips.map((trip) => (
            <View key={trip.id} className="bg-white mb-4 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {trip.image ? (
                <Image source={{ uri: trip.image }} className="w-full h-40" resizeMode="cover" />
              ) : (
                <View className="w-full h-40 bg-gray-200 items-center justify-center">
                  <MaterialIcons name="image" size={40} color="#9CA3AF" />
                </View>
              )}

              <View className="p-4">
                <Text className="text-lg font-bold">{trip.name}</Text>
                <Text className="text-gray-700">📍 {trip.location}</Text>
                <Text className="text-gray-600">📅 {trip.startDate} - {trip.endDate}</Text>
                {trip.notes && <Text className="text-gray-500">📝 {trip.notes}</Text>}

                <View className="flex-row mt-3 space-x-3">
                  <TouchableOpacity className="bg-blue-500 px-9 py-1 rounded" onPress={() => router.push(`/(dashboard)/trips/${trip.id}`)}>
                    <Text className="text-white">Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="bg-red-500 px-9 py-1 rounded  mx-4" onPress={() => trip.id && handleDeleteTrip(trip.id)}>
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleFavorite(trip)}>
                    <MaterialIcons
                      name={trip.favorite ? "favorite" : "favorite-border"}
                      size={28}
                      color={trip.favorite ? "red" : "gray"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View className="absolute bottom-6 right-6">
        <TouchableOpacity className="bg-green-600 w-16 h-16 rounded-full justify-center items-center shadow-lg" onPress={() => router.push("/(dashboard)/trips/new")}>
          <MaterialIcons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TripsScreen;




