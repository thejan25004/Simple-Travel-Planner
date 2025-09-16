
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Plan } from "@/types/plan";
import { createPlan } from "@/services/planService";

const NewTripScreen = () => {
  const [tripTitle, setTripTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [notes, setNotes] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Only URL input

  const router = useRouter();

const handleSubmit = async () => {
  if (!tripTitle.trim() || !destination.trim() || !startDate || !endDate) {
    Alert.alert("Validation Error", "Please fill in all required fields");
    return;
  }

  const newTrip: Plan = {
    name: tripTitle,
    location: destination,
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    status: "upcoming",
    notes: notes.trim() || undefined,
    image: imageUrl.trim() || undefined,
  };

  await createPlan(newTrip);

  Alert.alert(
    "Trip Created!",
    `Your trip "${tripTitle}" to ${destination} has been planned successfully!`,
    [
      {
        text: "OK",
        onPress: () => router.push("/trips"), // 👈 Go to TripsScreen
      },
    ]
  );
};


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          {/* Trip Title */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Trip Title *
            </Text>
            <TextInput
              placeholder="e.g., Cultural Heritage Tour"
              className="bg-white border-b-2 border-green-200 p-4 text-gray-900 text-base"
              value={tripTitle}
              onChangeText={setTripTitle}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Destination */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Destination *
            </Text>
            <TextInput
              placeholder="Enter destination (e.g., Kandy)"
              className="bg-white border-b-2 border-green-200 p-4 text-gray-900 text-base"
              value={destination}
              onChangeText={setDestination}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Start Date */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Start Date *
            </Text>
            <TouchableOpacity
              className="bg-white border-b-2 border-green-200 p-4"
              onPress={() => setShowStartPicker(true)}
            >
              <Text className="text-gray-900 text-base">
                {startDate
                  ? startDate.toDateString()
                  : "Select a start date"}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  if (Platform.OS === "android") setShowStartPicker(false);
                  if (selectedDate) setStartDate(selectedDate);
                }}
              />
            )}
          </View>

          {/* End Date */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              End Date *
            </Text>
            <TouchableOpacity
              className="bg-white border-b-2 border-green-200 p-4"
              onPress={() => setShowEndPicker(true)}
            >
              <Text className="text-gray-900 text-base">
                {endDate ? endDate.toDateString() : "Select an end date"}
              </Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  if (Platform.OS === "android") setShowEndPicker(false);
                  if (selectedDate) setEndDate(selectedDate);
                }}
              />
            )}
          </View>

          {/* Image URL */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Image URL
            </Text>
            <TextInput
              placeholder="Paste image URL here"
              className="bg-white border-b-2 border-green-200 p-4 text-gray-900 text-base"
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholderTextColor="#9CA3AF"
            />
            {imageUrl.trim() !== "" && (
              <Image
                source={{ uri: imageUrl }}
                className="w-full h-64 mt-4 rounded-lg"
                resizeMode="cover"
              />
            )}
          </View>

          {/* Notes */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Notes
            </Text>
            <TextInput
              placeholder="Add any special notes..."
              className="bg-white rounded-2xl border border-gray-200 p-4 text-gray-900 text-base"
              value={notes}
              onChangeText={setNotes}
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity onPress={handleSubmit}>
            <LinearGradient
              colors={["#059669", "#0EA5E9"]}
              className="py-4 px-8 rounded-xl shadow-lg"
            >
              <Text className="text-white text-xl font-semibold text-center">
                Save Trip
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewTripScreen;


