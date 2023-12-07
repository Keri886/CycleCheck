import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Button, Alert } from 'react-native';
import COLORS from '../constants/colors';
import { auth } from '../firebase/firebase';

export default function Settings({ navigation }) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const handleSignOut = async () => {
    await auth.signOut();
    navigation.navigate('Welcome');
  };

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
     

      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
          thumbColor={isNotificationsEnabled ? COLORS.secondary : COLORS.white}
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
          thumbColor={isDarkModeEnabled ? COLORS.secondary : COLORS.white}
          onValueChange={toggleDarkMode}
          value={isDarkModeEnabled}
        />
      </View>

      <Button
        title="Sign Out"
        onPress={handleSignOut}
        color={COLORS.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.secondary,
  },
});
