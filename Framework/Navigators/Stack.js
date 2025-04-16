import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "../Screens/Homescreen"
import { SignUp } from "../Screens/SignUp"
import { Login } from "../Screens/Login"
import { Intro } from "../Screens/Intro"
import { NavigationContainer } from "@react-navigation/native"
import { EditProfile } from "../Screens/EditProfile"
import { FundAccount } from "../Screens/FundAccount"
import { Pay } from "../Screens/Pay"
import { CourseDetails } from "../Screens/CourseDetails"
import { EnrolledCourses } from "../Screens/EnrolledCourses"

const Stack = createNativeStackNavigator()

export function StackNavigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"HomeScreen"}>
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "" }} />
                <Stack.Screen name="FundAccount" component={FundAccount} options={{ title: "" }} />
                <Stack.Screen name="Pay" component={Pay} options={{ title: "" }} />
                <Stack.Screen name="CourseDetails" component={CourseDetails} options={{ title: "Course Details" }} />
                <Stack.Screen name="EnrolledCourses" component={EnrolledCourses} options={{ title: "Enrolled Courses" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}   
