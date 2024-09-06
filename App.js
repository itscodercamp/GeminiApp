import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';
import { API_KEY } from './config'; // Import API key from config
import Markdown from 'react-native-markdown-display';

const App = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  // Function to fetch the answer by clicking the button
  const fetchAnswer = async () => {
    if (!question.trim()) {
      setAnswer('Please enter a question.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        // 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
        'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: question, // User's question
                },
              ],
            },
          ],
        },
        {
          headers: {
            'x-goog-api-key': API_KEY, // API key header
            'Content-Type': 'application/json',
          },
        }
      );

      // Log the API response for debugging purposes
      console.log('API Response:', response.data);

      // Extract the answer correctly from the response
      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        const firstCandidate = response.data.candidates[0];
        const answerText = firstCandidate.content?.parts?.[0]?.text || 'No answer found.';
        setAnswer(answerText);
      } else {
        setAnswer('No answer found.');
      }
    } catch (error) {
      console.error('API Request Error:', error); // Log the error for debugging
      setAnswer('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Pull-to-refresh function to reset the screen without hitting the API
  const onRefresh = () => {
    setRefreshing(true);
    setQuestion('');  // Reset the question input
    setAnswer('');    // Clear the answer
    setRefreshing(false); // End the refresh state
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>Ask Anything</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your question here..."
        value={question}
        onChangeText={setQuestion}
      />
      <Button
        title={loading ? 'Fetching...' : 'Get Answer'}
        onPress={fetchAnswer} // API call only triggered by button
        disabled={loading}
        color="#007bff"
      />
      {loading && <ActivityIndicator size="large" color="#007bff" style={styles.spinner} />}
      {answer ? (
  <View style={styles.answerContainer}>
    {/* Render the answer as markdown */}
    <Markdown style={markdownStyles}>
      {answer}
    </Markdown>
  </View>
) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  input: {
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  spinner: {
    marginTop: 20,
  },
  answerContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#ced4da',
    borderWidth: 1,
  },
  answer: {
    fontSize: 18,
    color: '#495057',
  },
});

const markdownStyles = {
  text: {
    fontSize: 18,
    color: '#495057',
  },
  strong: {
    fontWeight: 'bold', // Style for bold text
  },
  em: {
    fontStyle: 'italic', // Style for italic text
  },
};


export default App;
