import { Pressable, StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { GlobalColors } from '../../Constants/colors'

function OutLinedButton ({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={GlobalColors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default OutLinedButton

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GlobalColors.primary500
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 5
  },
  text: {
    color: GlobalColors.primary500
  }
})
