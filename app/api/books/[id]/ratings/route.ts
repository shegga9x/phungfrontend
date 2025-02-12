import httpClient from '@/lib/httpClient';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid parameter `id`." }, { status: 400 });
    } else {
        const ratings: any[] = (await httpClient.get("api/v1/ratings/" + id)).data;
        return NextResponse.json({
            content: ratings,
            total: 100
        }, { status: 200 });
    }
}

