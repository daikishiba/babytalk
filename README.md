# Baby Talk with AI
Baby Talk with AIは2歳以下のお話を始める前の子供を対象としたChat botです。
子供の名前や愛称を入力すると、明るい言葉や質問を組み合わせて英語で話しかけます。

Baby Talk with AI is a chatbot designed for children under 2 years old, specifically those who have not yet started speaking. By entering the child's name or nickname, the chatbot combines cheerful phrases and questions to interact with them in English.

# Overview
Baby Talk with AIは育児休暇を取得した非エンジニアが独学で開発を学び、育児の合間に作成したWebアプリケーションです。
風邪をひいて声が出なくなった際に、代わりに子供に話しかけて楽しませてくれる存在が欲しいと思い、開発をスタートしました。
独学故に追加したい機能が追加できていなかったり、プロの方から見るとコードに穴があるところもあります。
開発はReact、Nextjs、Supabase、google reCAPTCHA v2を使用しており、Login情報のセキュリティ確保に努めています。

Baby Talk with AI is a web application developed by a non-engineer parent who taught themselves programming during their parental leave and built the app during spare moments while caring for their child. The idea for the app was inspired by a personal experience: losing their voice due to a cold and wishing for something that could talk to and entertain their child in their place.

As a self-taught developer, there may be features that haven't been implemented yet or gaps in the code that a professional might notice. The app is built using React, Next.js, Supabase, and Google reCAPTCHA v2, with a strong focus on ensuring the security of login information.

# Improvements or items to add
google reCAPTCHA v2を使用しているが、v3に変更しuser experienceを向上したい
Mobileで見た際にも適切な配置になるCSSに変更したい
Conversation countをChatを始める前に取得し、表示したい
Stripeの決済機能を追加し、donationもしくはsubscriptionを追加したい

The app currently uses Google reCAPTCHA v2, but there are plans to upgrade to reCAPTCHA v3 to improve user experience by reducing intrusive verifications.

Additionally, efforts are underway to optimize the CSS for better layout and usability on mobile devices, ensuring an intuitive experience across all screen sizes.

A feature to display the conversation count before starting a chat session is also in development, providing users with clear feedback on usage.

Finally, the app aims to integrate Stripe payment functionality to enable donations or subscriptions, ensuring sustainable development while allowing users to support the project.

# Author
Daiki Shiba
email: babytalkai@gmail.com
育児✖️AIに興味があり、一緒にWebアプリケーションやデバイスの開発に携わっていただける方からのご連絡もお待ちしています。

We welcome inquiries from anyone interested in AI × Parenting and who would like to collaborate on developing web applications or devices in this field. Whether you're a developer, designer, or someone with innovative ideas, we'd love to hear from you and explore ways to work together!