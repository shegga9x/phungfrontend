import { restClient } from '@/lib/httpClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    let user_id = url.searchParams.get('user_id') || "";
    const result = await restClient.getAvailableServices({ user_id: Number(user_id) });
    
    return NextResponse.json({
        message: `Get address successfully`,
        data: result
    }, { status: 200 });
}

