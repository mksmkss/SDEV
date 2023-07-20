import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ChatBot from 'react-simple-chatbot';
import Color from '../../components/config/Color';

function ChatScreen() {
  const steps = [
    {
      id: '1',
      message: 'こんにちは！',
      trigger: '2',
    },
    {
      id: '2',
      message: 'こちらでは，この商品について質問を受け付けています！どのようなことでも構いませんので，お気軽にご質問ください。',
      trigger: '3',
    },
    {
      id: '3',
      user: true,
      trigger: '4',
    },
    {
      id: '4',
      message: '質問を受け付けました！担当者に通知しましたので，しばらくお待ちください。',
      trigger: '5',
    },
    {
      id: '5',
      user: true,
    },
  ];

  return (
    <ChatBot
      headerTitle="商品に関するお問い合わせ"
      steps={steps}
      recognitionEnable
      recognitionLang="ja"
      speechSynthesis={{ enable: true, lang: 'ja' }}
      width="400px"
      userStepsDelay={1000}
      botStepsDelay={1000}
      floating
      floatingStyle={{
        backgroundColor: Color.replyblue2,
        right: '20px',
        bottom: '20px',
      }}
    />
  );
}

export default ChatScreen;
