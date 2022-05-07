import React, {useState} from 'react';
import { ArrowArcLeft, ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { 
    View, 
    TextInput, 
    Image, 
    Text, 
    TouchableOpacity 
} from 'react-native';

import { theme } from '../../theme';

import { styles } from './styles';

import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/api';

interface FormProps {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFedbackSent }: FormProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [comment, setComment] = useState('');

    const {image, title} = feedbackTypes[feedbackType];

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.1
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error));
    }
    function handleScreenshotRemove(){
        setScreenshot(null);
    }

    async function handleSendFeedback(){
        if(isSendingFeedback){
            return;
        }

        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot 
        && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});


        try{
            await api.post('feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            });
            
            onFedbackSent();

        } catch(error) {
            console.log(error);
            setIsSendingFeedback(false)
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>

            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image 
                    source={image}
                    style={styles.image}
                />
                <Text style={styles.titleText} > 
                    {title}
                </Text>
            </View>
        </View>

        <TextInput 
            multiline
            style={styles.input}
            placeholder="Digita ai po"
            placeholderTextColor={theme.colors.text_secondary}
            onChangeText={setComment}
        />

        <View style={styles.footer}>
            <ScreenshotButton 
                onTakeShot={handleScreenshot}
                oneRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}
            />

            <Button 
                onPress={handleSendFeedback}
                isLoading={isSendingFeedback}
            />
        </View>
    </View>
  );
}