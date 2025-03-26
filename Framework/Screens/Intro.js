import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Theme } from "../Components/Theme";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const slides = [
    {
        id: "1",
        title: "Welcome to \nkọntaktị",
        content: "Build a network of business contacts without people losing or misplacing your business card.",
        showButton: false,
    },
    {
        id: "2",
        title: "Instant \nAccess",
        content: "People who hold your card have instant access to your business's social media and website links.",
        showButton: false,
    },
    {
        id: "3",
        title: "Multiple \nCards",
        content: "You can create more than one card if you have multiple jobs or manage more than one business.",
        showButton: false,
    },
    {
        id: "4",
        title: "Track Your \nNetwork",
        content: "Get a count of the number of people holding your card.",
        showButton: false,
    },
    {
        id: "5",
        title: "Secure \nSharing",
        content: "Your card cannot be shared without your authorization. So entertain peace of mind.",
        showButton: true,
    },
];

export function Intro({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems[0] != null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                    {item.showButton && (
                        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    const Pagination = () => {
        return (
            <View style={styles.paginationContainer}>
                {slides.map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 20, 8],
                        extrapolate: "clamp",
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                { width: dotWidth, opacity },
                            ]}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 1.5, y: 0 }} end={{ x: 0, y: 1.5 }}
                colors={[Theme.colors.primary, "#ffffff", "#ffffff", Theme.colors.primary + 60, "#ffffff", "#ffffff", "#ffffff",]}
                style={{ flex: 1, }}
            >
                <StatusBar style="dark" />
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                />
                <Pagination />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    slide: {
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    contentContainer: {
        // backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        width: "100%",
    },
    title: {
        fontSize: 50,
        fontFamily: Theme.fonts.text700,
        color: "#333",
        marginBottom: 20,
    },
    content: {
        fontSize: 30,
        color: Theme.colors.text1,
        lineHeight: 40,
        marginBottom: 30,
        fontFamily: Theme.fonts.text400
    },
    button: {
        backgroundColor: Theme.colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    paginationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 50,
        alignSelf: "center",
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: Theme.colors.primary,
        marginHorizontal: 3,
    },
});