"use client";

import React, { useState } from 'react';
import styles from '../../styles/chatapp.module.css';
import OpenAI from 'openai';

const ChatApp: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [conversationCount, setConversationCount] = useState<number>(0);

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (typeof apiKey !== 'string') {
    console.error('Invalid API Key: Make sure to set VITE_OPENAI_API_KEY in your environment variables.');
    return null;
  }

  const openai = new OpenAI({
    apiKey: apiKey,
	dangerouslyAllowBrowser: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async () => {
    if (!nickname) return;

	const themes = ["かわいい動物", "かっこいい乗り物", "おいしい食べ物"];
	const randomNumber = Math.floor(Math.random() * 9) + 1;
	const theme = themes[randomNumber % 3];

    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `子供の愛称「${nickname}」に向けて褒める言葉、${theme}、子供への質問を混ぜて５文程度で楽しく話しかけてください。
					  日本語のテキストが完成したら、同じ内容を英語でも作成してください。
                      「わかりました」や「もちろんです」などはいりません。`,
          },
        ],
      });

      const messageContent = completion.choices[0].message.content ?? 'メッセージが生成されませんでした。';
      setMessage(messageContent);
      //setMessages(prevMessages => [...prevMessages, messageContent]);

      // 音声生成
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: messageContent,
      });
      const audioArrayBuffer = await mp3.arrayBuffer();
      const blob = new Blob([audioArrayBuffer], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      setAudioSrc(url);

      setConversationCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error generating message or audio:', error);
      setMessage('エラーが発生しました。もう一度試してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
		<div className={styles.appContainer}>
				<img 
					src='/frog.img.png'
					alt="A cheerful baby or AI interaction illustration" 
					className={styles.image_bounce}
				/>
					<input
					className={styles.input}
					type="text"
					value={nickname}
					onChange={handleChange}
					placeholder="子供の愛称を入力してください"/>
				<button className={styles.button} onClick={handleSubmit}>
				{loading ? '生成中...' : '話しかける'}
				</button>

				<p className={styles.conversationCount}>現在の会話回数: {conversationCount}</p>

				{message && <div className="message-section"><p>{message}</p></div>}
				{audioSrc && (
					<div className={styles.audioSection}>
					<audio controls src={audioSrc}>
						Your browser does not support the audio element.
					</audio>
					</div>
				)}
		</div>
	);
}

export default ChatApp;
