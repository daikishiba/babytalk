import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const allowedOrigins = [
	'https://www.babytalkwithai.com',
	'https://babytalkwithai.com', // サブドメインなし
  ]; // 許可するドメイン

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin');
    if (!allowedOrigins.includes(origin || '')) {
      return NextResponse.json({ error: 'CORS policy does not allow this origin.' }, { status: 403 });
    }

    const { nickname, theme } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OpenAI API key is not configured.');
      return NextResponse.json({ error: 'OpenAI API key is not configured.' }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    // Generate chat completion
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 確実に使用可能なモデル名を指定
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `かわいい赤ちゃんに対して、褒める言葉、${theme}についてのお話を混ぜて英語で5文程度で楽しく話しかけてください。
		  			子供の愛称は「${nickname}」です。
                    「わかりました」や「もちろんです」などはいりません。`,
        },
      ],
    });

    const messageContent = chatResponse.choices[0]?.message?.content ?? 'メッセージが生成されませんでした。';

    return NextResponse.json({ message: messageContent }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
		console.error('Error in Text API:', error.message);
		return NextResponse.json({ error: 'Error generating text.' }, { status: 500 });
	  }
  
	  console.error('Unexpected error:', error);
	  return NextResponse.json({ error: 'Unexpected error occurred.' }, { status: 500 });
	}
  }