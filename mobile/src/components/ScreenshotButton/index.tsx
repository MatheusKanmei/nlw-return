import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Trash, Camera } from 'phosphor-react-native'

import { styles } from './styles';
import { theme } from '../../theme';

interface ScreenshotButtonProps {
    screenshot: string | null;
    onTakeShot: () => void;
    oneRemoveShot: () => void;
}

export function ScreenshotButton({
    screenshot, onTakeShot, oneRemoveShot
}: ScreenshotButtonProps)  {
  return (
      <TouchableOpacity
        style={styles.container}
        onPress={screenshot ? oneRemoveShot : onTakeShot}
      >
          {
              screenshot
              ?
              <View>
                <Image 
                    style={styles.image}
                    source={{uri: screenshot}}
                />
                <Trash 
                    size={22}
                    color= {theme.colors.text_secondary}
                    weight="fill"
                    style={styles.removeIcon}
                />
               </View>
              :
                <Camera 
                    size={22}
                    color= {theme.colors.text_primary}
                    weight="bold"
                />
          }
      </TouchableOpacity>
  );
}