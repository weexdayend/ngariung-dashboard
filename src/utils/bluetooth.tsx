import React, { useState } from 'react';

declare global {
  interface Navigator {
    bluetooth: Bluetooth;
  }
}

interface Bluetooth {
  requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice>;
}

interface RequestDeviceOptions {
  filters: BluetoothRequestDeviceFilter[];
}

interface BluetoothRequestDeviceFilter {
  name?: string;
  services?: BluetoothServiceUUID[];
}

type BluetoothServiceUUID = string;

interface BluetoothDevice extends EventTarget {
  gatt?: BluetoothRemoteGATTServer;
}

interface BluetoothRemoteGATTServer {
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  getPrimaryServices(service?: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService[]>;
}

interface BluetoothRemoteGATTService {
  properties: BluetoothCharacteristicProperties;
  writeValue(value: ArrayBuffer): Promise<void>;
  getCharacteristics(characteristic?: BluetoothCharacteristicUUID): Promise<any[]>;
}

interface BluetoothCharacteristicProperties {
  broadcast: boolean;
  read: boolean;
  writeWithoutResponse: boolean;
  write: boolean;
  notify: boolean;
  indicate: boolean;
  authenticatedSignedWrites: boolean;
  reliableWrite: boolean;
  writableAuxiliaries: boolean;
}

interface BluetoothCharacteristicUUID {
  characteristic: string;
}

function BluetoothComponent() {
  const [message, setMessage] = useState('');
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTService | null>(null); // Track the selected characteristic

  async function connectToBluetoothDevice() {
    try {
      const selectedDevice = await navigator.bluetooth.requestDevice({
        filters: [
          { name: 'RPP02N' },
          {
            services: [
              'bef8d6c9-9c21-4c9e-b632-bd58c1009f9f',
              '00002af0-0000-1000-8000-00805f9b34fb'
            ]
          }
        ],
      });

      const gattServer = await selectedDevice.gatt?.connect();
      setDevice(selectedDevice);

      if (gattServer) {
        const services = await gattServer.getPrimaryServices();
  
        if (services.length === 0) {
          setMessage('No services found in device.');
        } else {
          for (const service of services) {
            const characteristics = await service.getCharacteristics();
            for (const characteristic of characteristics) {
              await inspectCharacteristic(characteristic);
            }
          }
          setMessage('Connected to Bluetooth device successfully');
        }

        setMessage('Connected to Bluetooth device successfully');
      }
    } catch (error) {
      console.error('Bluetooth connection error:', error);
      setMessage('Failed to connect to Bluetooth device');
    }
  }

  async function inspectCharacteristic(characteristic: BluetoothRemoteGATTService) {
    if (characteristic.properties.write) {
      setCharacteristic(characteristic); // Store the characteristic for later use
    }
  }

  async function printData() {
    try {
      if (characteristic?.properties.write) { // Check if the selected characteristic supports write
        const text = `
          Receipt
          --------
          Item 1: $10.00
          Item 2: $15.00
          Total: $25.00
          --------
          Thank you for your purchase!
        `;

        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        await characteristic.writeValue(data);
        console.log('Print operation successful');
      }
    } catch (error) {
      console.error('Error writing characteristic:', error);
    }
  }

  async function disconnectFromDevice() {
    try {
      if (device && device.gatt) {
        await device.gatt.disconnect(); // Ensure the disconnect is awaited
        setDevice(null);
        setMessage('Disconnected from Bluetooth device');
      }
    } catch (error) {
      console.error('Error disconnecting from device:', error);
    }
  }

  return (
    <div>
      <button onClick={() => connectToBluetoothDevice()}>Connect to Bluetooth Device</button>
      <p>{message}</p>
      <button onClick={() => printData()}>Test Print</button>
      <br />
      <button onClick={() => disconnectFromDevice()}>Disconnect from Bluetooth Device</button>
    </div>
  );
}

export default BluetoothComponent;
