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

    // Generate audio
    const audioResponse = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: messageContent,
    });

    const audioArrayBuffer = await audioResponse.arrayBuffer();
    const audioBlob = Buffer.from(audioArrayBuffer);

    return new Response(
      JSON.stringify({
        message: messageContent,
        audio: `data:audio/mp3;base64,${audioBlob.toString('base64')}`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || '', // 呼び出し元のオリジンを許可
        },
      }
    );
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';

    // 型ガードを使ってエラーを特定
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Error in API route:', error);

    return NextResponse.json(
      { error: 'Error processing the request.', details: errorMessage },
      { status: 500 }
    );
  }
}
