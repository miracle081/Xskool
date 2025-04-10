import React, { useContext, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Pressable,
} from "react-native";
import { TextInput, Menu, PaperProvider, } from "react-native-paper";
import { Theme } from "../Components/Theme";
import { AppContext } from "../../global/globalVariables";
import { Formik } from "formik";
import * as yup from "yup";
import { errorMessage } from "../Components/formatErrorMessage";
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/settings";
import { doc, setDoc } from "firebase/firestore";

const { width, height } = Dimensions.get('window');

const validation = yup.object({
    firstname: yup.string().required("First name is required").min(2).max(30),
    lastname: yup.string().required("Last name is required").min(2).max(30),
    phone: yup.string().required("Phone number is required").min(10).max(15),
    email: yup.string().required("Email is required").email("Enter a valid email").min(5).max(30),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(20),
    confirmPassword: yup.string()
        .required("Please confirm your password")
        .oneOf([yup.ref('password'), null], "Passwords must match"),
    address: yup.string().required("Address is required").min(5).max(100),
    // gender: yup.string().required("Please select a gender"),
});

export function SignUp({ navigation }) {
    const { setPreloader, setUserUID } = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#ffffff', Theme.colors.primary + 40]}
                style={styles.gradient}
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
                            initialValues={{
                                firstname: "",
                                lastname: "",
                                phone: "",
                                email: "",
                                password: "",
                                confirmPassword: "",
                                address: "",
                                gender: ""
                            }}
                            onSubmit={(values) => {
                                setPreloader(true);
                                createUserWithEmailAndPassword(auth, values.email, values.password)
                                    .then((userCredential) => {
                                        const user = userCredential.user.uid;
                                        //
                                        setDoc(doc(db, "Xusers", user), {
                                            firstname: values.firstname,
                                            lastname: values.lastname,
                                            phone: values.phone,
                                            email: values.email,
                                            address: values.address,
                                            gender: values.gender,
                                            balance: 0,
                                            image: null,
                                            createdAt: new Date().getTime(),
                                            userUID: user,
                                        }).then(() => {
                                            setPreloader(false);
                                            setUserUID(user);
                                            navigation.navigate("HomeScreen");
                                        }).catch(e => {
                                            setPreloader(false);
                                            console.log(e);
                                            Alert.alert("Registration Failed!", errorMessage(e.code));
                                        });
                                    })
                                    .catch(e => {
                                        setPreloader(false);
                                        console.log(e);
                                        Alert.alert("Registration Failed!", errorMessage(e.code));
                                    });
                            }}
                            validationSchema={validation}
                        >
                            {(prop) => {
                                return (
                                    <View style={styles.form}>
                                        <View style={styles.headerContainer}>
                                            <Text style={styles.header}>Create Account</Text>
                                            <Text style={styles.subheader}>
                                                Sign up to join YotaPoint
                                            </Text>
                                        </View>

                                        {/* First Name */}
                                        <View style={styles.inputContainer}>
                                            <View>
                                                <Feather name="user" size={20} color={Theme.colors.text2} />
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                label="First Name"
                                                mode="flat"
                                                contentStyle={styles.inputContent}
                                                underlineStyle={{ display: "none" }}
                                                activeUnderlineColor={Theme.colors.primary}
                                                onChangeText={prop.handleChange("firstname")}
                                                onBlur={prop.handleBlur("firstname")}
                                                value={prop.values.firstname}
                                                autoCorrect={false}
                                            />
                                        </View>
                                        {prop.touched.firstname && prop.errors.firstname && (
                                            <Text style={styles.error}>{prop.errors.firstname}</Text>
                                        )}

                                        {/* Last Name */}
                                        <View style={styles.inputContainer}>
                                            <View>
                                                <Feather name="user" size={20} color={Theme.colors.text2} />
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                label="Last Name"
                                                mode="flat"
                                                contentStyle={styles.inputContent}
                                                underlineStyle={{ display: "none" }}
                                                activeUnderlineColor={Theme.colors.primary}
                                                onChangeText={prop.handleChange("lastname")}
                                                onBlur={prop.handleBlur("lastname")}
                                                value={prop.values.lastname}
                                                autoCorrect={false}
                                            />
                                        </View>
                                        {prop.touched.lastname && prop.errors.lastname && (
                                            <Text style={styles.error}>{prop.errors.lastname}</Text>
                                        )}

                                        {/* Phone */}
                                        <View style={styles.inputContainer}>
                                            <View>
                                                <Feather name="phone" size={20} color={Theme.colors.text2} />
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                label="Phone Number"
                                                mode="flat"
                                                contentStyle={styles.inputContent}
                                                underlineStyle={{ display: "none" }}
                                                activeUnderlineColor={Theme.colors.primary}
                                                onChangeText={prop.handleChange("phone")}
                                                onBlur={prop.handleBlur("phone")}
                                                value={prop.values.phone}
                                                keyboardType="phone-pad"
                                            />
                                        </View>
                                        {prop.touched.phone && prop.errors.phone && (
                                            <Text style={styles.error}>{prop.errors.phone}</Text>
                                        )}

                                        {/* Email */}
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
                                                keyboardType="email-address"
                                            />
                                        </View>
                                        {prop.touched.email && prop.errors.email && (
                                            <Text style={styles.error}>{prop.errors.email}</Text>
                                        )}

                                        {/* Password */}
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
                                            />
                                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                                <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={Theme.colors.text2} />
                                            </TouchableOpacity>
                                        </View>
                                        {prop.touched.password && prop.errors.password && (
                                            <Text style={styles.error}>{prop.errors.password}</Text>
                                        )}

                                        {/* Confirm Password */}
                                        <View style={styles.inputContainer}>
                                            <View>
                                                <Feather name="lock" size={20} color={Theme.colors.text2} />
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                label="Confirm Password"
                                                mode="flat"
                                                contentStyle={styles.inputContent}
                                                underlineStyle={{ display: "none" }}
                                                activeUnderlineColor={Theme.colors.primary}
                                                onChangeText={prop.handleChange("confirmPassword")}
                                                onBlur={prop.handleBlur("confirmPassword")}
                                                value={prop.values.confirmPassword}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                secureTextEntry={!showConfirmPassword}
                                                theme={{ colors: { text: Theme.colors.text1, placeholder: Theme.colors.text2 } }}
                                            />
                                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color={Theme.colors.text2} />
                                            </TouchableOpacity>
                                        </View>
                                        {prop.touched.confirmPassword && prop.errors.confirmPassword && (
                                            <Text style={styles.error}>{prop.errors.confirmPassword}</Text>
                                        )}

                                        {/* Address */}
                                        <View style={styles.inputContainer}>
                                            <View>
                                                <Feather name="map-pin" size={20} color={Theme.colors.text2} />
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                label="Address"
                                                mode="flat"
                                                contentStyle={styles.inputContent}
                                                underlineStyle={{ display: "none" }}
                                                activeUnderlineColor={Theme.colors.primary}
                                                onChangeText={prop.handleChange("address")}
                                                onBlur={prop.handleBlur("address")}
                                                value={prop.values.address}
                                                multiline={true}
                                                numberOfLines={2}
                                            />
                                        </View>
                                        {prop.touched.address && prop.errors.address && (
                                            <Text style={styles.error}>{prop.errors.address}</Text>
                                        )}

                                        {/* Gender Dropdown */}
                                        <View style={styles.dropdownContainer}>
                                            <View style={styles.genderIconContainer}>
                                                <Feather name="users" size={20} color={Theme.colors.text2} />
                                            </View>
                                            <TouchableOpacity
                                                style={styles.dropdownButton}
                                                onPress={() => setMenuVisible(true)}
                                            >
                                                <Text style={[
                                                    styles.dropdownButtonText,
                                                    !prop.values.gender && { color: Theme.colors.text2 }
                                                ]}>
                                                    {prop.values.gender || "Select Gender"}
                                                </Text>
                                                <MaterialIcons name="arrow-drop-down" size={24} color={Theme.colors.text2} />
                                            </TouchableOpacity>

                                        </View>
                                        {prop.touched.gender && prop.errors.gender && (
                                            <Text style={styles.error}>{prop.errors.gender}</Text>
                                        )}

                                        <TouchableOpacity
                                            onPress={prop.handleSubmit}
                                            style={styles.signupButton}
                                        >
                                            <Text style={styles.signupButtonText}>Sign Up</Text>
                                        </TouchableOpacity>

                                        <Modal
                                            visible={menuVisible}
                                            transparent={true}
                                            animationType='slide'
                                        >
                                            <View style={{ flex: 1, backgroundColor: "#0000008b" }}>
                                                <Pressable onPress={() => setMenuVisible(false)} style={{ flex: 1 }}></Pressable>
                                                <View style={{ padding: 20, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                                    <View style={{ paddingBottom: 20, gap: 10 }}>
                                                        <TouchableOpacity style={[styles.dropdownButton, { flex: null }]} onPress={() => { prop.setFieldValue("gender", "Male"); setMenuVisible(false); }}>
                                                            <Text style={[styles.dropdownButtonText, { color: Theme.colors.text2 }]}>Male</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={[styles.dropdownButton, { flex: null }]} onPress={() => { prop.setFieldValue("gender", "Female"); setMenuVisible(false); }}>
                                                            <Text style={[styles.dropdownButtonText, { color: Theme.colors.text2 }]}>Female</Text>
                                                        </TouchableOpacity>
                                                        {/* <AppButton onPress={() => setMenuVisible(false)} style={{ marginTop: 20 }}>Close</AppButton> */}
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                );
                            }}
                        </Formik>
                    </View>

                    <View style={styles.socialLoginContainer}>
                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>Or sign up with</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialButtons}>
                            <TouchableOpacity style={styles.socialButton}>
                                <FontAwesomeIcon icon={faGoogle}
                                    style={styles.socialIcon}
                                />
                                <Text style={styles.socialButtonText}>Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialButton}>
                                <FontAwesomeIcon icon={faXTwitter}
                                    style={styles.socialIcon}
                                />
                                <Text style={styles.socialButtonText}>Twitter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        elevation: Platform.OS == "android" ? 5 : null,
    },
    form: {
        width: "100%",
    },
    headerContainer: {
        marginBottom: 20,
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
    dropdownContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        gap: 5,
        marginVertical: 8,
    },
    genderIconContainer: {
        paddingVertical: 18,
    },
    dropdownButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 56,
        borderWidth: 1,
        borderColor: "#e9ecef",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingLeft: 40,
    },
    dropdownButtonText: {
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text1,
        fontSize: 16,
    },
    signupButton: {
        backgroundColor: Theme.colors.primary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        shadowColor: Theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: Platform.OS == "android" ? 5 : null,
    },
    signupButtonText: {
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
        elevation: Platform.OS == "android" ? 2 : null,
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
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
    },
    loginText: {
        fontSize: 14,
        color: Theme.colors.text2,
        fontFamily: Theme.fonts.text400,
    },
    loginLink: {
        fontSize: 14,
        color: Theme.colors.primary,
        fontFamily: Theme.fonts.text600,
    },
});