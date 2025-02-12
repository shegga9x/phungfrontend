import httpClient from '@/lib/httpClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const books: any[] = (await httpClient.get("/api/v1/books?" + searchParams)).data;
    const total = (await httpClient.get("/api/v1/books/totalBooksWithAuthorsAndAvgScore?" + searchParams)).data;
    return NextResponse.json({
        content: books,
        total: total
    }, { status: 200 });
}

