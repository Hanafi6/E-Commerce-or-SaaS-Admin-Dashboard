interface GroupingResult<TData> {
    [key: string]: TData[];
}

interface GroupingOptions<TData> {
    keySelector: (item: TData) => string;
    data: TData[];
}

export function GropingBy<TData>({ keySelector, data }: GroupingOptions<TData>): GroupingResult<TData> {
    return data.reduce((acc, item: TData) => {
        const key = keySelector(item);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as GroupingResult<TData>);
}