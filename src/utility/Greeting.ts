export const getGreeting = (): string => {
    const hours = new Date().getHours(); // Get current hour (0-23)

    if (hours >= 5 && hours < 12) {
      return 'Good Morning';
    } else if (hours >= 12 && hours < 18) {
      return 'Good Afternoon';
    } else if (hours >= 18 && hours < 22) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };