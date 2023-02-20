export const LoadingCard = () => {
    return (
        <>
            <div className="flex h-full flex-col justify-between">
                <div className="aspect-square w-full animate-pulse rounded-full border-2 border-dark-2 bg-dark-3 shadow-black shadow-md" />
                <div className="grid place-items-end">
                    <div className="mb-1 h-4 w-[75%] animate-pulse bg-dark-3 md:h-5" />
                    <div className="h-4 w-[50%] animate-pulse bg-dark-3 md:h-5" />
                </div>
            </div>
        </>
    )
}
