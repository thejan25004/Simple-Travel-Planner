import {
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { getAllPlans } from "@/services/planService";
import { Plan } from "@/types/plan";

const { width } = Dimensions.get("window");

const PopularDestinations = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const trips = await getAllPlans();
      setFavorites(trips.filter((t) => t.favorite));
    };
    fetchFavorites();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
          <Text className="text-2xl font-bold text-gray-900 mt-12 mb-6">
        Popular Destinations
      </Text>

      {favorites.length === 0 && (
        <Text className="text-gray-400 text-base">No favorite trips yet</Text>
      )}

      {favorites.map((trip) => (
        <TouchableOpacity
          key={trip.id}
          className="mb-4"
          activeOpacity={0.85}
          onPress={() => router.push(`/(dashboard)/trips/${trip.id}`)}
          style={styles.cardWrapper}
        >
          <ImageBackground
            source={{ uri: trip.image }}
            style={[styles.image, { width: width - 32 }]}
            imageStyle={{ borderRadius: 16 }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.5)"]}
              style={styles.gradient}
            >
              <Text className="text-white text-xl font-bold mb-1">
                {trip.name}
              </Text>
              <Text className="text-gray-200 text-sm">📍 {trip.location}</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  image: {
    height: width * 0.5, // 50% of screen width
    borderRadius: 16,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12,
    borderRadius: 16,
  },
});

export default PopularDestinations;
