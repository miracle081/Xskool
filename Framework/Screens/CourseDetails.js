import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppContext } from '../../global/globalVariables'
import { Theme } from '../Components/Theme'
import { AppButton } from '../Components/AppButton'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase/settings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export function CourseDetails({ navigation, route }) {
    const { userUID, setUserUID, setCourses, courses, setUserInfo, userInfo, setPreloader } = useContext(AppContext)
    const { item } = route.params

    function enrollCourse(params) {
        setPreloader(true);
        // Check if user is already enrolled
        if (item.students.includes(userUID)) {
            setPreloader(false);
            Alert.alert("Already Enrolled", "You are already enrolled in this course", [
                { text: "OK", onPress: () => navigation.goBack() }
            ])
            return;
        }

        setTimeout(() => {
            updateDoc(doc(db, "Xcourses", item.docID), {
                students: [...item.students, userUID],
            }).then(() => {
                navigation.goBack();
                Alert.alert("Success", "You have successfully enrolled in this course", [
                    { text: "OK", onPress: () => { } }
                ])
            }).catch((error) => {
                setPreloader(false);
                console.log(error)
                alert("Error enrolling in course")
            })
        }, 1000);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, }}>
                <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: 240, }}
                />
                <View style={{ padding: 20, flex: 1 }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 15 }}>{item.title}</Text>
                    <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text400, marginTop: 15, color: Theme.colors.gray }}>{item.description}</Text>
                    <Text style={{ fontSize: 20, marginTop: 15 }}>Course Code: {item.code}</Text>
                    <Text style={{ fontSize: 20, marginTop: 15 }}>Course Duration: {item.duration} Weeks</Text>
                    <Text style={{ fontFamily: Theme.fonts.text400, marginTop: 10, textAlign: "right" }}>{item.students.length} Students Enrolled</Text>
                </View>
                <View style={{ padding: 20 }}>
                    {item.students.includes(userUID) ?
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10, backgroundColor: Theme.colors.green, borderRadius: 50 }}>
                            <FontAwesomeIcon icon={faCheckCircle} size={20} color="white" />
                            <Text style={{ fontFamily: Theme.fonts.text600, color: "white", marginLeft: 5, fontSize: 20 }}>Enrolled</Text>
                        </View>
                        :
                        <AppButton onPress={enrollCourse}>Enroll Now</AppButton>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})