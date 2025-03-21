import { ToastAndroid } from "react-native";
import Toast from "react-native-root-toast";

export function ToastApp(message, duration) {
    Toast.show(message, {
        duration: Toast.durations[duration || "SHORT"],
    });
}