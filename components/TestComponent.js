import * as React from 'react';
import {Text, View} from 'react-native';

export function TestComp(props) {
  return <Text style={[props.style, { fontFamily: 'space-mono' }]} />;
}
