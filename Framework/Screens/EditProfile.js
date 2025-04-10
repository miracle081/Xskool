import React, { use, useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../global/globalVariables';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../Components/Theme';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/settings';
import { errorMessage } from '../Components/formatErrorMessage';
import * as Imagepicker from "expo-image-picker"
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { uploadImageToFirebase } from '../Firebase/firebaseStorageUpload';


export function EditProfile() {
    const { userUID, userInfo, setPreloader } = useContext(AppContext)
    const navigation = useNavigation();
    const [firstname, setFirstName] = useState(userInfo.firstname);
    const [lastname, setLastName] = useState(userInfo.lastname);
    const [email, setEmail] = useState(userInfo.email);
    const [image, setImage] = useState(null);
    const [phone, setPhoneNumber] = useState(userInfo.phone);
    const [address, setAddress] = useState(userInfo.address);
    const [bio, setBio] = useState(userInfo.bio);
    const [preVisibility, setpreVisibility] = useState(false);


    // useEffect(() => {
    //     console.log(userUID);

    // }, []);

    const previewModal = () => {
        setpreVisibility(!preVisibility);
    };

    async function picker() {
        const result = await Imagepicker.launchImageLibraryAsync({
            mediaType: Imagepicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })

        if (!result.canceled) {
            // console.log(JSON.stringify(result, null, 2));
            const { uri } = result.assets[0];
            setImage(uri)
            previewModal();
        }
    }

    function handleSave() {
        setPreloader(true);
        updateDoc(doc(db, "Xusers", userUID), {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            address: address,
            bio: bio,
        })
            .then(() => {
                setPreloader(false);
                navigation.goBack();
            })
            .catch(e => {
                setPreloader(false);
                console.log(e);
                Alert.alert("Access denied!", errorMessage(e.code));
            })
    };

    async function StartUploading() {
        const path = `profile/${userUID}`;
        const downloadURL = await uploadImageToFirebase(image, path)
        return downloadURL;
    }


    async function StartUpload() {
        try {
            setPreloader(true);
            const uploadedMedia = await StartUploading();
            await updateDoc(doc(db, "Xusers", userUID), {
                image: uploadedMedia,
            });

            setPreloader(false);
        } catch (error) {
            setPreloader(false);
            console.log(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>

            <View style={styles.profileImageContainer}>
                <View>
                    <Image
                        source={{ uri: userInfo.image }}
                        defaultSource={require('../../assets/user.png')}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity onPressIn={picker} style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: Theme.colors.primary, padding: 5, borderRadius: 50 }} onPress={() => { /* Handle image picker */ }}>
                        <MaterialIcons name="camera-alt" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={firstname}
                onChangeText={(inp) => setFirstName(inp)}

            />
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={lastname}
                onChangeText={setLastName}

            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                editable={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhoneNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.textArea}
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <Modal
                visible={preVisibility}
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Pressable style={{ flex: 1 }} onPress={previewModal} >
                    </Pressable>
                    <View style={{ backgroundColor: "#ffffff", height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: "flex-end", margin: 10 }}>
                            <TouchableOpacity onPress={previewModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color="grey"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "center", padding: 5, justifyContent: "center" }}>
                            <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 400, }} />
                        </View>
                        <TouchableOpacity onPress={() => { previewModal(); StartUpload() }}
                            style={{ backgroundColor: Theme.colors.primary, padding: 13, margin: 15, alignItems: "center", justifyContent: "center", borderRadius: 8, }}>
                            <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16, color: "white" }}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImageContainer: {
        paddingTop: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});