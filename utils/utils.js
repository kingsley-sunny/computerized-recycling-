class Utils {
  static hasDateExpired(expirationDate) {
    // Create a Date object for the current date and time
    const currentDate = new Date();

    // Create a Date object for the given expiration date
    const dateToCheck = new Date(expirationDate);

    // Compare the dates
    return currentDate > dateToCheck;
  }
}

module.exports.Utils = Utils;
