class Room {
  static async create(roomData) {
    return {
      name: roomData.name,
      description: roomData.description,
      capacity: roomData.capacity,
      location: roomData.location,
      amenities: roomData.amenities || [],
      pricePerHour: roomData.pricePerHour,
      image: roomData.image || '',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

module.exports = Room;
