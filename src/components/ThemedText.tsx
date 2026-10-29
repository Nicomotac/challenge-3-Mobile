import React from 'react';
import { Text as NativeText, type TextProps } from 'react-native';
import { useTema } from '../Theme/themeContext';

export default function ThemedText({ style, ...props }: TextProps) {
  const { cores } = useTema();
  return <NativeText {...props} style={[{ color: cores.texto }, style]} />;
}
