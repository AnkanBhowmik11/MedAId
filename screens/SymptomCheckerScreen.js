import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';

export default function SymptomCheckerScreen() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m MedAId 🤖. Describe your symptoms, and I’ll help you.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'You are a medical AI assistant that answers health-related queries.' },
            ...messages
              .filter(m => m.sender !== 'bot') // only user messages
              .map(m => ({ role: 'user', content: m.text })),
            { role: 'user', content: userMsg.text }
          ]
        },
        {
          headers: {
            Authorization: 'Bearer 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', // replace this!
            'Content-Type': 'application/json'
          }
        }
      );

      const botReply = response.data.choices[0].message.content;
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 80 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.botBubble
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your symptoms..."
          style={styles.input}
          multiline
        />
        <Button title={loading ? '...' : 'Send'} onPress={sendMessage} disabled={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatContainer: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  messageBubble: {
    padding: 10,
    marginVertical: 6,
    maxWidth: '80%',
    borderRadius: 10
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end'
  },
  botBubble: {
    backgroundColor: '#EEE',
    alignSelf: 'flex-start'
  },
  messageText: { fontSize: 16 },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 10,
    minHeight: 40,
    maxHeight: 100
  }
});
