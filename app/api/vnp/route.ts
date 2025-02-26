import { restClient } from '@/lib/httpClient';
import { VNPayRequest } from '@/models/backend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const result = await restClient.submidOrder({ userId: Number(body.userId), amount: Number(body.amount) });
    return NextResponse.json({ content: result }, { status: 200 });

}


