import { BookType } from '@/const';
import { NextRequest, NextResponse } from 'next/server';
const bookTypes = Object.values(BookType);

export async function GET(req: NextRequest) {
    return NextResponse.json(bookTypes, { status: 200 });
}