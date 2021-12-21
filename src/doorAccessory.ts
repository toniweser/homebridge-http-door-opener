import {Service, PlatformAccessory, CharacteristicValue, Characteristic} from 'homebridge';

import { ExampleHomebridgePlatform } from './platform';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class DoorAccessory {
  private service: Service;

  private doorStateLocked = this.platform.Characteristic.LockTargetState.SECURED;

  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');


    // get the LightBulb service if it exists, otherwise create a new LightBulb service
    // you can create multiple services for each accessory
    this.service =
        this.accessory.getService(this.platform.Service.LockMechanism) ||
        this.accessory.addService(this.platform.Service.LockMechanism);

    // set the service name, this is what is displayed as the default name on the Home app
    // in this example we are using the name we stored in the `accessory.context` in the `discoverDevices` method.
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb

    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.LockCurrentState)
      .onGet(this.handleLockCurrentStateGet.bind(this)); // GET - bind to the `getOn` method below;

    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.LockTargetState)
      .onGet(this.handleLockTargetStateGet.bind(this)) // GET - bind to the `getOn` method below
      .onSet(this.handleLockTargetStateSet.bind(this));
  }

  /**
   * Handle requests to get the current value of the "Lock Current State" characteristic
   */
  async handleLockCurrentStateGet(): Promise<CharacteristicValue> {
    this.platform.log.debug('Triggered GET LockCurrentState');

    let currentValue;

    if (this.doorStateLocked === 1) {
      return this.platform.Characteristic.LockCurrentState.SECURED;
    } else {
      return this.platform.Characteristic.LockCurrentState.UNSECURED;
    }
  }


  /**
   * Handle requests to get the current value of the "Lock Target State" characteristic
   */
  async handleLockTargetStateGet(): Promise<CharacteristicValue> {
    this.platform.log.debug('Triggered GET LockTargetState');

    return this.doorStateLocked;

  }

  /**
   * Handle requests to set the "Lock Target State" characteristic
   */
  async handleLockTargetStateSet(value) {
    let valueToSet;
    if (value === 0) {
      valueToSet = this.platform.Characteristic.LockTargetState.SECURED;
      this.platform.log.debug('////// value === 0');
    } else {
      valueToSet =this.platform.Characteristic.LockTargetState.SECURED;
      this.platform.log.debug('////// value === 1');
    }
    this.doorStateLocked = valueToSet;
    this.platform.log.debug('Triggered SET LockTargetState:' + value);
  }

}
