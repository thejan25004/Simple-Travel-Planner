import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Plan } from "@/types/plan";
import { getAllPlans } from "@/services/planService";
import { auth } from "@/firebase";

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = (width - 48) / 2; // 2 columns with padding

interface GalleryItem {
  id: string;
  imageUrl: string;
  tripName: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "completed" | "ongoing";
}

const GalleryTripScreen = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<{[key: string]: boolean}>({});

  const router = useRouter();

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const trips = await getAllPlans();

      // Filter trips that have images and create gallery items
      const items: GalleryItem[] = trips
        .filter((trip: Plan) => trip.image && trip.image.trim() !== "")
        .map((trip: Plan) => ({
          id: trip.id || `trip-${Math.random()}`,
          imageUrl: trip.image!,
          tripName: trip.name,
          location: trip.location,
          date: trip.startDate,
        }));

      setGalleryItems(items);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
      Alert.alert("Error", "Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGalleryData();
    }, [])
  );

  const handleImageLoad = (itemId: string) => {
    setImageLoadStates(prev => ({ ...prev, [itemId]: true }));
  };

  const handleImageError = (itemId: string) => {
    console.warn(`Failed to load image for item: ${itemId}`);
  };

  const openImageModal = (item: GalleryItem) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderGalleryItem = ({ item }: { item: GalleryItem }) => (
    <TouchableOpacity
      className="mb-4 mr-2 rounded-2xl overflow-hidden bg-white"
      style={{
        width: ITEM_SIZE,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      onPress={() => openImageModal(item)}
      activeOpacity={0.8}
    >
      <View className="relative">
        {/* Loading indicator */}
        {!imageLoadStates[item.id] && (
          <View
            className="absolute inset-0 bg-gray-100 items-center justify-center z-10"
            style={{ height: ITEM_SIZE * 0.75 }}
          >
            <ActivityIndicator size="small" color="#059669" />
          </View>
        )}

        {/* Main image */}
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE * 0.75,
            opacity: imageLoadStates[item.id] ? 1 : 0,
          }}
          resizeMode="cover"
          onLoad={() => handleImageLoad(item.id)}
          onError={() => handleImageError(item.id)}
        />

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          className="absolute bottom-0 left-0 right-0 h-16"
        />

        {/* Trip info overlay */}
        <View className="absolute bottom-2 left-2 right-2">
          <Text className="text-white font-bold text-xs" numberOfLines={1}>
            {item.tripName}
          </Text>
          <View className="flex-row items-center mt-1">
            <MaterialIcons name="location-on" size={10} color="rgba(255,255,255,0.8)" />
            <Text className="text-white text-xs ml-1" numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-20">
      <View className="bg-orange-100 p-8 rounded-full mb-6">
        <MaterialIcons name="photo-library" size={64} color="#F59E0B" />
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-3">
        No Trip Photos Yet
      </Text>
      <Text className="text-gray-500 text-center px-8 mb-8 leading-6">
        Start adding photos to your trips to see them in your gallery.
        Every adventure deserves to be remembered!
      </Text>
      <TouchableOpacity
        className="bg-orange-500 px-8 py-4 rounded-xl flex-row items-center"
        onPress={() => router.push("/(dashboard)/trips/new")}
        style={{
          elevation: 4,
          shadowColor: '#F59E0B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <MaterialIcons name="add-a-photo" size={20} color="white" style={{ marginRight: 8 }} />
        <Text className="text-white font-semibold text-lg">Plan a Trip</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="light-content" backgroundColor="#F59E0B" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#F59E0B" />
          <Text className="text-gray-600 mt-4 text-lg">Loading your memories...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#F59E0B" />

      {/* Enhanced Header */}
      <LinearGradient
        colors={['#F59E0B', '#D97706', '#B45309']}
        className="px-6 pt-6 pb-8"
        style={{
          elevation: 6,
          shadowColor: '#F59E0B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1 ml-4">
            <Text className="text-3xl font-bold text-white mb-1">Trip Gallery</Text>
            <Text className="text-orange-100">Your adventure memories</Text>
          </View>
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="photo-camera" size={24} color="white" />
          </View>
        </View>

        {/* Gallery Stats */}
        <View className="mt-6 bg-white/20 px-4 py-3 rounded-2xl">
          <Text className="text-white font-semibold text-center">
            {galleryItems.length} {galleryItems.length === 1 ? 'Photo' : 'Photos'} from your trips
          </Text>
        </View>
      </LinearGradient>

      {/* Gallery Content */}
      {galleryItems.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={galleryItems}
          renderItem={renderGalleryItem}
          numColumns={2}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={10}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: ITEM_SIZE * 0.75 + 32, // item height + margin
            offset: (ITEM_SIZE * 0.75 + 32) * Math.floor(index / 2),
            index,
          })}
        />
      )}

      {/* Full Screen Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeImageModal}
      >
        <View className="flex-1 bg-black">
          <SafeAreaView className="flex-1">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-6 py-4 bg-black/50">
              <TouchableOpacity
                onPress={closeImageModal}
                className="bg-white/20 p-2 rounded-full"
              >
                <MaterialIcons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-white font-semibold text-lg flex-1 text-center mx-4">
                {selectedImage?.tripName}
              </Text>
              <TouchableOpacity className="bg-white/20 p-2 rounded-full">
                <MaterialIcons name="share" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Full Size Image */}
            <View className="flex-1 justify-center">
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage.imageUrl }}
                  style={{ width, height: height * 0.6 }}
                  resizeMode="contain"
                />
              )}
            </View>

            {/* Image Details */}
            <View className="bg-black/80 px-6 py-6">
              {selectedImage && (
                <View>
                  <Text className="text-white text-xl font-bold mb-2">
                    {selectedImage.tripName}
                  </Text>
                  <View className="flex-row items-center mb-2">
                    <MaterialIcons name="location-on" size={16} color="#F59E0B" />
                    <Text className="text-gray-300 ml-2">{selectedImage.location}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialIcons name="calendar-today" size={16} color="#F59E0B" />
                    <Text className="text-gray-300 ml-2">{selectedImage.date}</Text>
                  </View>
                </View>
              )}
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Floating Action Button - Add Photo */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          className="bg-orange-500 w-16 h-16 rounded-full justify-center items-center"
          onPress={() => router.push("/(dashboard)/trips/new")}
          style={{
            elevation: 8,
            shadowColor: '#F59E0B',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <MaterialIcons name="add-a-photo" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GalleryTripScreen;