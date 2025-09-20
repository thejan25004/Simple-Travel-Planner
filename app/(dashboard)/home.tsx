// import {
//   View,
//   Text,
//   ScrollView,
//   ImageBackground,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { getAllPlans } from "@/services/planService";
// import { Plan } from "@/types/plan";
//
// const { width } = Dimensions.get('window');
//
// const Home = () => {
//   const router = useRouter();
//   const [trips, setTrips] = useState<Plan[]>([]);
//
//   // ✅ Fetch all trips from Firestore
//   const fetchTrips = async () => {
//     try {
//       const data = await getAllPlans();
//       setTrips(data);
//     } catch (err) {
//       console.log("Error fetching trips:", err);
//     }
//   };
//
//   useEffect(() => {
//     fetchTrips();
//   }, []);
//
//   // Filter upcoming trips
//   const upcomingTrips = trips.filter(
//     (trip) => new Date(trip.startDate) >= new Date()
//   );
//
//   // Filter favorite trips for popular section
//   const favoriteTrips = trips.filter((trip) => trip.favorite);
//
//   // Get current time-based greeting
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };
//
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         className="flex-1"
//         bounces={true}
//       >
//         {/* Enhanced Premium Header */}
//         <LinearGradient
//           colors={['#ffffff', '#f8fafc', '#e2e8f0']}
//           className="px-6 pt-12 pb-8 rounded-b-3xl"
//           style={{
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.15,
//             shadowRadius: 12,
//             elevation: 8,
//           }}
//         >
//           {/* Top Navigation Bar */}
//           <View className="flex-row justify-between items-center mb-8  mx-4">
//             <View className="flex-1">
//               <View className="flex-row items-center mb-2">
//                 <Text className="text-base text-gray-500 font-medium">
//                   {getGreeting()}
//                 </Text>
//                 <View className="w-2 h-2 bg-green-500 rounded-full ml-2" />
//               </View>
//               <Text className="text-3xl font-bold text-gray-900 tracking-tight mb-1 ">
//                 Explorer
//               </Text>
//               <Text className="text-sm text-gray-600 font-medium">
//                 Ready for your next adventure?
//               </Text>
//             </View>
//
//             <View className="flex-row items-center space-x-3">
//               {/* Weather Widget */}
//           <TouchableOpacity
//             className="w-12 h-12 bg-white/80 rounded-2xl items-center justify-center backdrop-blur-sm mr-3"
//             style={{
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.1,
//               shadowRadius: 4,
//               elevation: 3,
//               borderWidth: 1,
//               borderColor: "rgba(255, 255, 255, 0.8)",
//               marginRight: 12, // 👈 Extra spacing if needed
//             }}
//             activeOpacity={0.8}
//           >
//                 <MaterialIcons name="wb-sunny" size={22} color="#F59E0B" />
//               </TouchableOpacity>
//
//               {/* Notifications */}
//           <TouchableOpacity
//             className="w-12 h-12 bg-white rounded-2xl items-center justify-center relative mr-3"
//             style={{
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.1,
//               shadowRadius: 4,
//               elevation: 3,
//             }}
//             activeOpacity={0.8}
//           >
//                 <MaterialIcons name="notifications-none" size={24} color="#1F2937" />
//                 {/* Notification Badge */}
//                 <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
//                   <Text className="text-white text-xs font-bold">3</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//
//           {/* Travel Stats Cards */}
//           <View className="flex-row justify-between mb-6  mx-3">
//             <View
//               className="bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1 mr-2"
//               style={{
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 elevation: 2,
//                 borderWidth: 1,
//                 borderColor: 'rgba(255, 255, 255, 0.5)',
//               }}
//             >
//               <View className="flex-row items-center">
//                 <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
//                   <MaterialIcons name="flight" size={16} color="#3B82F6" />
//                 </View>
//                 <View>
//                   <Text className="text-lg font-bold text-gray-900">{trips.length}</Text>
//                   <Text className="text-xs text-gray-600 font-medium">Total Trips</Text>
//                 </View>
//               </View>
//             </View>
//
//             <View
//               className="bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1 mx-1"
//               style={{
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 elevation: 2,
//                 borderWidth: 1,
//                 borderColor: 'rgba(255, 255, 255, 0.5)',
//               }}
//             >
//               <View className="flex-row items-center">
//                 <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
//                   <MaterialIcons name="schedule" size={16} color="#10B981" />
//                 </View>
//                 <View>
//                   <Text className="text-lg font-bold text-gray-900">{upcomingTrips.length}</Text>
//                   <Text className="text-xs text-gray-600 font-medium">Upcoming</Text>
//                 </View>
//               </View>
//             </View>
//
//             <View
//               className="bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1 ml-2"
//               style={{
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 elevation: 2,
//                 borderWidth: 1,
//                 borderColor: 'rgba(255, 255, 255, 0.5)',
//               }}
//             >
//               <View className="flex-row items-center">
//                 <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-3">
//                   <MaterialIcons name="favorite" size={16} color="#EF4444" />
//                 </View>
//                 <View>
//                   <Text className="text-lg font-bold text-gray-900">{favoriteTrips.length}</Text>
//                   <Text className="text-xs text-gray-600 font-medium">Favorites</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//
//           {/* Enhanced Search Bar with AI Assistant */}
//           <TouchableOpacity
//             className="bg-white rounded-2xl px-6 py-4 w-[95%] self-center mb-4"
//             style={{
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 4 },
//               shadowOpacity: 0.12,
//               shadowRadius: 12,
//               elevation: 6,
//               borderWidth: 1,
//               borderColor: 'rgba(0, 0, 0, 0.05)',
//             }}
//           >
//             <View className="flex-row items-center">
//               <LinearGradient
//                 colors={['#3B82F6', '#1D4ED8']}
//                 className="w-10 h-10 rounded-full items-center justify-center mr-4"
//               >
//                 <MaterialIcons name="auto-awesome" size={2} color="white" />
//               </LinearGradient>
//               <View className="flex-1">
//                 <Text className="text-gray-900 text-base font-semibold mb-1">
//                  Search Your Vacation Here
//                 </Text>
//                 <Text className="text-gray-500 text-sm font-medium">
//                   ${"Find me beaches in Bali or Plan weekend getaways ..."}
//                 </Text>
//                 <Text className="text-gray-400 text-xs mt-1">
//                 </Text>
//               </View>
//               <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
//                 <MaterialIcons name="mic" size={20} color="#6B7280" />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//
//           {/* Quick Action Pills */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 4 }}
//             className="mb-2"
//           >
//             <View className="flex-row space-x-3">
//               <TouchableOpacity
//                 className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2 rounded-full flex-row items-center"
//                 style={{
//                   backgroundColor: '#8B5CF6',
//                   shadowColor: '#8B5CF6',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.3,
//                   shadowRadius: 4,
//                   elevation: 3,
//                 }}
//               >
//                 <MaterialIcons name="explore" size={16} color="white" />
//                 <Text className="text-white font-semibold text-sm ml-2">Discover</Text>
//               </TouchableOpacity>
//
//               <TouchableOpacity
//                 className="bg-white px-4 py-2 rounded-full flex-row items-center border border-gray-200"
//                 style={{
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 1 },
//                   shadowOpacity: 0.05,
//                   shadowRadius: 2,
//                   elevation: 1,
//                 }}
//               >
//                 <MaterialIcons name="local-offer" size={16} color="#059669" />
//                 <Text className="text-gray-700 font-semibold text-sm ml-2">Deals</Text>
//               </TouchableOpacity>
//
//               <TouchableOpacity
//                 className="bg-white px-4 py-2 rounded-full flex-row items-center border border-gray-200"
//                 style={{
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 1 },
//                   shadowOpacity: 0.05,
//                   shadowRadius: 2,
//                   elevation: 1,
//                 }}
//               >
//                 <MaterialIcons name="trending-up" size={16} color="#F59E0B" />
//                 <Text className="text-gray-700 font-semibold text-sm ml-2">Trending</Text>
//               </TouchableOpacity>
//
//               <TouchableOpacity
//                 className="bg-white px-4 py-2 rounded-full flex-row items-center border border-gray-200"
//                 style={{
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 1 },
//                   shadowOpacity: 0.05,
//                   shadowRadius: 2,
//                   elevation: 1,
//                 }}
//               >
//                 <MaterialIcons name="group" size={16} color="#3B82F6" />
//                 <Text className="text-gray-700 font-semibold text-sm ml-2">Groups</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </LinearGradient>
//
//         {/* Hero Trip Card */}
//         {upcomingTrips.length > 0 && (
//           <View className="px-6 mb-8 mt-6">
//             <View className="flex-row items-center justify-between mb-6">
//               <Text className="text-2xl font-bold text-gray-900 tracking-tight">
//                 Your Next Adventure
//               </Text>
//               <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full">
//                 <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
//                 <Text className="text-green-700 text-sm font-semibold">UPCOMING</Text>
//               </View>
//             </View>
//
//             <TouchableOpacity
//               onPress={() =>
//                 router.push(`/(dashboard)/trips/${upcomingTrips[0].id}`)
//               }
//               style={{
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 8 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 16,
//                 elevation: 10,
//               }}
//             >
//               <ImageBackground
//                 source={{ uri: upcomingTrips[0].image }}
//                 className="h-72 rounded-3xl overflow-hidden"
//                 resizeMode="cover"
//               >
//                 <LinearGradient
//                   colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.7)"]}
//                   locations={[0, 0.4, 1]}
//                   className="flex-1 justify-end p-6"
//                 >
//                   <View
//                     className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
//                     style={{
//                       backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                     }}
//                   >
//                     <Text className="text-white text-2xl font-bold mb-3 tracking-tight">
//                       {upcomingTrips[0].name}
//                     </Text>
//                     <View className="flex-row items-center">
//                       <MaterialIcons name="schedule" size={18} color="rgba(255,255,255,0.9)" />
//                       <Text className="text-white/90 text-base font-medium ml-2">
//                         {new Date(upcomingTrips[0].startDate).toLocaleDateString('en-US', {
//                           month: 'short',
//                           day: 'numeric'
//                         })}{" "}
//                         - {new Date(upcomingTrips[0].endDate).toLocaleDateString('en-US', {
//                           month: 'short',
//                           day: 'numeric'
//                         })}
//                       </Text>
//                     </View>
//                   </View>
//                 </LinearGradient>
//               </ImageBackground>
//             </TouchableOpacity>
//           </View>
//         )}
//
//         {/* Beautiful Popular Destinations */}
//         <View className="mb-8">
//           <View className="flex-row justify-between items-center mb-6 px-6">
//             <Text className="text-2xl font-bold text-gray-900 tracking-tight">
//               Popular Destinations
//             </Text>
//             <TouchableOpacity
//               onPress={() => router.push("/(dashboard)/popular-destinations")}
//               className="bg-green-500 px-5 py-2 rounded-full"
//             >
//               <Text className="text-white font-semibold text-sm">See All</Text>
//             </TouchableOpacity>
//           </View>
//
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 48 }}
//             decelerationRate="fast"
//           >
//             {favoriteTrips.length === 0 ? (
//               <View
//                 className="w-80 h-52 bg-white rounded-3xl items-center justify-center border border-gray-200"
//                 style={{
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 4 },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 8,
//                   elevation: 3,
//                 }}
//               >
//                 <MaterialIcons name="favorite-border" size={48} color="#D1D5DB" />
//                 <Text className="text-gray-500 font-semibold mt-4 text-lg">No favorite trips yet</Text>
//                 <Text className="text-gray-400 text-sm mt-2 text-center px-4">
//                   Mark trips as favorite to see them here
//                 </Text>
//               </View>
//             ) : (
//               favoriteTrips.map((trip, index) => (
//                 <TouchableOpacity
//                   key={trip.id}
//                   className="mr-4"
//                   style={{
//                     width: width * 0.8,
//                     shadowColor: '#000',
//                     shadowOffset: { width: 0, height: 6 },
//                     shadowOpacity: 0.2,
//                     shadowRadius: 12,
//                     elevation: 8,
//                   }}
//                   onPress={() => router.push(`/(dashboard)/trips/${trip.id}`)}
//                 >
//                   <ImageBackground
//                     source={{ uri: trip.image }}
//                     className="h-52 rounded-3xl overflow-hidden"
//                     resizeMode="cover"
//                   >
//                     <LinearGradient
//                       colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
//                       className="flex-1 justify-end p-6"
//                     >
//                       <View className="flex-row items-center mb-3">
//                         <MaterialIcons name="favorite" size={16} color="#EF4444" />
//                         <View className="bg-black/30 px-3 py-1 rounded-full ml-2">
//                           <Text className="text-white text-xs font-medium">POPULAR</Text>
//                         </View>
//                       </View>
//                       <Text className="text-white text-xl font-bold mb-2 tracking-tight">
//                         {trip.name}
//                       </Text>
//                       <View className="flex-row items-center">
//                         <MaterialIcons name="location-on" size={16} color="rgba(255,255,255,0.8)" />
//                         <Text className="text-white/80 text-sm font-medium ml-1">
//                           {trip.location}
//                         </Text>
//                       </View>
//                     </LinearGradient>
//                   </ImageBackground>
//                 </TouchableOpacity>
//               ))
//             )}
//           </ScrollView>
//         </View>
//
//         {/* Nature-Inspired Quick Actions with Animations */}
//         <View className="px-6 pb-12">
//           <Text className="text-xl font-bold text-gray-900 mb-4">
//             Quick Actions
//           </Text>
//
//           <View className="flex-row justify-between">
//             <TouchableOpacity
//               className="flex-1 w-[30%] mr-3  h-41"
//               onPress={() => router.push("/(dashboard)/trips/new")}
//               style={{
//                 backgroundColor: '#059669',
//                 borderRadius: 18,
//                 padding: 20,
//                 shadowColor: '#059669',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 8,
//                 elevation: 6,
//                 overflow: 'hidden',
//               }}
//               activeOpacity={0.85}
//             >
//               <LinearGradient
//                 colors={['#10B981', '#059669', '#047857']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   borderRadius: 18,
//                 }}
//               />
//               {/* Subtle animated background pattern */}
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: -20,
//                   right: -20,
//                   width: 80,
//                   height: 80,
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   borderRadius: 40,
//                 }}
//               />
//               <View
//                 style={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                   width: 52,
//                   height: 52,
//                   borderRadius: 16,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: 12,
//                   borderWidth: 1,
//                   borderColor: 'rgba(255, 255, 255, 0.3)',
//                 }}
//               >
//                 <MaterialIcons name="add-location" size={26} color="white" />
//               </View>
//               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Plan Trip</Text>
//               <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 8, marginTop: 2 }}>New adventure</Text>
//             </TouchableOpacity>
//
//             <TouchableOpacity
//               className="w-[30%] mr-3"
//               activeOpacity={0.85}
//               style={{
//                 backgroundColor: '#0369A1',
//                 borderRadius: 18,
//                 padding: 18,
//                 shadowColor: '#0369A1',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 8,
//                 elevation: 6,
//                 overflow: 'hidden',
//               }}
//             >
//               <LinearGradient
//                 colors={['#0EA5E9', '#0369A1', '#1E40AF']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   borderRadius: 18,
//                 }}
//               />
//               {/* Ocean wave pattern */}
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: -10,
//                   left: -10,
//                   width: 60,
//                   height: 60,
//                   backgroundColor: 'rgba(255, 255, 255, 0.08)',
//                   borderRadius: 30,
//                 }}
//               />
//               <View
//                 style={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                   width: 48,
//                   height: 48,
//                   borderRadius: 14,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: 10,
//                   borderWidth: 1,
//                   borderColor: 'rgba(255, 255, 255, 0.3)',
//                 }}
//               >
//                 <MaterialIcons name="explore" size={24} color="white" />
//               </View>
//               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Explore Trip</Text>
//               <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 8 }}>Discover</Text>
//             </TouchableOpacity>
//
//             <TouchableOpacity
//               className="w-[30%]"
//               activeOpacity={0.85}
//               style={{
//                 backgroundColor: '#B45309',
//                 borderRadius: 18,
//                 padding: 18,
//                 shadowColor: '#B45309',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 8,
//                 elevation: 6,
//                 overflow: 'hidden',
//               }}
//             >
//               <LinearGradient
//                 colors={['#F59E0B', '#D97706', '#B45309']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   borderRadius: 18,
//                 }}
//               />
//               {/* Mountain/sun pattern */}
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: -15,
//                   right: -15,
//                   width: 50,
//                   height: 50,
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   borderRadius: 25,
//                 }}
//               />
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: -5,
//                   left: -5,
//                   width: 30,
//                   height: 30,
//                   backgroundColor: 'rgba(255, 255, 255, 0.05)',
//                   borderRadius: 15,
//                 }}
//               />
//               <View
//                 style={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                   width: 48,
//                   height: 48,
//                   borderRadius: 14,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: 10,
//                   borderWidth: 1,
//                   borderColor: 'rgba(255, 255, 255, 0.3)',
//                 }}
//               >
//                 <MaterialIcons name="camera-alt" size={24} color="white" />
//               </View>
//               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Gallery Trip</Text>
//               <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 8, marginTop: 1 }}>Memories</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
//
// export default Home;

