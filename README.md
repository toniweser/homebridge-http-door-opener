<p align="center">

<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="150">

</p>

# HTTP door opener - Homebridge Plugin

This is a small [Homebridge](https://homebridge.io/) plugin to open the front door of an apartment building using an
ESP32.

Apartment buildings often have an intercom system to open the main entrance door. To get rid of all the keys, this
plugin helps to open the door via Apple Home or even with the help of Siri.

# Install

```shell
npm i homebridge-http-button
```

# ESP32

When opening the door, an HTTP request is sent to the ESP32, which bypasses a switch on the intercom with the help of
a relay and finally opens the door. A short time later, the switch is automatically closed again.

The IP of the ESP32 and the path are configurable in the plugin settings

The wiring diagram of the ESP 32 (might be helpful) can be accessed [here](https://bit.ly/3Cj8KuG).

# Security aspects

The ESP32 for opening the door is located in a closed network and can only be accessed from there. And even if: The
door of the house is always open half the day anyway. So this should be fine ;-).

# Configuration

The plugin can be configured using the UI Settings or by adjusting the Homebridge config JSON file.

```JSON
{
  "name": "HTTP Button",
  "request_ip": "192.168.0.2",
  "path": "my-path",
  "platform": "HomebridgeHttpButton"
}
```

- **Request IP**: The IP (e.g. of your ESP32) to which the request will be sent (e.g. `192.168.0.2`)
- **Path**: The path of the request (e.g. `my-path`)

Example: If the IP is set to `192.168.0.1` and the path is set to `my-path`, the request will be sent
to `http://192.168.0.1/my-path`.