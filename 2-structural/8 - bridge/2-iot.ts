// 1. Implementation

interface Protocol {
  connect (): void;
  sendCommand (command: string, args?: unknown[]): void;
}

class WiFiProtocol implements Protocol {
  connect () {
    console.log('Wi-Fi connection established')
  }

  sendCommand (command: string, args?: unknown[]) {
    console.log(`Sent via Wi-Fi: ${command}`, args)
  }
}

class BluetoothProtocol implements Protocol {
  connect () {
    console.log('Bluetooth connection established')
  }

  sendCommand (command: string, args?: unknown[]) {
    console.log(`Sent via Bluetooth: ${command}`, args)
  }
}

// 2. Abstraction

abstract class Device {
  constructor (protected id: string, protected protocol: Protocol) {}

  abstract turnOn (): void
  abstract turnOff (): void

  protected sendCommand (command: string, args?: unknown[]) {
    this.protocol.sendCommand(command, args)
  }
}

class Light extends Device {
  turnOn () {
    this.sendCommand('light.turn_on')
  }

  turnOff () {
    this.sendCommand('light.turn_off')
  }
}

class AirConditioner extends Device {
  turnOn () {
    this.sendCommand('')
  }

  turnOff () {
    this.sendCommand('')
  }

  setTemperature (temp: number) {
    this.sendCommand(`temp-set`, [temp]);
  }
}

// 3. Usage

const wifi = new WiFiProtocol()
const bluetooth = new BluetoothProtocol()

// Лампочка с Wi-Fi
const wifiLight = new Light('bedroom-light', wifi)
wifiLight.turnOn()

// Кондиционер с Bluetooth
const bluetoothAC = new AirConditioner('bedroom-ac', bluetooth)
bluetoothAC.turnOn()
bluetoothAC.setTemperature(23)