import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getAllPlans } from "@/services/planService";
import { Plan } from "@/types/plan";

const { width } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const [trips, setTrips] = useState<Plan[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrips, setFilteredTrips] = useState<Plan[]>([]);

  const fetchTrips = async () => {
    try {
      const data = await getAllPlans();
      setTrips(data);
    } catch (err) {
      console.log("Error fetching trips:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const upcomingTrips = trips.filter((trip) => new Date(trip.startDate) >= new Date());
  const favoriteTrips = trips.filter((trip) => trip.favorite);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" bounces={true}>
        {/* Premium Header */}
        <LinearGradient
          colors={["#ffffff", "#f8fafc", "#e2e8f0"]}
          className="px-6 pt-12 pb-8 rounded-b-3xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Greeting */}
          <View className="flex-row justify-between items-center mb-8 mx-4">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Text className="text-xs text-gray-500 font-medium">{getGreeting()}</Text>
                <View className="w-2 h-2 bg-green-500 rounded-full ml-2" />
              </View>
              <Text className="text-xl font-bold text-gray-900 tracking-tight mb-1">Explorer</Text>
              <Text className="text-xs text-gray-600 font-medium">Ready for your next adventure?</Text>
            </View>
            {/* Top Buttons */}
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity
                className="w-12 h-12 bg-white/80 rounded-2xl items-center justify-center backdrop-blur-sm mr-3"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.8)",
                  marginRight: 12,
                }}
                activeOpacity={0.8}
              >
                <MaterialIcons name="wb-sunny" size={22} color="#F59E0B" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 bg-white rounded-2xl items-center justify-center relative mr-3"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                activeOpacity={0.8}
              >
                <MaterialIcons name="notifications-none" size={24} color="#1F2937" />
                <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">3</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Travel Stats */}
          <View className="flex-row justify-between mb-6 mx-0 w-[95%]">
            {/* Total Trips */}
            <View
              className="bg-white rounded-2xl px-4 py-3 flex-1 mr-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <MaterialIcons name="flight" size={16} color="#3B82F6" />
                </View>
                <View>
                  <Text className="text-base font-bold text-gray-900">{trips.length}</Text>
                  <Text className="text-xs text-gray-600 font-medium -ml-3" style={{ fontSize: 7 }}>
                    Total Trips
                  </Text>
                </View>
              </View>
            </View>
            {/* Upcoming */}
            <View
              className="bg-white rounded-2xl px-4 py-3 flex-1 mx-1"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                  <MaterialIcons name="schedule" size={16} color="#10B981" />
                </View>
                <View>
                  <Text className="text-base font-bold text-gray-900">{upcomingTrips.length}</Text>
                  <Text className="text-xs text-gray-600 font-medium -ml-2" style={{ fontSize: 7 }}>
                    Upcoming
                  </Text>
                </View>
              </View>
            </View>
            {/* Favorites */}
            <View
              className="bg-white rounded-2xl px-4 py-3 flex-1 ml-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-3">
                  <MaterialIcons name="favorite" size={16} color="#EF4444" />
                </View>
                <View>
                  <Text className="text-base font-bold text-gray-900">{favoriteTrips.length}</Text>
                  <Text className="text-xs text-gray-600 font-medium -ml-2" style={{ fontSize: 7 }}>
                    Favorites
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Enhanced Search Bar (search process added only) */}
          <TouchableOpacity
            className="bg-white rounded-2xl px-6 py-1 w-[95%] self-center mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 12,
              elevation: 6,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.05)",
            }}
            activeOpacity={1}
          >
            <View className="flex-row items-center">
              <LinearGradient colors={["#3B82F6", "#1D4ED8"]} className="w-8 h-8 rounded-full items-center justify-center mr-4">
                <MaterialIcons name="auto-awesome" size={20} color="white" />
              </LinearGradient>
              <TextInput
                placeholder="Search your vacation here..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-xs text-gray-700"
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  const results = trips.filter(
                    (trip) =>
                      (trip.name || "").toLowerCase().includes(text.toLowerCase()) ||
                      (trip.location || "").toLowerCase().includes(text.toLowerCase())
                  );
                  setFilteredTrips(results);
                }}
              />
              <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
                <MaterialIcons name="mic" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Search Results (shows only when typing) */}
          {searchQuery.length > 0 && (
            <View className="px-6 mt-4 mb-6">
              {filteredTrips.length === 0 ? (
                <Text className="text-gray-500">No trips found</Text>
              ) : (
                filteredTrips.map((trip) => (
                  <TouchableOpacity
                    key={trip.id}
                    onPress={() => router.push(`/(dashboard)/trips/${trip.id}`)}
                    className="bg-white rounded-xl p-4 mb-3 flex-row items-center"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <MaterialIcons name="flight" size={20} color="#3B82F6" />
                    <View className="ml-3">
                      <Text className="text-gray-900 font-semibold">{trip.name}</Text>
                      <Text className="text-gray-500 text-xs">{trip.location}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </LinearGradient>

        {/* Hero Trip Card (Your Next Adventure) */}
        {upcomingTrips.length > 0 && (
          <View className="px-6 mb-8 mt-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-base font-bold text-gray-900 tracking-tight">Your Next Adventure</Text>
              <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <Text className="text-green-700 text-xs font-semibold">UPCOMING</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push(`/(dashboard)/trips/${upcomingTrips[0].id}`)} style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 10 }}>
              <ImageBackground
                source={{ uri: (upcomingTrips[0].image || upcomingTrips[0].imageUrl) as string }}
                className="h-72 rounded-3xl overflow-hidden"
                resizeMode="cover"
              >
                <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.7)"]} locations={[0, 0.4, 1]} className="flex-1 justify-end p-6">
                  <View className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <Text className="text-white text-lg font-bold mb-3 tracking-tight">{upcomingTrips[0].name}</Text>
                    <View className="flex-row items-center">
                      <MaterialIcons name="schedule" size={18} color="rgba(255,255,255,0.9)" />
                      <Text className="text-white/90 text-sm font-medium ml-2">
                        {new Date(upcomingTrips[0].startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(upcomingTrips[0].endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}

        {/* Upcoming Trips (horizontal list) */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base font-bold text-gray-900">Upcoming Trips</Text>
            <TouchableOpacity onPress={() => router.push(`/(dashboard)/trips`)}>
              <Text className="text-sm text-blue-600 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 2 }}>
            {upcomingTrips.map((trip) => (
              <TouchableOpacity
                key={trip.id}
                onPress={() => router.push(`/(dashboard)/trips/${trip.id}`)}
                className="mr-4"
                style={{ width: width * 0.6 }}
              >
                <ImageBackground source={{ uri: (trip.image || trip.imageUrl) as string }} className="h-40 rounded-2xl overflow-hidden" resizeMode="cover">
                  <LinearGradient colors={["transparent", "rgba(0,0,0,0.6)"]} className="flex-1 justify-end p-3">
                    <Text className="text-white font-bold">{trip.name}</Text>
                    <Text className="text-white text-xs">{trip.location}</Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            ))}
            {upcomingTrips.length === 0 && (
              <View className="w-80 h-40 bg-white rounded-2xl items-center justify-center border border-gray-200">
                <Text className="text-gray-500">No upcoming trips</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Popular Destinations */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-6 px-6">
            <Text className="text-base font-bold text-gray-900 tracking-tight">Popular Destinations</Text>
            <TouchableOpacity onPress={() => router.push("/(dashboard)/popular-destinations")} className="bg-green-500 px-5 py-2 rounded-full">
              <Text className="text-white font-semibold text-xs">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 48 }} decelerationRate="fast">
            {favoriteTrips.length === 0 ? (
              <View className="w-80 h-52 bg-white rounded-3xl items-center justify-center border border-gray-200" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
                <MaterialIcons name="favorite-border" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 font-semibold mt-4 text-base">No favorite trips yet</Text>
                <Text className="text-gray-400 text-xs mt-2 text-center px-4">Mark trips as favorite to see them here</Text>
              </View>
            ) : (
              favoriteTrips.map((trip, index) => (
                <TouchableOpacity key={trip.id} className="mr-4" style={{ width: width * 0.8, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8 }} onPress={() => router.push(`/(dashboard)/trips/${trip.id}`)}>
                  <ImageBackground source={{ uri: (trip.image || trip.imageUrl) as string }} className="h-52 rounded-3xl overflow-hidden" resizeMode="cover">
                    <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]} className="flex-1 justify-end p-6">
                      <View className="flex-row items-center mb-3">
                        <MaterialIcons name="favorite" size={16} color="#EF4444" />
                        <View className="bg-black/30 px-3 py-1 rounded-full ml-2">
                          <Text className="text-white text-xs font-medium">POPULAR</Text>
                        </View>
                      </View>
                      <Text className="text-white text-base font-bold mb-2 tracking-tight">{trip.name}</Text>
                      <View className="flex-row items-center">
                        <MaterialIcons name="location-on" size={16} color="rgba(255,255,255,0.8)" />
                        <Text className="text-white/80 text-xs font-medium ml-1">{trip.location}</Text>
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {/* Nature-Inspired Quick Actions with Animations (kept original styles) */}
        <View className="px-6 pb-12">
          <Text className="text-base font-bold text-gray-900 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-1 w-[30%] mr-3 h-41" onPress={() => router.push("/(dashboard)/trips/new")} style={{ backgroundColor: '#059669', borderRadius: 18, padding: 20, shadowColor: '#059669', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6, overflow: 'hidden' }} activeOpacity={0.85}>
              <LinearGradient colors={['#10B981', '#059669', '#047857']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18 }} />
              <View style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 40 }} />
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                <MaterialIcons name="add-location" size={26} color="white" />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>Plan Trip</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 6, marginTop: 2 }}>New adventure</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[30%] mr-3" onPress={() => router.push("/(dashboard)/trips")} activeOpacity={0.85} style={{ backgroundColor: '#0369A1', borderRadius: 18, padding: 18, shadowColor: '#0369A1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6, overflow: 'hidden' }}>
              <LinearGradient colors={['#0EA5E9', '#0369A1', '#1E40AF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18 }} />
              <View style={{ position: 'absolute', bottom: -10, left: -10, width: 60, height: 60, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: 30 }} />
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                <MaterialIcons name="explore" size={24} color="white" />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>Explore Trip</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 6 }}>Discover</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[30%]" onPress={() => router.push("/(dashboard)/trips/gallery")} activeOpacity={0.85} style={{ backgroundColor: '#B45309', borderRadius: 18, padding: 18, shadowColor: '#B45309', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6, overflow: 'hidden' }}>
              <LinearGradient colors={['#F59E0B', '#D97706', '#B45309']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18 }} />
              <View style={{ position: 'absolute', top: -15, right: -15, width: 50, height: 50, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 25 }} />
              <View style={{ position: 'absolute', bottom: -5, left: -5, width: 30, height: 30, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15 }} />
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                <MaterialIcons name="camera-alt" size={24} color="white" />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>Gallery Trip</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 6, marginTop: 1 }}>Memories</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;



//
// import { View, Text, ScrollView, ImageBackground, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from "react-native";
// import React, { useEffect, useState } from "react";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { getAllPlans } from "@/services/planService";
// import { Plan } from "@/types/plan";
//
// const { width } = Dimensions.get('window');
//
// const Home = () => {
//   const router = useRouter();
//   const [trips, setTrips] = useState<Plan[]>([]);
//
//   const fetchTrips = async () => {
//     try {
//       const data = await getAllPlans();
//       setTrips(data);
//     } catch (err) {
//       console.log("Error fetching trips:", err);
//     }
//   };
//
//   useEffect(() => {
//     fetchTrips();
//   }, []);
//
//   const upcomingTrips = trips.filter((trip) => new Date(trip.startDate) >= new Date());
//   const favoriteTrips = trips.filter((trip) => trip.favorite);
//
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };
//
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//       <ScrollView showsVerticalScrollIndicator={false} className="flex-1" bounces={true}>
//         {/* Enhanced Premium Header */}
//         <LinearGradient colors={['#ffffff', '#f8fafc', '#e2e8f0']} className="px-6 pt-12 pb-8 rounded-b-3xl" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8, }}>
//           {/* Top Navigation Bar */}
//           <View className="flex-row justify-between items-center mb-8 mx-4">
//             <View className="flex-1">
//               <View className="flex-row items-center mb-2">
//                 <Text className="text-xs text-gray-500 font-medium">{getGreeting()}</Text>
//                 <View className="w-2 h-2 bg-green-500 rounded-full ml-2" />
//               </View>
//               <Text className="text-xl font-bold text-gray-900 tracking-tight mb-1">Explorer</Text>
//               <Text className="text-xs text-gray-600 font-medium">Ready for your next adventure?</Text>
//             </View>
//             <View className="flex-row items-center space-x-3">
//               {/* Weather Widget */}
//               <TouchableOpacity className="w-12 h-12 bg-white/80 rounded-2xl items-center justify-center backdrop-blur-sm mr-3" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.8)", marginRight: 12 }} activeOpacity={0.8}>
//                 <MaterialIcons name="wb-sunny" size={22} color="#F59E0B" />
//               </TouchableOpacity>
//               {/* Notifications */}
//               <TouchableOpacity className="w-12 h-12 bg-white rounded-2xl items-center justify-center relative mr-3" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, }} activeOpacity={0.8}>
//                 <MaterialIcons name="notifications-none" size={24} color="#1F2937" />
//                 <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
//                   <Text className="text-white text-xs font-bold">3</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* Travel Stats Cards */}
//          <View className="flex-row justify-between mb-6 mx-0 w-[95%] ">
//             <View className="bg-white/100 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1 mr-2 " style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)', }}>
//               <View className="flex-row items-center">
//                 <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
//                   <MaterialIcons name="flight" size={16} color="#3B82F6" />
//                 </View>
//                 <View>
//                   <Text className="text-base font-bold text-gray-900">{trips.length}</Text>
//                   <Text className="text-xs text-gray-600 font-medium  -ml-3 " style={{ fontSize: 7 }}> Total Trips</Text>
//                 </View>
//               </View>
//             </View>
//             <View className="bg-white/100 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1 mx-1" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)', }}>
//               <View className="flex-row items-center">
//                 <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
//                   <MaterialIcons name="schedule" size={16} color="#10B981" />
//                 </View>
//                 <View>
//                   <Text className="text-base font-bold text-gray-900">{upcomingTrips.length}</Text>
//                   <Text className="text-xs text-gray-600 font-medium  -ml-2" style={{ fontSize: 7 }}>Upcoming</Text>
//                 </View>
//               </View>
//             </View>
//             <View className="bg-white/100 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1 ml-2" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)', }}>
//               <View className="flex-row items-center">
//                 <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-3">
//                   <MaterialIcons name="favorite" size={16} color="#EF4444" />
//                 </View>
//                 <View>
//                   <Text className="text-base font-bold text-gray-900">{favoriteTrips.length}</Text>
//                   <Text className="text-xs text-gray-600 font-medium -ml-2" style={{ fontSize: 7 }}>Favorites</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//           {/* Enhanced Search Bar with AI Assistant */}
//           <TouchableOpacity className="bg-white rounded-2xl px-6 py-1 w-[95%] self-center mb-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 6, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.05)', }}>
//             <View className="flex-row items-center">
//               <LinearGradient colors={['#3B82F6', '#1D4ED8']} className="w-8 h-8 rounded-full items-center justify-center mr-4">
//                 <MaterialIcons name="auto-awesome" size={20} color="white" />
//               </LinearGradient>
//               <View className="flex-1 mt-1">
//                 <Text className="text-gray-900 text-xs font-semibold mb-1">Search </Text>
//                 <Text className="text-gray-500 text-xs font-medium">${"Your Vacation Here"}</Text>
//                 <Text className="text-gray-400 text-xs mt-1"></Text>
//               </View>
//               <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
//                 <MaterialIcons name="mic" size={20} color="#6B7280" />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           {/* Quick Action Pills */}
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }} className="mb-2">
//             <View className="flex-row space-x-3 ">
//               <TouchableOpacity className="mx-1 bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2 rounded-full flex-row items-center" style={{ backgroundColor: '#8B5CF6', shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3, }}>
//                 <MaterialIcons name="explore" size={16} color="white" />
//                 <Text className="text-white font-semibold text-xs ml-2">Discover</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className=" mx-1 bg-white px-4 py-2 rounded-full flex-row items-center border border-gray-200" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, }}>
//                 <MaterialIcons name="local-offer" size={16} color="#059669" />
//                 <Text className="text-gray-700 font-semibold text-xs ml-2">Deals</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="mx-1 bg-white px-4 py-2 rounded-full flex-row items-center border border-gray-200" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, }}>
//                 <MaterialIcons name="trending-up" size={16} color="#F59E0B" />
//                 <Text className="text-gray-700 font-semibold text-xs ml-2">Trending</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="mx-1 bg-white px-4 py-2 rounded-full flex-row items-center border border-gray-200" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, }}>
//                 <MaterialIcons name="group" size={16} color="#3B82F6" />
//                 <Text className="text-gray-700 font-semibold text-xs ml-2">Groups</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </LinearGradient>
//         {/* Hero Trip Card */}
//         {upcomingTrips.length > 0 && (
//           <View className="px-6 mb-8 mt-6">
//             <View className="flex-row items-center justify-between mb-6">
//               <Text className="text-base font-bold text-gray-900 tracking-tight">Your Next Adventure</Text>
//               <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full">
//                 <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
//                 <Text className="text-green-700 text-xs font-semibold font-medium">UPCOMING</Text>
//               </View>
//             </View>
//             <TouchableOpacity onPress={() => router.push(`/(dashboard)/trips/${upcomingTrips[0].id}`)} style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 10, }}>
//               <ImageBackground source={{ uri: upcomingTrips[0].image }} className="h-72 rounded-3xl overflow-hidden" resizeMode="cover">
//                 <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.7)"]} locations={[0, 0.4, 1]} className="flex-1 justify-end p-6">
//                   <View className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', }}>
//                     <Text className="text-white text-lg font-bold mb-3 tracking-tight">{upcomingTrips[0].name}</Text>
//                     <View className="flex-row items-center">
//                       <MaterialIcons name="schedule" size={18} color="rgba(255,255,255,0.9)" />
//                       <Text className="text-white/90 text-sm font-medium ml-2">{new Date(upcomingTrips[0].startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{" "} - {new Date(upcomingTrips[0].endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
//                     </View>
//                   </View>
//                 </LinearGradient>
//               </ImageBackground>
//             </TouchableOpacity>
//           </View>
//         )}
//         {/* Beautiful Popular Destinations */}
//         <View className="mb-8">
//           <View className="flex-row justify-between items-center mb-6 px-6">
//             <Text className="text-base font-bold text-gray-900 tracking-tight">Popular Destinations</Text>
//             <TouchableOpacity onPress={() => router.push("/(dashboard)/popular-destinations")} className="bg-green-500 px-5 py-2 rounded-full">
//               <Text className="text-white font-semibold text-xs">See All</Text>
//             </TouchableOpacity>
//           </View>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 48 }} decelerationRate="fast">
//             {favoriteTrips.length === 0 ? (
//               <View className="w-80 h-52 bg-white rounded-3xl items-center justify-center border border-gray-200" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3, }}>
//                 <MaterialIcons name="favorite-border" size={48} color="#D1D5DB" />
//                 <Text className="text-gray-500 font-semibold mt-4 text-base">No favorite trips yet</Text>
//                 <Text className="text-gray-400 text-xs mt-2 text-center px-4">Mark trips as favorite to see them here</Text>
//               </View>
//             ) : (
//               favoriteTrips.map((trip, index) => (
//                 <TouchableOpacity key={trip.id} className="mr-4" style={{ width: width * 0.8, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8, }} onPress={() => router.push(`/(dashboard)/trips/${trip.id}`)}>
//                   <ImageBackground source={{ uri: trip.image }} className="h-52 rounded-3xl overflow-hidden" resizeMode="cover">
//                     <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]} className="flex-1 justify-end p-6">
//                       <View className="flex-row items-center mb-3">
//                         <MaterialIcons name="favorite" size={16} color="#EF4444" />
//                         <View className="bg-black/30 px-3 py-1 rounded-full ml-2">
//                           <Text className="text-white text-xs font-medium">POPULAR</Text>
//                         </View>
//                       </View>
//                       <Text className="text-white text-base font-bold mb-2 tracking-tight">{trip.name}</Text>
//                       <View className="flex-row items-center">
//                         <MaterialIcons name="location-on" size={16} color="rgba(255,255,255,0.8)" />
//                         <Text className="text-white/80 text-xs font-medium ml-1">{trip.location}</Text>
//                       </View>
//                     </LinearGradient>
//                   </ImageBackground>
//                 </TouchableOpacity>
//               ))
//             )}
//           </ScrollView>
//         </View>
//         {/* Nature-Inspired Quick Actions with Animations */}
//         <View className="px-6 pb-12">
//           <Text className="text-base font-bold text-gray-900 mb-4">Quick Actions</Text>
//           <View className="flex-row justify-between">
//             <TouchableOpacity className="flex-1 w-[30%] mr-3 h-41" onPress={() => router.push("/(dashboard)/trips/new")} style={{ backgroundColor: '#059669', borderRadius: 18, padding: 20, shadowColor: '#059669', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6, overflow: 'hidden', }} activeOpacity={0.85}>
//               <LinearGradient colors={['#10B981', '#059669', '#047857']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, }} />
//               <View style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 40, }} />
//               <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)', }}>
//                 <MaterialIcons name="add-location" size={26} color="white" />
//               </View>
//               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>Plan Trip</Text>
//               <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 6, marginTop: 2 }}>New adventure</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="w-[30%] mr-3"  onPress={() => router.push("/(dashboard)/trips")} activeOpacity={0.85} style={{ backgroundColor: '#0369A1', borderRadius: 18, padding: 18, shadowColor: '#0369A1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6, overflow: 'hidden', }}>
//               <LinearGradient colors={['#0EA5E9', '#0369A1', '#1E40AF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, }} />
//               <View style={{ position: 'absolute', bottom: -10, left: -10, width: 60, height: 60, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: 30, }} />
//               <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)', }}>
//                 <MaterialIcons name="explore" size={24} color="white" />
//               </View>
//               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>Explore Trip</Text>
//               <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 6 }}>Discover</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="w-[30%]"  onPress={() => router.push("/(dashboard)/trips/gallery")} activeOpacity={0.85} style={{ backgroundColor: '#B45309', borderRadius: 18, padding: 18, shadowColor: '#B45309', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6, overflow: 'hidden', }}>
//               <LinearGradient colors={['#F59E0B', '#D97706', '#B45309']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, }} />
//               <View style={{ position: 'absolute', top: -15, right: -15, width: 50, height: 50, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 25, }} />
//               <View style={{ position: 'absolute', bottom: -5, left: -5, width: 30, height: 30, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, }} />
//               <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)', }}>
//                 <MaterialIcons name="camera-alt" size={24} color="white" />
//               </View>
//               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>Gallery Trip</Text>
//               <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 6, marginTop: 1 }}>Memories</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
//
// export default Home;