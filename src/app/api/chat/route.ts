import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const allowedOrigins = ['https://babytalk.vercel.app']; // 許可するドメイン

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
      model: 'gpt-4', // 確実に使用可能なモデル名を指定
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `まだお話できない赤ちゃんに対して、褒める言葉、${theme}についてのお話を混ぜて5文程度で楽しく話しかけてください。
                    最後に${theme}に関する質問も１つしてください。
                    子供の愛称は「${nickname}」です。
                    日本語のテキストが完成したら、同じ内容を英語でも作成してください。
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