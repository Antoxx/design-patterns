// Abstractions
abstract class DesignRoomFactory {
    abstract createWall (): Wall
    abstract createDoor (): Door
}

abstract class Wall {}
abstract class Door {}

// "Classic" factory
class ClassicDesignRoom extends DesignRoomFactory {
    createWall () {
        return new ClassicWall()
    }
    createDoor () {
        return new ClassicDoor()
    }
}

class ClassicWall {}
class ClassicDoor {}

// "Modern" factory
class ModernDesignRoom extends DesignRoomFactory {
    createWall () {
        return new ModernWall()
    }
    createDoor () {
        return new ModernDoor()
    }
}

class ModernWall {}
class ModernDoor {}

// Usage
class Room {
    factory: DesignRoomFactory

    walls: Wall[]
    door: Door

    constructor (factory: DesignRoomFactory) {
        this.factory = factory
    }

    populate () {
        this.walls = [
            this.factory.createWall(),
            this.factory.createWall(),
            this.factory.createWall(),
            this.factory.createWall()
        ]

        this.door = this.factory.createDoor()
    }
}

const classicRoom = new Room(new ClassicDesignRoom())
classicRoom.populate()
console.dir(classicRoom)

const modernRoom = new Room(new ModernDesignRoom())
modernRoom.populate()
console.dir(modernRoom)
