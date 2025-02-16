import httpClient, { restClient } from '@/lib/httpClient';
import { BooksDTO } from '@/models/backend';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const bookId = url.pathname.split('/').pop();
    const book: any = (await httpClient.get("/api/v1/books/" + bookId)).data;
    return NextResponse.json({
        content: book
    }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid parameter `id`." }, { status: 400 });
    } else {

        const body = await request.json();
        const booksDTO = body as BooksDTO;
        await restClient.update$PUT$api_v1_books(booksDTO);
        return NextResponse.json({ message: "Books update successfully." }, { status: 200 });
    }

}
