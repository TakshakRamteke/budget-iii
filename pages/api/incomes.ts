import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

export default async function getAllIncomes(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const notion = new Client({ auth: process.env.NOTION_KEY });
    const incomes = await notion.databases.query({
        database_id: process.env.NOTION_INCOMES_DB_ID as string,
        sorts: [
            {
                property: 'date',
                direction: 'ascending',
            },
        ],
    });

    res.json(incomes.results);
    res.status(200).end();
}
