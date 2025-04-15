export const useTime =  (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    let newMinutes = minutes + 15;
    let newHours = hours;

    if (newMinutes >= 60) {
        newHours += 1;
        newMinutes -= 60;
    }

    if (newHours >= 24) {
        newHours = 0;
    }

    const formattedHours = newHours.toString().padStart(2, "0");
    const formattedMinutes = newMinutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
};
