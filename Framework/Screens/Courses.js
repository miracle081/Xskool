import { SafeAreaView, StyleSheet, Text, ScrollView, TouchableOpacity, Image, View, Platform, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faBook, faDownload, faBookOpen, faFilm,
    faPeopleGroup, faComment, faFunnelDollar,
    faBarsProgress, faContactCard
} from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../Components/Theme';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import Carousel from 'react-native-reanimated-carousel';


export function Courses() {

    const screenWidth = Dimensions.get("screen").width



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={{ fontFamily: Theme.fonts.text600, fontSize: 20, paddingTop: 15, margin: 15 }}>AVAILABLE COURSES</Text>
                    <Text style={styles.welcomeText}>Learn, Grow, Explore!</Text>
                </View>

                <View style={styles.gridContainer}>
                    {[
                        { icon: faBook, title: "Web Development" },
                        { icon: faBook, title: 'Data Science' },
                        { icon: faBook, title: 'Cybersecurity' },
                        { icon: faBook, title: 'App Development' },
                        { icon: faBook, title: 'JavaScripts' },
                        { icon: faBook, title: 'HTML' },
                        { icon: faBook, title: 'CSS' },

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
                                    color='#4A90E2'
                                />
                                <Text style={styles.gridItemText}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
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
    welcomeText: {
        fontSize: 30,
        color: Theme.colors.gray,
        fontFamily: Theme.fonts.text600,
        margin: 15,
        paddingTop: -70,
    },
    gridContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    gridItem: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    gridItemContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        color: '#4A90E2',
    },
    gridItemText: {
        marginTop: 8,
        fontSize: 14,
        color: '#4A90E2',
        fontFamily: Theme.fonts.text600,
        textAlign: 'center',
    },
});