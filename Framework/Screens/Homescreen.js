
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Image, View, Platform, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faBook, faDownload, faBookOpen, faFilm,
    faPeopleGroup, faComment, faFunnelDollar,
    faBarsProgress, faContactCard,
} from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../Components/Theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { Courses } from './Courses';

const carouselLinks = [
    "https://delete-accound.profiterworld.com/app-carousel-img/slide1.png",
    "https://delete-accound.profiterworld.com/app-carousel-img/slide2.png",
    "https://delete-accound.profiterworld.com/app-carousel-img/slide3.png",
    "https://delete-accound.profiterworld.com/app-carousel-img/slide4.png",
    "https://delete-accound.profiterworld.com/app-carousel-img/slide5.png",
];

function Home() {
    const screenWidth = Dimensions.get("screen").width


    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Image
                    source={require("../../assets/Xskool-v-gold.png")}
                    style={styles.logo}
                />
                <View>
                    <Text style={{ fontFamily: Theme.fonts.text600, fontSize: 18 }}>John Wick</Text>
                    <Text style={styles.welcomeText}>Learn, Grow, Explore!</Text>
                </View>
            </View>

            <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
                <Carousel
                    loop
                    width={screenWidth - 40}
                    height={170}
                    autoPlay={true}
                    data={carouselLinks}
                    style={{ borderRadius: 10 }}
                    scrollAnimationDuration={2000}
                    renderItem={({ index }) => (
                        <Image style={{ width: '100%', height: 170, borderRadius: 10, }} source={{ uri: carouselLinks[index] }} defaultSource={require("../../assets/slide4.png")} />
                    )}
                />
            </View>

            {/* Grid Menu Section */}
            <View style={styles.gridContainer}>
                {[
                    { icon: faBook, title: 'Courses' },
                    { icon: faDownload, title: 'Downloads' },
                    { icon: faBookOpen, title: 'Lectures' },
                    { icon: faFilm, title: 'Videos' },
                    { icon: faPeopleGroup, title: 'Communities' },
                    { icon: faBarsProgress, title: 'Progress' },
                    { icon: faComment, title: 'Testimonials' },
                    { icon: faFunnelDollar, title: 'Sponsorship' },
                    { icon: faContactCard, title: 'Support' }
                ].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.gridItem}
                    // You can add onPress handlers here later
                    >
                        <View style={styles.gridItemContent}>
                            <FontAwesomeIcon
                                icon={item.icon}
                                size={30}
                                color="#4A90E2"
                            />
                            <Text style={styles.gridItemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    headerContainer: {
        flexDirection: "row",
        gap: 5,
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Theme.colors.line
    },
    welcomeText: {
        fontSize: 13,
        color: Theme.colors.gray,
        fontFamily: Theme.fonts.text600,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    gridItem: {
        width: '30%',
        aspectRatio: 1,
        marginVertical: 7,
        borderRadius: 15,
        backgroundColor: '#F0F4F8',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        elevation: Platform.OS == "android" ? 5 : null,
    },
    gridItemContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    gridItemText: {
        marginTop: 8,
        fontSize: 14,
        color: '#4A90E2',
        fontFamily: Theme.fonts.text600,
        textAlign: 'center',
    },
});

const Tab = createBottomTabNavigator()

export function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if (route.name === 'Courses') {
                        iconName = focused ? 'book' : 'file-tray-full-outline';
                    }
                    else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    }
                    else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.gray,
                headerShown: false,
            })}
        >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Courses' component={Courses} />
            <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
    )
}