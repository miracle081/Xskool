import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "../Screens/Homescreen"
import { SignUp } from "../Screens/SignUp"
import { Login } from "../Screens/Login"
import { Intro } from "../Screens/Intro"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createNativeStackNavigator()

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro">
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
