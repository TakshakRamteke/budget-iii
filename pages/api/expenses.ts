import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

export default async function getAllExpenses(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const notion = new Client({ auth: process.env.NOTION_KEY });
    const expenses = await notion.databases.query({
        database_id: process.env.NOTION_EXPENSES_DB_ID as string,
        sorts: [
            {
                property: 'date',
                direction: 'descending',
            },
        ],
    });

    res.json(expenses.results);
    res.status(200).end();
}
