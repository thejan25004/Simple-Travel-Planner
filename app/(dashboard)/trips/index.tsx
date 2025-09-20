
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Plan } from "@/types/plan";
import { getAllPlans, deletePlan, toggleFavorite } from "@/services/planService";

const { width } = Dimensions.get('window');

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
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Enhanced Header with Gradient Effect */}
      <View className="px-6 pt-6 pb-8 bg-white" style={{
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-gray-900 mb-1 mt-4">My Trips</Text>
            <Text className="text-base text-gray-600">Plan and manage your adventures</Text>
          </View>
          <View className="bg-blue-50 p-3 rounded-full">
            <MaterialIcons name="flight-takeoff" size={24} color="#3B82F6" />
          </View>
        </View>

        {/* Trip Counter */}
        <View className="mt-4 bg-blue-50 px-4 py-2 rounded-full self-start">
          <Text className="text-blue-700 font-medium">
            {trips.length} {trips.length === 1 ? 'Trip' : 'Trips'}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {trips.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20 bg-white mx-2 rounded-2xl" style={{
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          }}>
            <View className="bg-gray-100 p-6 rounded-full mb-4">
              <MaterialIcons name="flight-takeoff" size={48} color="#9CA3AF" />
            </View>
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              No trips planned yet
            </Text>
            <Text className="text-gray-500 text-center px-8">
              Start planning your next adventure by tapping the + button
            </Text>
          </View>
        ) : (
          trips.map((trip) => (
            <View
              key={trip.id}
              className="bg-white mb-6 rounded-2xl overflow-hidden"
              style={{
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
              }}
            >
              {/* Image Container with Overlay */}
              <View className="relative">
                {trip.image ? (
                  <Image
                    source={{ uri: trip.image }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
                    <MaterialIcons name="image" size={48} color="white" />
                  </View>
                )}

                {/* Favorite Heart Overlay */}
                <TouchableOpacity
                  className="absolute top-4 right-4 bg-white/90 p-2 rounded-full"
                  onPress={() => handleFavorite(trip)}
                  style={{
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                  }}
                >
                  <MaterialIcons
                    name={trip.favorite ? "favorite" : "favorite-border"}
                    size={20}
                    color={trip.favorite ? "#EF4444" : "#6B7280"}
                  />
                </TouchableOpacity>
              </View>

              {/* Content Section */}
              <View className="p-5">
                <Text className="text-xl font-bold text-gray-900 mb-3">{trip.name}</Text>

                {/* Trip Details with Icons */}
                <View className="space-y-2 mb-4">
                  <View className="flex-row items-center">
                    <View className="bg-blue-100 p-2 rounded-full mr-3 mb-2">
                      <MaterialIcons name="location-on" size={16} color="#3B82F6" />
                    </View>
                    <Text className="text-gray-700 flex-1">{trip.location}</Text>
                  </View>

                  <View className="flex-row items-center">
                    <View className="bg-green-100 p-2 rounded-full mr-3 mb-2">
                      <MaterialIcons name="calendar-today" size={16} color="#10B981" />
                    </View>
                    <Text className="text-gray-600 flex-1">{trip.startDate} - {trip.endDate}</Text>
                  </View>

                  {trip.notes && (
                    <View className="flex-row items-start">
                      <View className="bg-orange-100 p-2 rounded-full mr-3">
                        <MaterialIcons name="notes" size={16} color="#F59E0B" />
                      </View>
                      <Text className="text-gray-500 flex-1">{trip.notes}</Text>
                    </View>
                  )}
                </View>

                {/* Action Buttons */}
                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className=" bg-blue-500 py-3 rounded-xl flex-row items-center justify-center w-[75%] "
                    onPress={() => router.push(`/(dashboard)/trips/${trip.id}`)}
                    style={{
                      elevation: 2,
                      shadowColor: '#3B82F6',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                    }}
                  >
                    <MaterialIcons name="edit" size={18} color="white" style={{ marginRight: 6 }} />
                    <Text className="text-white font-semibold">Edit Trip</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-red-50 px-4 py-3 rounded-xl border border-red-200 items-center justify-center mx-4"
                    onPress={() => trip.id && handleDeleteTrip(trip.id)}
                  >
                    <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Enhanced Floating Action Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          className="bg-green-500 w-16 h-16 rounded-full justify-center items-center"
          onPress={() => router.push("/(dashboard)/trips/new")}
          style={{
            elevation: 8,
            shadowColor: '#10B981',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <MaterialIcons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TripsScreen;
