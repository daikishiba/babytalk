import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";


const allowedOrigins = [
	'https://www.babytalkwithai.com',
	'https://babytalkwithai.com', // サブドメインなし
  ]; // 許可するドメイン

export async function POST (req: NextRequest) {

	const origin = req.headers.get('origin');
    if (!allowedOrigins.includes(origin || '')) {
      return NextResponse.json({ error: 'CORS policy does not allow this origin.' }, { status: 403 });
    }

	const supabase = await createClient();

	try{
		const { data: { user: authUser } } = await supabase.auth.getUser();
		const userId = authUser?.id
		console.log("userId = ", userId);
		if (!userId) {
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
		}

		let { data: user } = await supabase
		.from('users-count') // テーブル名に合わせて変更
		.select('id, conversationCount')
		.eq('id', userId)
		.single();

		console.log("user=", user);

		if (user === null) {
		// ユーザーが存在しない場合、新規作成
		const { data: newUser, error: insertError } = await supabase
			.from('users-count')
			.insert([{ id: userId, conversationCount: 1 }]) // 必要なフィールドを指定
			.select()
			.single();

		if (insertError) throw insertError;

		user = newUser;
		} else if (user) {
		// ユーザーが存在する場合、conversationCountをインクリメント
		const { data: updatedUser, error: updateError } = await supabase
			.from('users-count')
			.update({ conversationCount: user.conversationCount + 1 })
			.eq('id', userId)
			.select()
			.single();

		if (updateError) throw updateError;

		user = updatedUser;
		}

		return NextResponse.json({ conversationCount: user?.conversationCount }, { status: 200 });
    } catch (error) {
    console.error('Error updating conversation count:', error);
    return NextResponse.json({ error: 'Failed to update conversation count' }, { status: 500 });
    }
}