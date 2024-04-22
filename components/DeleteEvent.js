import AsyncStorage from "@react-native-async-storage/async-storage";

const deleteEvent = async (event) => {
    try {
        const eventsString = await AsyncStorage.getItem("@events");
        if (eventsString !== null) {
            const events = JSON.parse(eventsString);
            const updatedEvents = events.filter((e) => e.eventDateTime !== event.eventDateTime);
            await AsyncStorage.setItem("@events", JSON.stringify(updatedEvents));
            console.log("Event removed successfully:", event);
        }
    } catch (error) {
        console.error("Error removing event:", error);
        throw error;
    }
};

export default deleteEvent;
