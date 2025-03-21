import React, { useContext, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Theme } from "../Components/Theme";
import { AppContext } from "../../global/globalVariables";
import { Formik } from "formik";
import * as yup from "yup";
import { errorMessage } from "../Components/formatErrorMessage";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import { signInWithEmailAndPassword, signInWithCredential, TwitterAuthProvider } from "firebase/auth";
// import { auth } from "../firebase/firebase";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const { width, height } = Dimensions.get('window');

const validation = yup.object({
    email: yup.string().required().email("Enter a valid email").min(5).max(30),
    password: yup.string().required().min(4).max(20),
});


export function Login({ navigation }) {
    const { setPreloader, setUserUID } = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleTwitterLogin = async () => {

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#ffffff', Theme.colors.primary + 40]}
                style={styles.gradient}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require("../../assets/logo.jpg")}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.card}>
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                onSubmit={(value) => {
                                    setPreloader(true);
                                    signInWithEmailAndPassword(auth, value.email, value.password)
                                        .then((data) => {
                                            setPreloader(false);
                                            setUserUID(data.user.uid);
                                            navigation.replace("HomeScreen");
                                        })
                                        .catch((e) => {
                                            setPreloader(false);
                                            Alert.alert("Access denied!", errorMessage(e.code));
                                        });
                                }}
                                validationSchema={validation}
                            >
                                {(prop) => {
                                    return (
                                        <View style={styles.form}>
                                            <View style={styles.headerContainer}>
                                                <Text style={styles.header}>Welcome Back</Text>
                                                <Text style={styles.subheader}>
                                                    Sign in to continue to YotaPoint
                                                </Text>
                                            </View>

                                            <View style={styles.inputContainer}>
                                                <View>
                                                    <Feather name="mail" size={20} color={Theme.colors.text2} />
                                                </View>
                                                <TextInput
                                                    style={styles.input}
                                                    label="Email Address"
                                                    mode="flat"
                                                    contentStyle={styles.inputContent}
                                                    underlineStyle={{ display: "none" }}
                                                    activeUnderlineColor={Theme.colors.primary}
                                                    onChangeText={prop.handleChange("email")}
                                                    onBlur={prop.handleBlur("email")}
                                                    value={prop.values.email}
                                                    autoCapitalize="none"
                                                    autoCorrect={false}
                                                // theme={{ colors: { text: Theme.colors.text1, placeholder: "gray" } }}
                                                />
                                            </View>
                                            {prop.touched.email && prop.errors.email && (
                                                <Text style={styles.error}>{prop.errors.email}</Text>
                                            )}

                                            <View style={styles.inputContainer}>
                                                <View>
                                                    <Feather name="lock" size={20} color={Theme.colors.text2} />
                                                </View>
                                                <TextInput
                                                    style={styles.input}
                                                    label="Password"
                                                    mode="flat"
                                                    contentStyle={styles.inputContent}
                                                    underlineStyle={{ display: "none" }}
                                                    activeUnderlineColor={Theme.colors.primary}
                                                    onChangeText={prop.handleChange("password")}
                                                    onBlur={prop.handleBlur("password")}
                                                    value={prop.values.password}
                                                    autoCapitalize="none"
                                                    autoCorrect={false}
                                                    secureTextEntry={!showPassword}
                                                    theme={{ colors: { text: Theme.colors.text1, placeholder: Theme.colors.text2 } }}
                                                // right={
                                                //     <TextInput.Icon
                                                //         icon={() => (
                                                //             <Feather
                                                //                 name={!showPassword ? "eye-off" : "eye"}
                                                //                 size={20}
                                                //                 color={Theme.colors.text2}
                                                //             />
                                                //         )}
                                                //         onPress={() => setShowPassword(!showPassword)}
                                                //     />
                                                // }
                                                />
                                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                                    <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={Theme.colors.text2} />
                                                </TouchableOpacity>
                                            </View>
                                            {prop.touched.password && prop.errors.password && (
                                                <Text style={styles.error}>{prop.errors.password}</Text>
                                            )}

                                            <TouchableOpacity
                                                style={styles.forgotContainer}
                                                onPress={() => navigation.navigate("ForgotPassword")}
                                            >
                                                <Text style={styles.forgotText}>Forgot password?</Text>
                                                <MaterialIcons
                                                    name="arrow-right-alt"
                                                    size={20}
                                                    color={Theme.colors.primary}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={prop.handleSubmit}
                                                style={styles.loginButton}
                                            >
                                                <Text style={styles.loginButtonText}>Login</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                            </Formik>
                        </View>

                        <View style={styles.socialLoginContainer}>
                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>Or login with</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <FontAwesomeIcon icon={faGoogle}
                                        style={styles.socialIcon}
                                    />
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleTwitterLogin}
                                    style={styles.socialButton}
                                >
                                    <FontAwesomeIcon icon={faXTwitter}
                                        style={styles.socialIcon}
                                    />
                                    <Text style={styles.socialButtonText}>Twitter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <Text style={styles.signupLink}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    gradient: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 20
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    form: {
        width: "100%",
    },
    headerContainer: {
        marginBottom: 30,
        alignItems: "center",
    },
    header: {
        fontSize: 26,
        fontFamily: Theme.fonts.text700,
        color: Theme.colors.text1,
        marginBottom: 8,
    },
    subheader: {
        fontSize: 16,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        gap: 5
    },
    input: {
        flex: 1,
        backgroundColor: "transparent",
        marginVertical: 8,
        height: 56,
    },
    inputContent: {
        borderRadius: 10,
        // backgroundColor: "#f8f9fa",
        borderWidth: 1,
        borderColor: "#e9ecef",
        color: Theme.colors.text1,
        paddingLeft: 40,
    },
    error: {
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.red,
        marginBottom: 10,
        fontSize: 12,
    },
    forgotContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 25,
    },
    forgotText: {
        fontSize: 14,
        color: Theme.colors.text1,
        fontFamily: Theme.fonts.text600,
    },
    loginButton: {
        backgroundColor: Theme.colors.primary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: Theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButtonText: {
        fontSize: 16,
        color: "white",
        fontFamily: Theme.fonts.text600,
    },
    socialLoginContainer: {
        marginTop: 30,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Theme.colors.line,
    },
    dividerText: {
        fontSize: 14,
        color: Theme.colors.text2,
        fontFamily: Theme.fonts.text600,
        marginHorizontal: 10,
    },
    socialButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    socialButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.colors.line,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialButtonText: {
        fontFamily: Theme.fonts.text500,
        fontSize: 14,
        color: Theme.colors.text1,
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
    },
    signupText: {
        fontSize: 14,
        color: Theme.colors.text2,
        fontFamily: Theme.fonts.text400,
    },
    signupLink: {
        fontSize: 14,
        color: Theme.colors.primary,
        fontFamily: Theme.fonts.text600,
    },
});