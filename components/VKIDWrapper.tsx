import { Component } from 'react';
import { Button } from 'react-bootstrap';
//import { Config, OneTap } from '@vkid/sdk';
//import * as VKID from '@vkid/sdk'; 

export class VKIDWrapper extends Component<object, object> {

  render() {
    return (
      <>
      <div id="VkIdSdkOneTap" />
      <Button>VKIDWrapper</Button>
      </>
    )
  }
}