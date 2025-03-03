import httpClient, { restClient } from '@/lib/httpClient';
import { BooksResponseDTO } from '@/models/backend';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const title = url.searchParams.get('title') || "";
    const books: String[] = (await httpClient.get("/api/v1/books/search?title=" + title)).data;
    return NextResponse.json({
        content: books,
    }, { status: 200 });
}
export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const title = url.searchParams.get('title') || "";
    const books: BooksResponseDTO[] = (await httpClient.get("/api/v1/books/searchDTO?title=" + title)).data;
    return NextResponse.json({
        content: books,
    }, { status: 200 });
}

