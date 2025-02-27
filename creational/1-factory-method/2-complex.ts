abstract class Apartment {
    private livingRooms: LivingRoom[] = []
    private bedRooms: BedRoom[] = []

    addLivingRooms (rooms: LivingRoom[]) {
        this.livingRooms.push(...rooms)
    }

    addBedRooms (rooms: BedRoom[]) {
        this.bedRooms.push(...rooms)
    }
}

abstract class Room {
    length: number
    width: number
    height: number

    constructor (length: number, width: number, height: number) {
        this.length = length
        this.width = width
        this.height = height
    }
}

abstract class RoomCreator {
    abstract factoryMethod(...args: unknown[]): Room
}

class MyApartment extends Apartment {}

class LivingRoom extends Room {
    tv: boolean

    constructor (length: number, width: number, height: number, tv: boolean) {
        super(length, width, height)
        this.tv = tv
    }
}

class BedRoom extends Room {
    bed: boolean

    constructor (length: number, width: number, height: number, bed: boolean) {
        super(length, width, height)
        this.bed = bed
    }
}

class LivingRoomCreator extends RoomCreator {
    factoryMethod (length: number, width: number, height: number, tv: boolean) {
        return new LivingRoom(length, width, height, tv)
    }
}

class BedRoomCreator extends RoomCreator {
    factoryMethod (length: number, width: number, height: number, tv: boolean) {
        return new BedRoom(length, width, height, tv)
    }
}




const app = new MyApartment()
const livingRoomCreator = new LivingRoomCreator()
const bedRoomCreator = new BedRoomCreator()

app.addLivingRooms([
    livingRoomCreator.factoryMethod(5, 6, 3, true),
])
app.addBedRooms([
    bedRoomCreator.factoryMethod(5, 3, 3, true),
    bedRoomCreator.factoryMethod(4, 4, 3, false),
])

console.dir(app)

