import { restClient } from '@/lib/httpClient';
import { ShippingInfoDTO } from '@/models/backend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const shippingInfoDTO: ShippingInfoDTO = body;
    let flag = 200;
    await restClient.create$POST$api_v1_shippinginfo(shippingInfoDTO)
        .then(() => { })
        .catch((e) => { flag = e.response.status; });
    if (flag == 200) {
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Your phone number wrong or been used' }, { status: flag });
    }
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    if (!userId || isNaN(Number(userId))) {
        return NextResponse.json({ error: "Invalid parameter `id`." }, { status: 400 });
    } else {
        try {
            const shippingInfos: ShippingInfoDTO[] = await restClient.findByUserId(Number(userId));
            return NextResponse.json({
                content: shippingInfos
            }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: 'Your phone number wrong or been used' }, { status: 409 });

        }
    }
}

