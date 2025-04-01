// app/components/forms/AppFormSwitch.tsx
import React from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { useFormikContext } from 'formik';

interface AppFormSwitchProps {
  name: string;
  label?: string;
}

export default function AppFormSwitch({ name, label }: AppFormSwitchProps) {
  const { setFieldValue, values } = useFormikContext<any>();
  const value = values[name];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Switch
        value={value}
        onValueChange={(newValue) => setFieldValue(name, newValue)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});