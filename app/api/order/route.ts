import { restClient } from '@/lib/httpClient';
import { OrderRequest } from '@/models/backend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const orderRequest: OrderRequest = body;
    const response = await restClient.buyBook(orderRequest)
    return NextResponse.json(response, { status: 200 });
}


