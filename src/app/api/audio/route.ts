// src/app/api/audio.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const allowedOrigins = [
	'https://www.babytalkwithai.com',
	'https://babytalkwithai.com', // サブドメインなし
  ]; // 許可するドメイン

export async function POST(req: NextRequest) {
	const origin = req.headers.get('origin');
    if (!allowedOrigins.includes(origin || '')) {
      return NextResponse.json({ error: 'CORS policy does not allow this origin.' }, { status: 403 });
    }

	try {
    const { message } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key is not configured.' }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    // Generate audio
    const audioResponse = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: message,
    });

    const audioArrayBuffer = await audioResponse.arrayBuffer();
    const audioBlob = Buffer.from(audioArrayBuffer);

    return NextResponse.json({
      audio: `data:audio/mp3;base64,${audioBlob.toString('base64')}`,
    });
  } catch (error) {
    if (error instanceof Error) {
		console.error('Error in Audio API:', error.message);
		return NextResponse.json({ error: 'Error generating audio.' }, { status: 500 });
	  }
  
	  console.error('Unexpected error:', error);
	  return NextResponse.json({ error: 'Unexpected error occurred.' }, { status: 500 });
	}
  }