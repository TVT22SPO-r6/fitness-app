import AsyncStorage from "@react-native-async-storage/async-storage";

const deleteEvent = async (eventToDelete) => {
    try {
        const eventsString = await AsyncStorage.getItem("@events");
        if (eventsString !== null) {
            const events = JSON.parse(eventsString);
            const updatedEvents = events.filter(
                (event) => event.eventDateTime !== eventToDelete.eventDateTime
            );
            await AsyncStorage.setItem("@events", JSON.stringify(updatedEvents));
            console.log("Event removed successfully:", eventToDelete);
        }
    } catch (error) {
        console.error("Error removing event:", error);
        throw error;
    }
};

export default deleteEvent;
