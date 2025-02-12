import httpClient from '@/lib/httpClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const bookId = url.pathname.split('/').pop();
    const book: any = (await httpClient.get("/api/v1/books/" + bookId)).data;
    return NextResponse.json({
        content: book
    }, { status: 200 });
}

