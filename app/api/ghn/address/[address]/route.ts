import { restClient } from '@/lib/httpClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
    const url = new URL(request.url);
    let addressId = url.searchParams.get('addressId') || "";
    let result = {};
    switch (params.address) {
        case "province":
            result = (await restClient.getProvinces());
            break;
        case "ward":
            result = (await restClient.getWards({ district_id: Number(addressId) }));
            break;
        case "district":
            result = (await restClient.getDistricts({ province_id: Number(addressId) }));
            break;
    }
    return NextResponse.json({
        message: `Get address successfully`,
        data: result
    }, { status: 200 });
}

