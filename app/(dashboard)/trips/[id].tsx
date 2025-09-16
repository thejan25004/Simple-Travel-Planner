
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Plan } from "@/types/plan";
import { getPlanById, updatePlan, deletePlan } from "@/services/planService";

const TripDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  // Editing state + form fields
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDateObj, setStartDateObj] = useState<Date>(new Date());
  const [endDateObj, setEndDateObj] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<Plan["status"]>("upcoming");

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Fetch the plan by id
  const fetchPlan = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const p = await getPlanById(id);
      if (!p) {
        Alert.alert("Not found", "Trip not found.");
        router.back();
        return;
      }
      setPlan(p);
    } catch (err) {
      console.error("Error loading plan:", err);
      Alert.alert("Error", "Could not load trip. Try again.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Initialize form fields when plan loads (or when switching to edit)
  useEffect(() => {
    if (!plan) return;
    setName(plan.name);
    setLocation(plan.location);
    setStartDateObj(plan.startDate ? new Date(plan.startDate) : new Date());
    setEndDateObj(plan.endDate ? new Date(plan.endDate) : new Date());
    setNotes(plan.notes || "");
    setImageUrl(plan.image || "");
    setStatus(plan.status || "upcoming");
  }, [plan]);

  const getStatusIcon = (s: string) => {
    switch (s) {
      case "upcoming":
        return "🟢";
      case "ongoing":
        return "🔵";
      case "completed":
        return "✅";
      default:
        return "⚪";
    }
  };

  // Delete
  const handleDelete = () => {
    if (!id) return;
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePlan(id);
            Alert.alert("Deleted", "Trip deleted successfully.");
            router.back();
          } catch (err) {
            console.error("Delete error:", err);
            Alert.alert("Error", "Failed to delete trip.");
          }
        },
      },
    ]);
  };

  // Save updates
  const handleSave = async () => {
    if (!id) return;
    if (!name.trim() || !location.trim()) {
      Alert.alert("Validation", "Please fill in name and destination.");
      return;
    }

    // validate date range
    if (startDateObj > endDateObj) {
      Alert.alert("Validation", "Start date cannot be after end date.");
      return;
    }

    const updatedData: Partial<Plan> = {
      name: name.trim(),
      location: location.trim(),
      startDate: startDateObj.toISOString().split("T")[0],
      endDate: endDateObj.toISOString().split("T")[0],
      notes: notes.trim() || undefined,
      image: imageUrl.trim() || undefined,
      status,
    };

    try {
      await updatePlan(id, updatedData);
      Alert.alert("Saved", "Trip updated successfully.");
      setIsEditing(false);
      // refresh plan from server
      await fetchPlan();
    } catch (err) {
      console.error("Update error:", err);
      Alert.alert("Error", "Failed to update trip.");
    }
  };

  // Quick status changer
  const changeStatus = async (newStatus: Plan["status"]) => {
    if (!id) return;
    try {
      await updatePlan(id, { status: newStatus });
      setStatus(newStatus);
      setPlan((p) => (p ? { ...p, status: newStatus } : p));
      Alert.alert("Status updated", `Trip marked "${newStatus}".`);
    } catch (err) {
      console.error("Status update error:", err);
      Alert.alert("Error", "Could not update status.");
    }
  };

  const onChangeStartDate = (event: any, selected?: Date) => {
    const current = selected || startDateObj;
    if (Platform.OS !== "ios") setShowStartDatePicker(false);
    setStartDateObj(current);
  };

  const onChangeEndDate = (event: any, selected?: Date) => {
    const current = selected || endDateObj;
    if (Platform.OS !== "ios") setShowEndDatePicker(false);
    setEndDateObj(current);
  };

  if (loading || !plan) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-lg text-gray-500">Loading trip...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner Image */}
        <ImageBackground
          source={{ uri: plan.image || undefined }}
          className="h-80 rounded-b-2xl overflow-hidden bg-gray-200"
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.6)"]}
            className="flex-1 justify-end p-6"
          >
            <View className="bg-black/30 rounded-lg px-4 py-2 mb-4 inline-flex">
              <Text className="text-white text-base">
                {getStatusIcon(plan.status)}{" "}
                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </Text>
            </View>

            <Text className="text-white text-3xl font-bold mb-1">
              {plan.name}
            </Text>
            <Text className="text-gray-200 text-lg">
              {plan.location} • {new Date(plan.startDate).toLocaleDateString()} -{" "}
              {new Date(plan.endDate).toLocaleDateString()}
            </Text>
          </LinearGradient>
        </ImageBackground>

        {/* Details / Edit Form */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-2xl p-6 border border-gray-200">
            {/* When editing show inputs */}
            {isEditing ? (
              <>
                <Text className="text-lg font-bold text-gray-900 mb-2">
                  Edit Trip
                </Text>

                <Text className="text-sm text-gray-600 mb-1">Trip Title</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Trip title"
                  className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-3"
                />

                <Text className="text-sm text-gray-600 mb-1">Destination</Text>
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Destination"
                  className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-3"
                />

                <View className="flex-row space-x-3 mb-3">
                  <View className="flex-1">
                    <Text className="text-sm text-gray-600 mb-1">Start Date</Text>
                    <TouchableOpacity
                      onPress={() => setShowStartDatePicker(true)}
                      className="bg-gray-50 border border-gray-200 rounded-md p-3"
                    >
                      <Text>{startDateObj.toLocaleDateString("en-GB")}</Text>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                      <DateTimePicker
                        value={startDateObj}
                        mode="date"
                        display="spinner"
                        onChange={onChangeStartDate}
                        minimumDate={new Date(2000, 0, 1)}
                      />
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm text-gray-600 mb-1">End Date</Text>
                    <TouchableOpacity
                      onPress={() => setShowEndDatePicker(true)}
                      className="bg-gray-50 border border-gray-200 rounded-md p-3"
                    >
                      <Text>{endDateObj.toLocaleDateString("en-GB")}</Text>
                    </TouchableOpacity>
                    {showEndDatePicker && (
                      <DateTimePicker
                        value={endDateObj}
                        mode="date"
                        display="spinner"
                        onChange={onChangeEndDate}
                        minimumDate={startDateObj}
                      />
                    )}
                  </View>
                </View>

                <Text className="text-sm text-gray-600 mb-1">Image URL</Text>
                <TextInput
                  value={imageUrl}
                  onChangeText={setImageUrl}
                  placeholder="Paste image URL"
                  className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-3"
                />
                {imageUrl.trim() !== "" && (
                  <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-40 rounded-lg mb-3"
                    resizeMode="cover"
                  />
                )}

                <Text className="text-sm text-gray-600 mb-1">Notes</Text>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Notes..."
                  multiline
                  numberOfLines={4}
                  className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4"
                />

                {/* Status select quick buttons */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 mb-2">Status</Text>
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      className={`px-3 py-2 rounded-md ${
                        status === "upcoming" ? "bg-green-600" : "bg-gray-100"
                      }`}
                      onPress={() => setStatus("upcoming")}
                    >
                      <Text className={status === "upcoming" ? "text-white" : "text-gray-800"}>
                        Upcoming
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`px-3 py-2 rounded-md ${
                        status === "ongoing" ? "bg-blue-600" : "bg-gray-100"
                      }`}
                      onPress={() => setStatus("ongoing")}
                    >
                      <Text className={status === "ongoing" ? "text-white" : "text-gray-800"}>
                        Ongoing
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`px-3 py-2 rounded-md ${
                        status === "completed" ? "bg-gray-700" : "bg-gray-100"
                      }`}
                      onPress={() => setStatus("completed")}
                    >
                      <Text className={status === "completed" ? "text-white" : "text-gray-800"}>
                        Completed
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="flex-row space-x-3 mt-2">
                  <TouchableOpacity
                    className="flex-1 bg-green-600 rounded-xl py-3 items-center"
                    onPress={handleSave}
                  >
                    <Text className="text-white font-semibold">Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 bg-gray-300 rounded-xl py-3 items-center"
                    onPress={() => {
                      // reset form to original plan values
                      if (plan) {
                        setName(plan.name);
                        setLocation(plan.location);
                        setStartDateObj(new Date(plan.startDate));
                        setEndDateObj(new Date(plan.endDate));
                        setNotes(plan.notes || "");
                        setImageUrl(plan.image || "");
                        setStatus(plan.status || "upcoming");
                      }
                      setIsEditing(false);
                    }}
                  >
                    <Text className="text-gray-800 font-semibold">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              // Read-only view
              <>
                <Text className="text-xl font-bold text-gray-900 mb-2">Trip Details</Text>

                <Text className="text-gray-600 mb-2">
                  <Text className="font-semibold">Destination: </Text>
                  {plan.location}
                </Text>

                <Text className="text-gray-600 mb-2">
                  <Text className="font-semibold">Dates: </Text>
                  {new Date(plan.startDate).toLocaleDateString()} -{" "}
                  {new Date(plan.endDate).toLocaleDateString()}
                </Text>

                {plan.notes ? (
                  <Text className="text-gray-600 mb-2">
                    <Text className="font-semibold">Notes: </Text>
                    {plan.notes}
                  </Text>
                ) : null}

                {/* Action Buttons */}
                <View className="flex-row space-x-4 mt-4">
                  <TouchableOpacity
                    className="flex-1 bg-yellow-500 rounded-xl py-3 items-center"
                    onPress={() => setIsEditing(true)}
                  >
                    <Text className="text-white font-semibold">Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 bg-red-500 rounded-xl py-3 items-center"
                    onPress={handleDelete}
                  >
                    <Text className="text-white font-semibold">Delete</Text>
                  </TouchableOpacity>

                  {plan.status !== "completed" && (
                    <TouchableOpacity
                      className="flex-1 bg-blue-500 rounded-xl py-3 items-center"
                      onPress={() => changeStatus("completed")}
                    >
                      <Text className="text-white font-semibold">Mark Completed</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripDetailsScreen;
