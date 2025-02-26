import { shoppingCartItemProps } from '@/const';
import { restClient } from '@/lib/httpClient';
import { CartItemDTO } from '@/models/backend';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);

    const userId = url.searchParams.get('user_id');
    if (!userId || isNaN(Number(userId))) {
        return NextResponse.json({ error: "Invalid parameter `id`." }, { status: 400 });
    } else {
        try {
            const cartItemDTOs: shoppingCartItemProps[] = await restClient.findByUserId$GET$api_v1_cartitem_user_userId(Number(userId));
            return NextResponse.json({
                content: cartItemDTOs
            }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'Fail to fetch cart' }, { status: 409 });

        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const cartItemDTOs: CartItemDTO[] = body;
        await restClient.addOrUpdateList(cartItemDTOs);
        return NextResponse.json({
            content: cartItemDTOs
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Fail to fetch cart' }, { status: 409 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const bookId = url.searchParams.get('bookId');
        await restClient.deleteById$DELETE$api_v1_cartitem_bookId_userId(Number(bookId), Number(userId));
        return NextResponse.json({
            message: "SUCCESS"
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Fail to fetch cart' }, { status: 409 });
    }
}