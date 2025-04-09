import React, { useContext, useState, } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../global/globalVariables';
import { formatMoney } from '../Components/FormatMoney';
import { Theme } from '../Components/Theme';

export const Profile = () => {
    const { userUID, userInfo, setPreloader } = useContext(AppContext)
    const navigation = useNavigation();

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={{ uri: userInfo.image }}
                        defaultSource={require('../../assets/user.png')}
                        style={styles.profileImage}
                    />
                </View>
                <Text style={styles.name}>{userInfo.firstname} {userInfo.lastname}</Text>
                <TouchableOpacity style={styles.emailButton}>
                    <Text style={styles.emailText}>{userInfo.email}</Text>
                </TouchableOpacity>
            </View>

            <View style={{ margin: 20, borderColor: Theme.colors.line, borderWidth: 1, borderRadius: 10, padding: 10 }}>
                <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text500, }}>Wallet Balance</Text>

                        <Text style={{ fontSize: 13, fontFamily: Theme.fonts.text700, }}>₦<Text style={{ fontSize: 30 }}>{formatMoney(userInfo.balance)}</Text></Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("FundAccount")} style={{ alignItems: "center" }}>
                        <View style={{ backgroundColor: Theme.colors.primary + 20, borderRadius: 10, padding: 5 }}>
                            <Ionicons name="arrow-down" size={20} color={Theme.colors.primary} />
                        </View>
                        <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 14, color: Theme.colors.text1 }}>Add Funds</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.profileActions}>
                <TouchableOpacity style={styles.actionItem} onPress={handleEditProfile}>
                    <View style={styles.actionItemContent}>
                        <MaterialIcons name="edit" size={24} color="#007AFF" />
                        <Text style={styles.actionText}>Edit Profile</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} >
                    <View style={styles.actionItemContent}>
                        <MaterialIcons name="assignment-add" size={24} color="#007AFF" />
                        <Text style={styles.actionText}> AddCourses</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} >
                    <View style={styles.actionItemContent}>
                        <MaterialIcons name="settings" size={24} color="#007AFF" />
                        <Text style={styles.actionText}>Settings</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileImageContainer: {
        paddingTop: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    emailButton: {
        backgroundColor: '#e0f7fa',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    emailText: {
        fontSize: 16,
        color: '#007AFF',
    },
    profileActions: {
        marginTop: 10,
    },
    actionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    actionItemContent: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    actionText: {
        fontSize: 18,
        marginLeft: 10,
    },

});
