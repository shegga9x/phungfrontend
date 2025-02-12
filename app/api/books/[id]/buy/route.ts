import httpClient from '@/lib/httpClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid parameter `id`." }, { status: 400 });
    } else {
        const url = new URL(request.url);
        const bookId = id;
        const quality = url.searchParams.get('quality') || "";
        const userId = url.searchParams.get('userId') || "";
        const order = {
            bookId,
            quality,
            userId,
            orderedAt: new Date().toISOString()
        };
        const result: any = (await httpClient.post("/api/v1/orders/buybook", order)).data;
        return NextResponse.json({
            message: `User <${userId}> buy ${quality} books <${bookId}> successfully, cost: ${result.cost}, remain: ${result.remain} !`,
            data: result
        }, { status: 200 });
    }
}
