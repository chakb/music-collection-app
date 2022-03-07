import { useLayoutEffect, useState } from 'react';
import { Button, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { View } from '../components/Themed';
import useColorScheme from './useColorScheme';
import Colors from '../constants/Colors';

const useEditToggle = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const editButton = () => (
      <View>
        {showEditForm ? (
          <Button title="CANCEL" onPress={() => setShowEditForm(!showEditForm)} />
        ) : (
          <Pressable
            onPress={() => setShowEditForm(!showEditForm)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <MaterialIcons name="edit" size={24} color={Colors[colorScheme].text} />
          </Pressable>
        )}
      </View>
    );

    navigation.setOptions({
      headerRight: editButton,
    });
  }, [colorScheme, navigation, showEditForm]);

  return [showEditForm, setShowEditForm] as const;
};

export default useEditToggle;
