import React, { use, useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../global/globalVariables';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../Components/Theme';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/settings';
import { errorMessage } from '../Components/formatErrorMessage';

export function EditProfile() {
    const { userUID, userInfo, setPreloader } = useContext(AppContext)
    const navigation = useNavigation();
    const [firstname, setFirstName] = useState(userInfo.firstname);
    const [lastname, setLastName] = useState(userInfo.lastname);
    const [email, setEmail] = useState(userInfo.email);
    const [image, setImage] = useState(userInfo.image);
    const [phone, setPhoneNumber] = useState(userInfo.phone);
    const [address, setAddress] = useState(userInfo.address);
    const [bio, setBio] = useState(userInfo.bio);

    // useEffect(() => {
    //     console.log(userUID);

    // }, []);

    function handleSave() {
        setPreloader(true);
        updateDoc(doc(db, "users", userUID), {
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
                    <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: Theme.colors.primary, padding: 5, borderRadius: 50 }} onPress={() => { /* Handle image picker */ }}>
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