type Expense = {
    id: string;
    properties: {
        comment: {
            id: string;
            type: string;
            rich_text: [
                {
                    type: string;
                    text: {
                        content: string;
                        link: string;
                    };
                },
            ];
        };
        amount: {
            id: string;
            type: number;
            number: number;
        };
        category: {
            id: string;
            select: {
                id: string;
                name: string;
                color: string;
            };
        };
        date: {
            id: string;
            date: {
                start: string;
                end: string;
                time_zone: string;
            };
        };
        expense: {
            id: string;
            title: [
                {
                    plain_text: string;
                    text: {
                        content: string;
                        link: string;
                    };
                },
            ];
        };
    };
};
