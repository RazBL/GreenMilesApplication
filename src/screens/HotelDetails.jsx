import React, { useContext,useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Button, useTheme, Headline } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UsersContext } from '../context/UsersContext'; 
import { HotelsContext } from '../context/HotelsContext';



const HotelDetails = ({ route }) => {
  const { SaveHotel, RemoveSavedHotel, currentUser } = useContext(UsersContext); // Get the functions and currentUser from UsersContext
  const { hotel } = route.params;
  const navigation = useNavigation();
  const theme = useTheme();

  const handleBookNow = () => {
    if(currentUser)
      navigation.navigate('HotelCheckOut', { hotel });
    else{
      alert('You must login in order to book');
      navigation.navigate('Login');
    }
  };


  const [saved, SetSaved] = useState(false);

  //Start state of the heart icon.
  const isHotelSaved = (currentUser, hotelId) => {
    if (!currentUser || !currentUser.savedHotels) {
      return false;
    }
    let savedHotels = currentUser.savedHotels;
    let hotelFound = savedHotels.find(id => hotelId === id);
    if (hotelFound) {
      SetSaved(true);
    }
    else
      SetSaved(false);
  };

  const hotelSaveHandler = () => {

    if (!currentUser){
      alert("You must login in order to save");
      return;
    }

    let isSaved = currentUser.savedHotels.find(item => item == hotel._id)

    if (!isSaved) {
      SaveHotel(hotel, navigation);
      console.log('Hotel saved successfully!');
      SetSaved(true); // שנה את הערך ל־true כאשר משתמש לוחץ לשמור את המלון
    } else {
      RemoveSavedHotel(hotel);
      console.log('Hotel removed from favorites.');
      SetSaved(false); // שנה את הערך ל־false כאשר משתמש לוחץ להסיר את המלון
    }
  };


  useEffect(() => {
    console.log(hotel);
   isHotelSaved()

  }, [currentUser])

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).imageContainer}>
        <Image
          source={{
            uri:
              'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg',
          }}
          resizeMode="contain"
          style={styles(theme).image}
        />

        <TouchableOpacity style={styles(theme).heartContainer} onPress={() => setSaved(!saved)}>
          <MaterialCommunityIcons
             onPress={hotelSaveHandler}
            name={saved ? 'heart' : 'heart-outline'}
            color={saved ? '#1CD995' : 'white'}
            size={30}
          />
        </TouchableOpacity>

        <View style={styles(theme).hotelTitleBox}>
          <Headline style={styles(theme).hotelTitle}>{hotel.name} - {hotel.city}</Headline>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles(theme).hotelMiniTitle}>
              <Text style={[styles(theme).hotelMiniTitle, { color: theme.colors.primary }]}>Eco</Text> rating {hotel.eco_rating}/5</Text>
            <MaterialCommunityIcons
              name={'leaf'}
              color={theme.colors.primary}
              size={17}
              style={{ marginLeft: 5, transform: [{ rotate: '-17deg' }] }}
            />
              <MaterialCommunityIcons
                name={'leaf'}
                color={theme.colors.primary}
                size={17}
                style={{ transform: [{ rotate: '-17deg' }] }}
              />
            <MaterialCommunityIcons
              name={'leaf'}
              color={theme.colors.primary}
              size={17}
              style={{ transform: [{ rotate: '-17deg' }] }}
            />
            <MaterialCommunityIcons
              name={'leaf'}
              color={theme.colors.primary}
              size={17}
              style={{ transform: [{ rotate: '-17deg' }] }}
            />
            <MaterialCommunityIcons
              name={'leaf'}
              color={theme.colors.primary}
              size={17}
              style={{ transform: [{ rotate: '-17deg' }] }}
            />
            <MaterialCommunityIcons
              name={'leaf'}
              color={'white'}
              size={17}
              style={{ transform: [{ rotate: '-17deg' }] }}
            />
          </View>
        </View>

        <View style={styles(theme).infoContainer}>
          <Text style={styles(theme).infoTitle}>Address </Text>
          <Text style={styles(theme).info}>{hotel.address}</Text>

          <Text style={styles(theme).infoTitle}>Description</Text>
          <Text style={styles(theme).info}>{hotel.description}</Text>

          <Text style={styles(theme).price}>Price per night</Text>
          <Text style={[styles(theme).price, { fontFamily: 'Montserrat_Medium', fontSize: 17 }]}>${hotel.price_per_night}</Text>
        </View>
      </View>
      <Button
        style={styles(theme).bookNowButton}
        labelStyle={{ color: 'white', fontFamily: 'Montserrat_Bold', fontSize: 15 }}
        onPress={handleBookNow}
      >
        Book Now
      </Button>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 20,
      flex: 1,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      height: 215,
      borderRadius: 10,
      width: '100%',
      alignSelf: 'center',
    },
    hotelTitleBox: {
      backgroundColor: '#1E272E',
      width: '85%',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      position: 'absolute',
      alignSelf: 'center',
      top: 170,
    },
    hotelTitle: {
      fontSize: 20,
      fontFamily: 'Montserrat_Bold',
      color: 'white',
    },
    hotelMiniTitle: {
      fontSize: 15,
      fontFamily: 'Montserrat_Bold',
      color: 'white',
      marginBottom: 7,
    },
    heartContainer: {
      backgroundColor: 'rgba(24, 18, 13, 0.6)',
      position: 'absolute',
      padding: 5,
      borderRadius: 50,
      right: 20,
      top: 10,
    },
    infoContainer: {
      marginTop: 50,
      alignItems: 'flex-start',
    },
    infoTitle: {
      fontSize: 15,
      fontFamily: 'Montserrat_Bold',
      marginBottom: 10,
      textAlign: 'left',
    },
    info: {
      fontSize: 12,
      fontFamily: 'Montserrat_Medium',
      marginBottom: 10,
      textAlign: 'left',
    },
    price: {
      fontSize: 15,
      fontFamily: 'Montserrat_Bold',
      marginBottom: 10,
      textAlign: 'left',
      color: '#02304B',
    },
    bookNowButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: '#38DDA2',
      fontFamily: 'Montserrat_Bold'
    },
  });

export default HotelDetails;
