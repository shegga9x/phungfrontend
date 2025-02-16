import { currentUserIdState } from '@/atoms';
import httpClient, { restClient } from '@/lib/httpClient';
import { Books, BooksDTO, Orders, RatingsDTO } from '@/models/backend';
import { NextRequest, NextResponse } from 'next/server';
import { useRecoilValue } from 'recoil';


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

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid parameter `id`." }, { status: 400 });
    } else {
        const body = await request.json();
        const ratingsDTO: RatingsDTO = {
            bookId: Number(id),
            userId: body.userId,
            score: body.score,
            ratedAt: new Date(),
        };
        await restClient.create$POST$api_v1_ratings(ratingsDTO);
        return NextResponse.json({ message: "Rating created successfully." }, { status: 200 });

    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || "";

    if (!id || isNaN(Number(id)) || isNaN(Number(userId))) {
        return NextResponse.json({ error: "Invalid parameter `id`." }, { status: 400 });
    } else {

        await restClient.deleteById$DELETE$api_v1_ratings_bookId_userId(Number(id), Number(userId));
        return NextResponse.json({ message: "Rating delete successfully." }, { status: 200 });

    }
}
