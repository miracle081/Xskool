
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Image, View, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faBook, faDownload, faBookOpen, faFilm,
    faPeopleGroup, faComment, faFunnelDollar,
    faBarsProgress, faContactCard
} from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../Components/Theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';

export function Home() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Image
                    source={require("../../assets/Xskool-v-gold.png")}
                    style={styles.logo}
                />
                <Text style={styles.welcomeText}>
                    Welcome to XSkool: Learn, Grow, Explore!
                </Text>
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
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    logo: {
        height: 180,
        width: 180,
        borderRadius: 30,
        marginBottom: 15,
    },
    welcomeText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        fontFamily: Theme.fonts.text600,
        marginBottom: 10,
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
    <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
}