class Booking {
  static async create(bookingData) {
    return {
      userId: bookingData.userId,
      roomId: bookingData.roomId,
      startDate: new Date(bookingData.startDate),
      endDate: new Date(bookingData.endDate),
      totalPrice: bookingData.totalPrice,
      status: 'confirmed', // confirmed, cancelled, completed
      notes: bookingData.notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static calculatePrice(pricePerHour, startDate, endDate) {
    const hours = (endDate - startDate) / (1000 * 60 * 60);
    return pricePerHour * hours;
  }
}

module.exports = Booking;
