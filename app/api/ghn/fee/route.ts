import { restClient } from '@/lib/httpClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    let result = {};
    const url = new URL(request.url);
    let userId = Number(url.searchParams.get('userId')) || 0;
    let bookId = (url.searchParams.get('bookId')) || "null";
    let service_id = Number(url.searchParams.get('service_id')) || 0;
    result = await restClient.getFee({ userId, bookId, service_id });
    return NextResponse.json({
        message: `Get shipping fee successfully`,
        data: result
    }, { status: 200 });
}

