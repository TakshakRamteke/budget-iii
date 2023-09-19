import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(request: NextRequest) {
    const notion = new Client({ auth: process.env.NOTION_KEY });
    const expenses = await notion.databases.query({
        database_id: process.env.NOTION_EXPENSES_DB_ID as string,
        sorts: [
            {
                property: 'date',
                direction: 'ascending',
            },
        ],
    });

    return NextResponse.json(expenses.results);
}
